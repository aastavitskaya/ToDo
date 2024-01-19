import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from "react-router-dom";
import { logout } from "../core/actions"


function Menu( {token, setToken, name} ) {

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          Привет, {name}
        </Navbar.Brand>
       <NavLink to="/" className='nav-link'>Home</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/projects" className='nav-link'>Projects</NavLink>
            <NavLink to="/users" className='nav-link'>Users</NavLink>
            <NavLink to="/todo" className='nav-link'>ToDo</NavLink>
            {(token) ? (
              <NavLink to="/" className="nav-link" onClick={() => logout(setToken)}>
                Logout
              </NavLink>) : (
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>)}
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;