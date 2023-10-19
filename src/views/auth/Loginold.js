import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext.js'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/dashboard")
        } catch {
            setError('Failed to log in')
        }

        setLoading(false)
        
    }

  return (
    <div style={{
        zIndex: 1,
        position: 'relative',
        backgroundColor: 'lightgrey'
    }}>
        <Container className='d-flex justify-content-center align-items-center'
         style={{
            height: '96vh'
        }}>
            <div style={{width: 400}}>
                <Card style={{backgroundColor: 'black', color: 'white'}}>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Log In</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit} >
                            <Form.Group id="email">
                                <Form.Label>
                                    Email
                                </Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id="password" style={{marginTop: 15}}>
                                <Form.Label>
                                    Password
                                </Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>
                            <Button disabled={loading} className='w-100' type="submit" style={{marginTop: 21, backgroundColor: 'grey', border: 'none'}}>Login</Button>
                        </Form>
                        <div className="w-100 text-center mt-3">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </Container>
    </div>
  )
}