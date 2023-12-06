import ProjectItem from './Project';
import Table from 'react-bootstrap/Table';

export default function ProjectList ({ projects, users }) {
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
      {projects.map((project) => (
        <ProjectItem project={project} users={users}  />
      ))}
    </tbody>
    </Table>
  );
};