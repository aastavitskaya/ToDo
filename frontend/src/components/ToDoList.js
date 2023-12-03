import {useParams} from "react-router-dom";
import ToDoItem from './ToDo';


export default function ToDoList ({ items }) {

  return (
    <table>
      <tr>
        <th>ID</th>
        <th>PROJECT</th>
        <th>USER</th>
        <th>CREATED</th>
        <th>BODY</th>
      </tr>
      {items.map((item) => (
        <ToDoItem item={item} />
      ))}
    </table>
  );
};