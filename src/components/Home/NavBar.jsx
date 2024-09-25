import React from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

class NavBar extends React.Component {
    render() {
        return (
            <Navbar expand="lg" style={{ backgroundColor: '#20232A' }}>
                <Container>
                    <Navbar.Brand as={Link} to="/" className="text-white">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/customers" className="text-white">Clientes</Nav.Link>
                            <Nav.Link as={Link} to="/suppliers" className="text-white">Proveedores</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default NavBar;