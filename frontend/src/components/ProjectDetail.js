import {NavLink, useParams} from "react-router-dom";
import ProjectItem from "./Project";
import Table from 'react-bootstrap/Table';

export default function ProjectDetail ({ projects, users }) {
  const { id } = useParams();
  const filtered_items = projects.filter((project) => {
  return project.id === +id;
  });

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
          {filtered_items.map((project) => (
            <ProjectItem project={project} users={users}/>
          ))}
          </tbody>
        </Table>
        <NavLink to='update' className='btn btn-primary'>Update project</NavLink>
    </div>
  );
};