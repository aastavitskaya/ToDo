import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import {useState} from "react";
import {PROJECTS_API} from "../core/consts";
import {createItem} from "../core/actions";

export default function CreateProject ({users, setProjects}){
  const [projectName, setProjectName] = useState('');
  const [linkToRepo, setLinkToRepo] = useState('');
  const [description, setDescription] = useState('');
  const [projectTeam, setProjectTeam] = useState([]);

  const handleSelect = (target) => {
    let optionList = projectTeam;
    [...target.selectedOptions].forEach(option => {
      if (projectTeam.includes(option.value)) {
        optionList.splice(optionList.indexOf(option.value), 1);
      } else {
        optionList.push(option.value);
      }
    })
    setProjectTeam(optionList);
  }

  const handleChange = (target, setState) => {
    setState(target.value);
  }

  const handleSubmit = () => {
    const data = {
      "projectName": projectName,
      "linkToRepo": linkToRepo,
      "description": description,
      "projectTeam": projectTeam,
    }

    createItem(PROJECTS_API, data, setProjects);
  }

  return(
    <div className="container-xxl">
      <div className="d-flex justify-content-center">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicProjectName">
            <Form.Label>Project name</Form.Label>
            <Form.Control type="text" name="projectName" placeholder="Project name" onChange={({target}) => handleChange(target, setProjectName)}/>
            <Form.Text className="text-muted">
              Enter the name of your project.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLink">
            <Form.Label>URL</Form.Label>
            <Form.Control type="text" name="linkToRepo" placeholder="https://your_link.com" onChange={({target}) => handleChange(target, setLinkToRepo)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="textarea" name="description" placeholder='Project description' onChange={({target}) => handleChange(target, setDescription)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicProjectTeam">
            <Form.Label>Project team</Form.Label>
            <Form.Select multiple={true} name="projectTeam" value={projectTeam} onChange={({target}) => handleSelect(target, setProjectTeam)}>
              {users.map(user => {
                return <option key={`${user.id}`} value={`${user.id}`}>{`${user.email}`}</option>
              })}
            </Form.Select>
          </Form.Group>

          <Link className='btn btn-primary' to='../projects/'
                  onClick={() => handleSubmit()}>Create</Link>
        </Form >
      </div>
    </div>
  );
}
