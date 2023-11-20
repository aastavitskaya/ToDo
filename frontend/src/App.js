import './App.css';
import { useState, useEffect } from "react";
import Menu from './components/Menu';
import Footer from './components/Footer';
import UsersList from './components/Users';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {

  const [users, setUsers] = useState();

  useEffect(() => {
  axios.get("http://localhost:8000/api/users/")
    .then(response => {
        setUsers(response.data)
    }).catch(error => {
        console.error(error)
    })
  }, []);

  return (
    <div className="App">
      <Menu />
      <UsersList users={users}/>
      <Footer />
    </div>
  );
}

export default App;
