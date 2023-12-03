import ProjectItem from './Project';


export default function ProjectList ({ items }) {
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