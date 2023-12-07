export default function ToDoItem ({ todo, users, projects }) {
    const foundProject = projects.find(({id}) => id === todo.project);
    const foundUser = users.find(({id}) => id === todo.user);

    return (
        <tr>
          <td>{todo.id}</td>
          <td>{foundProject ? foundProject.projectName : <small>сейчас все будет</small>}</td>
          <td>{foundUser ? foundUser.email : <small>сейчас все будет</small>}</td>
          <td>{todo.formattedDate}</td>
          <td>{todo.body}</td>
        </tr>
      );
    }
