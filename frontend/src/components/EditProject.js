import React, { useState } from "react";
import { updateItem } from '../core/actions';
import { PROJECTS_API } from '../core/consts';
import {Link, useParams} from "react-router-dom";

export default function EditProjectForm ({ projects, setProjects }){

  const { id } = useParams()

  const filterProject = projects.find(project => {
    return (project.id === +id)
      ? project
      : null
  })

  const [editedProject, setEditedProject] = useState(filterProject);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleTeamChange = (e) => {
    const { value } = e.target;
    setEditedProject((prevProject) => ({
      ...prevProject,
      projectTeam: value.split(",").map((id) => Number(id.trim())),
    }));
  };

  const filterProjectsById = (id) => projects.filter((project) => project.id !== id);

  const handleUpdate = () => {
    updateItem(PROJECTS_API, editedProject.id, editedProject, setProjects)
  };


  return (
    <div>
      <h2>Edit Project</h2>
      <form>
        <label>
          Project Name:
          <input
            type="text"
            name="projectName"
            value={editedProject.projectName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Link to Repo:
          <input
            type="text"
            name="linkToRepo"
            value={editedProject.linkToRepo}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={editedProject.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Project Team (comma-separated user IDs):
          <input
            type="text"
            name="projectTeam"
            value={editedProject.projectTeam.join(",")}
            onChange={handleTeamChange}
          />
        </label>
        <br />
         <Link className='btn btn-primary' to='../projects'
                    onClick={() => handleUpdate()}>Update</Link>
      </form>
    </div>
  );
};
