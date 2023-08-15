import { useContext } from "react";
import { useForm } from "react-hook-form";
import { TodoContext } from "../../providers/TodoContext";

export const EditTodoForm = () => {
   const { editTodo, editingTodo, setEditingTodo } = useContext(TodoContext);

   const { register, handleSubmit } = useForm({
      values: {
         title: editingTodo.title,
         content: editingTodo.content,
      },
   });

   const submit = (formData) => {
    editTodo(formData);
   };

   return (
      <>
         <button onClick={() => setEditingTodo(null)}>Fechar</button>
         <form onSubmit={handleSubmit(submit)}>
            <input placeholder="Título" type="text" {...register("title")} />
            <textarea placeholder="Conteúdo" {...register("content")} />
            <button type="submit">Editar nota</button>
         </form>
      </>
   );
};
