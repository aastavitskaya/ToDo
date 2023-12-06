import ProjectItem from './Project';
import Table from 'react-bootstrap/Table';

export default function ProjectList ({ items, users }) {
  return (
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Project Name</th>
        <th>Link to repo</th>
        <th>Description</th>
        <th>Project Team</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item) => (
        <ProjectItem item={item} users={users}  />
      ))}
    </tbody>
    </Table>
  );
};