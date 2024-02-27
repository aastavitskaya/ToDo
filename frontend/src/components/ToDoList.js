import ToDoItem from './ToDo';
import Table from 'react-bootstrap/Table';

export default function ToDoList ({ items, users, projects, setTodo }) {
  return (
    <Table striped bordered hover>
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
      {items.map(todo => <ToDoItem key={todo.id} todo={todo} users={users} projects={projects} setTodo={setTodo} />)}
      </tbody>
    </Table>
  );
};