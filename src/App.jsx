import { useContext } from "react"
import { CreateTodoForm } from "./components/CreateTodoForm"
import { TodoList } from "./components/TodoList"
import { TodoContext } from "./providers/TodoContext"
import { EditTodoForm } from "./components/EditTodoForm";

function App() {
  const { editingTodo } = useContext(TodoContext);
  return (
    <>
      <CreateTodoForm />
      <TodoList />
      {editingTodo ? <EditTodoForm /> : null}
    </>
  )
}

export default App
