import {deleteItem} from "../core/actions";
import {TODO_API} from "../core/consts";

export default function ToDoItem ({ todo, users, projects, setTodo }) {
    const foundProject = projects.find(({id}) => id === todo.project);
    const foundUser = users.find(({id}) => id === todo.user);
    const handleDelete = () => {
      deleteItem(TODO_API, todo.id, setTodo);
  };

    return (
        <tr>
          <td>{todo.id}</td>
          <td>{foundProject ? foundProject.projectName : <small>сейчас все будет</small>}</td>
          <td>{foundUser ? foundUser.email : <small>сейчас все будет</small>}</td>
          <td>{todo.formattedDate}</td>
          <td>{todo.body}</td>
          <td>
              <button onClick={handleDelete}>Delete</button>
          </td>
        </tr>
      );
    }
