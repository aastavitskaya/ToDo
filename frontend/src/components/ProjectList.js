import ProjectItem from './Project';
import Table from 'react-bootstrap/Table';
import { NavLink } from "react-router-dom";

export default function ProjectList ({ projects, users, setProjects }) {
  return (
      <div className="d-flex align-items-center flex-column">
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
            <ProjectItem project={project} users={users} setProjects={setProjects} />
          ))}
        </tbody>
        </Table>
        <NavLink to='create' className='btn btn-primary'>Create new</NavLink>
      </div>
  );
};