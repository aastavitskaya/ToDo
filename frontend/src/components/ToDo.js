import { Link } from "react-router-dom";


export default function ToDoItem ({ item }) {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.project}</td>
      <td>{item.user}</td>
      <td>{item.created}</td>
      <td>{item.body}</td>
    </tr>
  );
};

