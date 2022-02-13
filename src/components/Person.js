import "bootstrap/dist/css/bootstrap.min.css"
import {Container, Row, Col} from "react-bootstrap";
import {BrowserRouter, useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore"; 
import { db } from "../firebase";
import { auth } from "../firebase";
import NavBar from './NavBar'
import "./css/Person.css"
export default function Person() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = auth.currentUser;
    const [person, setPerson] = useState({})
    useEffect(
        () => {
        if (user) {
            onSnapshot(doc(db, "family", user.uid), (doc) => {
            const data = doc.data();
            console.log(data);
            Object.keys(data).map((key, idx) => {
                if (key == id) {
                    let p = data[key];
                    setPerson(p)
                }
            })
            })
        } else {
            navigate("/login");
        }
        },
        []
    );
    return (
        <Container className="person-container">
            <NavBar />
            <Row className="vh-100">
                <Col className="d-flex justify-content-center align-items-center">
                    <img src={person.img} alt="" className="w-50"></img>
                </Col>
                <Col className="d-flex flex-column justify-content-center align-items-center">
                    <h1>{person.name}</h1>
                    <ul>
                        <li><h2>DOB: {person.dob}</h2></li>
                        <li><h2>Relationship: {person.relationship}</h2></li>
                        <li><h2>Phone: {person.phone}</h2></li>
                        <li><h2>Address: {person.address}</h2></li>
                    </ul>
                    
                </Col>
            </Row>
        </Container>
    )
}