import { Link } from "react-router-dom";


export default function ProjectItem ({ item }) {
  return (
    <tr>
      <td>{item.id}</td>
      <td>
          <Link to={`/project/${item.id}`}>{item.projectName}</Link>
      </td>
      <td>{item.linkToRepo}</td>
      <td>{item.description}</td>
      <td>{item.projectTeam}</td>
    </tr>
  );
};
