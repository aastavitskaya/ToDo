import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, Navigate } from 'react-router-dom';
import { TODO_API } from "../core/consts";
import {createItem } from "../core/actions";


export default function CreateTodo ({projects, setTodo, name}){
  const [project, setProject] = useState(1);
  const [body, setBody] = useState('');
  const [isActive, setIsActive] = useState(false);


  const handleChange = (target, setState) => {
    setState((target.name === "isActive") ? target.checked : target.value);
  }

  const handleSubmit = () => {
    const data = {
      "project": project,
      "user": name.id,
      "body": body,
      "isActive": isActive,
    }

    createItem(TODO_API, data, setTodo);
  }

    return(
      <div className="container-xxl">
        <div className="d-flex justify-content-center">
          {!projects ? <Navigate to="../projects" /> : null}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicProject">
              <Form.Label>Project</Form.Label>
              <Form.Select
                name="project"
                onChange={({target}) => handleChange(target, setProject)}>
                {projects.map(project => {
                  return <option key={`${project.id}`} value={`${project.id}`}>{`${project.projectName}`}</option>
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBody">
              <Form.Label>Body</Form.Label>
              <Form.Control
                type="textarea"
                name="body"
                placeholder="Main task"
                onChange={({target}) => handleChange(target, setBody)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicIsActive">
               <Form.Check
                type="checkbox"
                name="isActive"
                label="Active task"
                onChange={({target}) => handleChange(target, setIsActive)}/>
             </Form.Group>
            <Link className='btn btn-primary' to='../todo/'
                    onClick={() => handleSubmit()}>Create</Link>
          </Form >
        </div>
      </div>
    );
}
