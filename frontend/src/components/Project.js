import { Link, useLocation  } from "react-router-dom";


export default function ProjectItem ({ project, users }) {
  const location = useLocation();

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
    </tr>
  );
};
