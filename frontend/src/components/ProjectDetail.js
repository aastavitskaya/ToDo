import { useParams } from "react-router-dom";
import ProjectItem from "./Project";

export default function ProjectDetail ({ projects, users}) {
  const { id } = useParams();
  const filtered_items = projects.filter((project) => {
  return project.id === +id;
  });

  return (
    <table>
      <tr>
        <th>ID</th>
        <th>Project Name</th>
        <th>Link to repo</th>
        <th>Description</th>
        <th>Project Team</th>
      </tr>
      {filtered_items.map((project) => (
        <ProjectItem project={project} users={users}/>
      ))}
    </table>
  );
};