import ToDoItem from './ToDo';
import Table from 'react-bootstrap/Table';
import {NavLink} from "react-router-dom";

export default function ToDoList ({ items, users, projects, setTodo }) {
  return (
    <div className="d-flex align-items-center flex-column">
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
        <NavLink to='create' className='btn btn-primary'>Create new</NavLink>
    </div>
  );
};