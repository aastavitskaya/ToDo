import { Link } from "react-router-dom";

export default function ToDoItem ({ todo, user, project }) {
  const filteredUsers = user.filter(user => user.id === project.id);

  return (
    <tr>
      <td>{todo.id}</td>
      <td><Link to={`/project/${project.id}`}>{todo.projectName}</Link></td>
      <td>
        {filteredUsers.map(user => (
          <div key={user.id}>{user.name}</div>
        ))}
      </td>
      <td>{todo.created}</td>
      <td>{todo.body}</td>
    </tr>
  );
};
