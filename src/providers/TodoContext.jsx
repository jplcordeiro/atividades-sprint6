import { createContext, useState } from "react";
import { api } from "../services/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; 

export const TodoContext = createContext({});

export const TodoProvider = ({ children }) => {
   const { data: todoList } = useQuery({
      queryKey: ["todos"],
      queryFn: async () => {
         const { data } = await api.get("/todo");
         return data;
      }
   });
  
   const [editingTodo, setEditingTodo] = useState(null);

   const client = useQueryClient();
   
   const revalidate = () => {
      client.invalidateQueries({ queryKey: ["todos"]});
   }

   const createTodo = useMutation({
      mutationFn: async (formData) => {
         return await api.post("/todo", formData);
      },
      onSuccess: revalidate,
   })

   const deleteTodo = useMutation({
      mutationFn: async (deletingId) => {
         return await api.delete(`/todo/${deletingId}`);
      },
      onSuccess: revalidate,
   })

   const editTodo = useMutation({
      mutationFn: async (formData) => {
         return await api.patch(`/todo/${editingTodo.id}`, formData);
      },
      onSuccess: () => {
         setEditingTodo(null);
         revalidate();
      }
   })

   return (
      <TodoContext.Provider
         value={{
            todoList,
            createTodo,
            deleteTodo,
            editTodo,
            editingTodo,
            setEditingTodo,
         }}
      >
         {children}
      </TodoContext.Provider>
   );
};
