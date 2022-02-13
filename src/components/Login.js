import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import NavBar from './NavBar';
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/Login.css"
import { useAuth } from "../contexts/AuthContext"
import { googleProvider } from "../contexts/AuthMethods"
import { createGoogleUserDocument } from "../contexts/DBMethods"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, loginWithSocialMedia } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate("/");
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }
  async function handleGoogle(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await loginWithSocialMedia(googleProvider).then((result) => {
        createGoogleUserDocument(result.user)
      })
      navigate("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }
  // async function handleFacebook(e) {
  //   e.preventDefault()

  //   try {
  //     setError("")
  //     setLoading(true)
  //     await loginWithSocialMedia(facebookProvider)
  //     history.push("/")
  //   } catch {
  //     setError("Failed to log in")
  //   }

  //   setLoading(false)
  // }

  return (
    <div className="w-100 vh-100 d-flex">
      <NavBar />
      <div className="w-50 h-100 d-flex justify-content-center align-items-center">
        <Card className="w-100 ml-1 " id="login-form">
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-3" type="submit" variant="outline-primary" onClick={handleSubmit}>
                Log In
              </Button>
              <Button disabled={loading} className="w-100 my-2 d-flex align-items-center justify-content-center" onClick={handleGoogle} id="google-login" variant="outline-primary">
                <img src="/img/google_icon.png" alt="" id="google-logo" className="pr-4 mr-3"></img>
                Log In with Google
              </Button>
              {/* <Button disabled={loading} className="w-100 my-2 d-flex align-items-center justify-content-center" onClick={handleFacebook} id="facebook-login" variant="outline-primary">
                <img src="/img/f_logo_RGB-Blue_58.png" alt="" id="facebook-logo" className="mr-3"></img>
                Log In with Facebook
              </Button> */}
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
          </Card.Body>
          
        </Card>
      </div>
      <div className="w-50 h-100 float-right d-flex align-items-center justify-content-center" id="login-img-container">
      </div>
    </div>
  )
}
