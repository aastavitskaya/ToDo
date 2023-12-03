import './App.css';
import { useState, useEffect } from "react";
import Menu from './components/Menu';
import Footer from './components/Footer';
import Home from './components/Home';
import ToDoList from './components/ToDoList';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import NotFound404 from "./components/not-found";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";



function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
  axios.get("http://localhost:8000/api/users/")
    .then(response => {
        setUsers(response.data)
    }).catch(error => {
        console.error(error)
    })
  }, []);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
  axios.get("http://localhost:8000/api/projects/")
    .then(response => {
        setProjects(response.data.results)
    }).catch(error => {
        console.error(error)
    })
  }, []);

  const [todo, setTodo] = useState([]);

  useEffect(() => {
  axios.get("http://localhost:8000/api/todo/")
    .then(response => {
        setTodo(response.data.results)
    }).catch(error => {
        console.error(error)
    })
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Menu />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="projects" element={<ProjectList items={projects} />} />
          <Route path="todo" element={<ToDoList items={todo} />} />
          <Route path="project/:id" element={<ProjectDetail items={projects} />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
