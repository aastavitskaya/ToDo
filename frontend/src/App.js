import './App.css';
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Home from './components/Home';
import ToDoList from './components/ToDoList';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import NotFound404 from "./components/not-found";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { USERS_API, TODO_API, PROJECTS_API } from "./core/consts";
import { fetchData, getToken, getHeaders, getTokenFromStorage } from "./core/actions"
import UsersList from "./components/Users";
import LoginForm from "./components/Auth";


function App() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [todo, setTodo] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    // теперь вместо загрузки данных с бека мы пытаемся получить токен, записанный в cookies
    getTokenFromStorage(setToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  useEffect(() => {
    fetchData(USERS_API, setUsers);
    fetchData(PROJECTS_API, setProjects);
    fetchData(TODO_API, setTodo);
    
  }, [token]);

  return (
    <div className="body">
      <div className="top">
        <ToastContainer />
        <BrowserRouter>
          <Menu token={token} setToken={setToken} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="projects" element={<ProjectList projects={projects} users={users} />} />
            <Route path="todo" element={<ToDoList items={todo} users={users} projects={projects} />} />
            <Route path="project/:id" element={<ProjectDetail projects={projects} users={users}/>} />
            <Route path="users" element={<UsersList users={users} />} />
            <Route path="login" element={<LoginForm getToken={getToken} setToken={setToken} />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
