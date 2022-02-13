import React, { useRef, useState } from "react"
import NavBar from './NavBar';
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/Signup.css"
import { createUserDocument } from "../contexts/DBMethods"
import {updateProfile} from "firebase/auth";


export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const dobRef = useRef()
  const firstnameRef = useRef()
  const lastnameRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value).then(cred => {
        updateProfile(cred.user, {
          displayName: firstnameRef.current.value + " " + lastnameRef.current.value
        })
        createUserDocument(cred.user, firstnameRef.current.value, lastnameRef.current.value, dobRef.current.value)
      })
      navigate("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    
    <div className="w-100 vh-100 d-flex" id="signup-bg-container">
      <NavBar />
      <div className="w-50 h-100 d-flex align-items-center justify-content-center float-left" id="signup-img-container">
      </div>
      <div className="w-50 h-100 d-flex justify-content-center align-items-center float-right">
        <Card className="w-100 ml-1 " id="signup-form">
          <Card.Body>
            <h2 className="text-center mb-2">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="first-name">
                <Form.Label>First Name (optional)</Form.Label>
                <Form.Control type="text" ref={firstnameRef} />
              </Form.Group>
              <Form.Group id="last-name">
                <Form.Label>Last Name (optional)</Form.Label>
                <Form.Control type="text" ref={lastnameRef} />
              </Form.Group>
              <Form.Group id="dob">
                <Form.Label>Date of Birth (optional)</Form.Label>
                <Form.Control type="text" ref={dobRef} />
              </Form.Group>

              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm" className="mb-3">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
            <div className="w-100 text-center mt-2">
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
      
    </div>
    
  )
}
