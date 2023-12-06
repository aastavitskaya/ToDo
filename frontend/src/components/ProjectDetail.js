import { useParams } from "react-router-dom";
import ProjectItem from "./Project";

export default function ProjectDetail ({ items, users}) {
  const { id } = useParams();
  const filtered_items = items.filter((item) => {
  return item.id === +id;
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
      {filtered_items.map((item) => (
        <ProjectItem item={item} users={users}/>
      ))}
    </table>
  );
};