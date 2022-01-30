import React ,{useRef, useState}from 'react';
import './Form.css';
import { useAuth } from './Handler/AuthContext'
import { useHistory } from 'react-router-dom';
import {Alert, Container, Form, Image, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
const FormSignup = () => {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory();
  async function handleSubmit(e){
    e.preventDefault(); 
    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('Passwword do not Match')
    }
    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push('/login')
    } 
    catch {
      setError('Failed to signUp')
    }
    setLoading(false)
  }
  return (
    <>
    <>
        <Container fluid className='p-5 m-auto shadow-lg' style={{ backgroundImage: 'url(/img/bgbaru.png)' }}>
            <Container className='position-relative rounded-3 p-5 shadow-lg align-items-center justify-content-center' style={{ background: 'linear-gradient(90deg, rgb(40, 40, 40) 0%, rgb(17, 17, 17) 100%)'}} >
            <Container className='align-items-center justify-content-center d-flex'>
            <Image className='img-fluid w-25' src='img/pdam4.png' alt='image/png'/>
            </Container>
                <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
                    <h1 className='text-white text-center m-3'> Selamat Datang!</h1>
                    <h1 className='text-white text-center'>Dashboard Website PDAM Madiun</h1>
                    <Form.Group className='d-grid justify-content-center align-items-center'>
                    <Form.Group className='m-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Masukan Email' ref={emailRef}/>
                    </Form.Group>
                    <Form.Group className='m-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Masukan Password' ref={passwordRef}/>
                    </Form.Group>
                    <Form.Group className='m-3'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Masukan Password' ref={passwordConfirmRef}/>
                    </Form.Group>
                    <Form.Group className='m-3'>
                    <Button type='submit' className='m-auto h-100 w-100' style={{ background: 'linear-gradient(90deg,rgb(39, 176, 255) 0%,rgb(0, 232, 236) 100%)' }}>SignUp</Button>
                    </Form.Group>
                    </Form.Group>
                </Form>
                <span className=' text-white justify-content-center align-items-center d-flex fs-6'>
                         Sudah punya akun? Login <a href='/login'> disini</a>
                         </span>
            </Container>    
        </Container>
        </>
    </>
  );
};

export default FormSignup;
