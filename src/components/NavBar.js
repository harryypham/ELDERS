import React, {useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar, Container, Nav, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import "./css/NavBar.css"
import { useAuth } from "../contexts/AuthContext"
import { auth } from "../firebase";

export default function NavBar() {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { logout } = useAuth();
    async function handleLogout() {
        setError("")
        try {
            await logout()
            navigate("/login")
        } catch {
            setError("Failed to log out")
        }
    }
    useEffect(() => {console.log(error)}, [error])
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="position-fixed w-100" id="navBar-container">
                <Container id="navBar">
                <Navbar.Brand href="/">
                    <img src="/img/icon.png" width="35" height="35" alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" id="navbar-toggle" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="/" className="me-3 text-dark">About Us</Nav.Link>
                    <Nav.Link href="/family" className="mx-3 text-dark">Family</Nav.Link>
                    <Nav.Link href="/friends" className="mx-3 text-dark">Friends</Nav.Link>
                    <Nav.Link href="/bucket-list" className="mx-3 text-dark">Bucket List</Nav.Link>
                    <Nav.Link href="/inspiration" className="mx-3 text-dark">Inspiration</Nav.Link>
                    <Nav.Link href="/diary" className="mx-3 text-dark">Diary</Nav.Link>
                    <Nav.Link href="/testament" className="mx-3 text-dark">Testament</Nav.Link>
                    </Nav>
                    
                </Navbar.Collapse>
                <Navbar id="signup-login">
                    <Nav className="me-auto">
                    {!auth.currentUser && <Nav.Link className="mx-3 text-dark" href="/signup">Sign Up</Nav.Link>}
                    {!auth.currentUser && <Nav.Link className="mx-3 text-dark" href="/login">Log In</Nav.Link>}
                    {auth.currentUser && <Button variant="link" className="mx-3 text-dark logOut-link" onClick={handleLogout}>Log Out</Button>}
                    </Nav>
                </Navbar>
                </Container>
            </Navbar>
        </>
    )
}