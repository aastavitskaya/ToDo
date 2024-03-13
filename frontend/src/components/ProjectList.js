import ProjectItem from './Project';
import Table from 'react-bootstrap/Table';
import {Link, NavLink} from "react-router-dom";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";
import {PROJECTS_API} from "../core/consts";
import axiosInstance from "../core/interceptor";
import axios from "axios";

export default function ProjectList({projects, users, setProjects}) {
  const [projectName, setProjectName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = {
      "projectName": projectName,
    }

    axiosInstance.get(PROJECTS_API, {params: data})
      .then(response => {
        setProjects(response.data.results)
      })
      .catch(error => {
        console.error(error);
      });
  }
  const handleChange = (target, setState) => {
    setState(target.value);
  }

  return (
    <div className="d-flex align-items-center flex-column">
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>ID</th>
          <th>Project Name</th>
          <th>Link to repo</th>
          <th>Description</th>
          <th>Project Team</th>
        </tr>
        </thead>
        <tbody>
        {projects.map((project) => (
          <ProjectItem project={project} users={users} setProjects={setProjects}/>
        ))}
        </tbody>
      </Table>
      <NavLink to='create' className='btn btn-primary'>Create new</NavLink>
      <Form className='mt-5' inline>
        <Row>
          <Col xs='auto'>
            {projectName
              ? <Button className="me-2" type="button" variant="outline-success"
                        onClick={() => setProjectName('')}>Clear</Button>
              : null}
          </Col>
          <Col xs='auto'>
            <Form.Control
              onChange={({target}) => handleChange(target, setProjectName)}
              value={projectName}
              type="text"
              placeholder="Project Name "
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Link
              className='btn btn-info'
              to='projects'
              onClick={(event) => handleSubmit(event)}>Search</Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
