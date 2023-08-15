import { useContext } from "react";
import { TodoContext } from "../../providers/TodoContext";

export const TodoList = () => {
   const { todoList, deleteTodo, setEditingTodo } = useContext(TodoContext);
   return (
      <ul>
         {todoList.map((todo) => (
            <li key={todo.id}>
               <h3>{todo.title}</h3>
               <p>{todo.content}</p>
               <button onClick={() => setEditingTodo(todo)}>Editar</button>
               <button onClick={() => deleteTodo(todo.id)}>Excluir</button>
            </li>
         ))}
      </ul>
   );
};
