import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext.js';
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [message, setMessage] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
                return setError('The passwords you entered do not match')
            }
        
        try {
            setMessage('')
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/dashboard')
            setMessage('Account Created Successfully')
        } catch {
            setError('Failed To Create Account')
        }

        setLoading(false)
        
    }

  return (
    <div style={{
        zIndex: 1,
        position: 'relative',
        backgroundColor: 'lightgrey'
    }}>
        <Container className='d-flex justify-content-center align-items-center' style={{height: '96vh'}}>
            <div style={{width: 400}}>
                <Card style={{backgroundColor: 'black', color: 'white'}}>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Sign Up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
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
                            <Form.Group id="password-confirm" style={{marginTop: 15}}>
                                <Form.Label>
                                    Password Confirmation
                                </Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required />
                            </Form.Group>
                            <Button disabled={loading} className='w-100' type="submit" style={{marginTop: 21, backgroundColor: 'grey', border: 'none'}}>Sign Up</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/login">Log In</Link>
                </div>
            </div>
        </Container>
    </div>
  )
}