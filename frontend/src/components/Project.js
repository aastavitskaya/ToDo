import { Link, useLocation } from "react-router-dom";
import { deleteItem } from '../core/actions';
import { PROJECTS_API } from '../core/consts';
import React from "react";


export default function ProjectItem ({ project, users, setProjects }) {
  const location = useLocation();
  const handleDelete = () => {
      deleteItem(PROJECTS_API, project.id, setProjects);
  };

  return (
        <tr>
          <td>{project.id}</td>
          <td>
            {location.pathname === "/projects" ? (
              <Link to={`/project/${project.id}`}>{project.projectName}</Link>
            ) : (
              <td>{project.projectName}</td>
            )}
          </td>
          <td>{project.linkToRepo}</td>
          <td>{project.description}</td>
          <td>{project.projectTeam.map(id => {
              const contributor = users.find(user => user.id === id);
              return (!!contributor) ? <p key={id}>{contributor.email}</p> : <p>Loading...</p>;
          })}
          </td>
          {location.pathname === "/projects" && (
            // Кнопка "Delete" только на странице "/projects"
            <td>
              <button onClick={handleDelete}>Delete</button>
            </td>
          )}
        </tr>
  );
};
