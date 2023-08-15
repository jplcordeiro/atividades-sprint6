import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const TodoContext = createContext({});

export const TodoProvider = ({ children }) => {
   const [todoList, setTodoList] = useState([]);
   const [editingTodo, setEditingTodo] = useState(null);

   useEffect(() => {
      const getTodos = async () => {
         try {
            const { data } = await api.get("/todo");
            setTodoList(data);
         } catch (error) {
            console.log(error);
         }
      };
      getTodos();
   }, []);

   const createTodo = async (formData) => {
      try {
         const { data } = await api.post("/todo", formData);
         setTodoList([...todoList, data]);
      } catch (error) {
         console.log(error);
      }
   };

   const deleteTodo = async (deletingId) => {
      try {
         await api.delete(`/todo/${deletingId}`);
         const newTodoList = todoList.filter((todo) => todo.id !== deletingId);
         setTodoList(newTodoList);
      } catch (error) {
         console.log(error);
      }
   };

   const editTodo = async (formData) => {
      try {
         const { data } = await api.patch(`/todo/${editingTodo.id}`, formData);

         const newTodoList = todoList.map((todo) => {
            if (todo.id === editingTodo.id) {
               return data;
            } else {
               return todo;
            }
         });

         setTodoList(newTodoList);
         setEditingTodo(null);
      } catch (error) {
         console.log(error);
      }
   };

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
