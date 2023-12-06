import ToDoItem from './ToDo';


export default function ToDoList ({ items, users, projects }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>PROJECT</th>
          <th>USER</th>
          <th>CREATED</th>
          <th>BODY</th>
        </tr>
      </thead>
      <tbody>
      {items.map(todo => <ToDoItem key={todo.id} items={todo} users={users} projects={projects} />)}
      </tbody>
    </table>
  );
};