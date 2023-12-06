export default function ToDoItem ({ todo, users, projects }) {

  return (
    <tr>
      <td>{todo.id}</td>

      <td>{projects.find(project => {
              return (project.id === todo.project) ? project : null
            }).project}</td>
      <td>
        {users.find(user => {
              return (user.id === todo.user) ? user : null
            }).username}
      </td>
      <td>{todo.created}</td>
      <td>{todo.body}</td>
    </tr>
  );
};
