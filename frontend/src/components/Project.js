import { Link, useLocation  } from "react-router-dom";


export default function ProjectItem ({ item, users }) {
  const location = useLocation();

  return (
    <tr>
      <td>{item.id}</td>
      <td>
          {location.pathname === "/projects" ? (
          <Link to={`/project/${item.id}`}>{item.projectName}</Link>
        ) : (
         <td>{item.projectName}</td>
        )}
      </td>
      <td>{item.linkToRepo}</td>
      <td>{item.description}</td>
      <td>{item.projectTeam.map(id =>{
          const contributor = users.find(user => user.id === id);
          return (!!contributor) ? <p key={id}>{contributor.email}</p> : <p>Loading...</p>;
      })}
      </td>
    </tr>
  );
};
