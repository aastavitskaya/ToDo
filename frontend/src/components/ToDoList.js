import ToDoItem from './ToDo';


export default function ToDoList ({ todos, users, projects  }) {
  return (
    <table>
      <tr>
        <th>ID</th>
        <th>PROJECT</th>
        <th>USER</th>
        <th>CREATED</th>
        <th>BODY</th>
      </tr>
      {todos.map(todo => {

        const filteredProjects = projects.filter(project => project.id === todo.id);

        return (
          <ToDoItem
            key={todo.id}
            todo={todo}
            users={users}
            project={filteredProjects[0]}
          />
        );
      })}
    </table>
  );
};