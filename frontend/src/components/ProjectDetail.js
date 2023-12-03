import { useParams } from "react-router-dom";
import ProjectItem from "./Project";

export default function ProjectDetail ({ items }) {
  // const { id } = useParams();
  // const filtered_items = items.filter((item) => {
  //   return item.projects.id === +id;
  // });

  return (
    <table>
      <tr>
        <th>ID</th>
        <th>Project Name</th>
        <th>Link to repo</th>
        <th>Description</th>
        <th>Project Team</th>
      </tr>
      {items.map((item) => (
        <ProjectItem item={item} />
      ))}
    </table>
  );
};