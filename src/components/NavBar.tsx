import React from "react";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/esm/Navbar";
import { Link, NavLink } from "react-router-dom";

interface Props {}

const NavBar = (props: Props) => {
    return (
        <Navbar expand='lg' bg='dark' variant='dark'>
            <Navbar.Brand>
                <Link to='/'>GeoLoc</Link>
            </Navbar.Brand>
            <Nav fill variant='pills' className='mr-auto'>
                <NavLink className='nav-link' to='/plots'>
                    Plots
                </NavLink>
                <NavLink className='nav-link' to='/properties'>
                    Properties
                </NavLink>
                <NavLink className='nav-link' to='/objectsFinder'>
                    Objects finder
                </NavLink>
            </Nav>
        </Navbar>
    );
};

export default NavBar;
