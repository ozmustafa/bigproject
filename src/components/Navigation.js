import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';


export class Navigation extends Component {
    render() {
        return (
            <Navbar bg="primary" variant="dark" expand="lg">
                <Navbar.Brand href="#home">Your Company</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink className="d-inline p-2 text-white bg-primary" to="/">Home</NavLink>
                        <NavLink className="d-inline p-2 text-white bg-primary" to="/department">Department</NavLink>
                        <NavLink className="d-inline p-2 text-white bg-primary" to="/employee">Employee</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
