import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../Css/index.css';
import { Modal, Button, Form, Navbar, Nav, Container, Alert, Row, Col } from 'react-bootstrap';
import { FaSun, FaMoon } from 'react-icons/fa';

const HomePage = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [registerData, setRegisterData] = useState({ name: '', USN: '', email: '', password: '' });
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [error, setError] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [scrollY, setScrollY] = useState(0); // Track scroll position
    const navigate = useNavigate();

    // Update theme class on body based on dark mode toggle
    useEffect(() => {
        document.body.className = darkMode ? 'dark-theme' : 'light-theme';
    }, [darkMode]);

    // Track scroll position to apply flying-in animation
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY); // Update scrollY state when scrolling
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleTheme = () => {
        setDarkMode(!darkMode); // Toggle the dark mode state
    };

    const resetForm = () => {
        // Reset form data and states
        setRegisterData({ name: '', USN: '', email: '', password: '' });
        setLoginData({ email: '', password: '' });
        setRegisterSuccess(false);
        setError('');
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', registerData);
            if (response.status === 200) {
                setRegisterSuccess(true);
                setTimeout(() => {
                    setShowRegister(false);
                    setShowLogin(true);
                }, 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
            if (response.status === 200) {
                navigate('/menu');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            {/* Navbar with dark mode toggle */}
            <Navbar
                bg="dark"
                expand="lg"
                variant="dark"
                style={{
                    padding: '0.5rem 1rem', // Make navbar smaller
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000, // Ensure navbar stays on top
                }}
            >
                <Container>
                    {/* Title on the left */}
                    <Navbar.Brand href="/" className="me-auto">
                        KLE TECH Blogging Platform
                    </Navbar.Brand>

                    {/* Navbar toggle and items */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            {/* Buttons aligned to the right */}
                            <Button
                                variant="primary"
                                onClick={() => navigate('/register')}
                                className="me-2"
                            >
                                Register
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => navigate('/login')}
                                className="me-2"
                            >
                                Login
                            </Button>
                            <Button variant="link" onClick={toggleTheme} style={{ color: 'white', background: 'none' }}>
                                {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Main Content with Background Image */}
            <div
                className="hero-section"
                style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '80px 0',
                    color: 'white',
                    textAlign: 'center',
                    height: '100vh',
                }}
            >
                <Container>
                    <h1>Welcome to the KLE TECH Blogging Platform</h1>
                    <p>Share and explore ideas with the student community!</p>
                    <Button
                        variant="outline-light"
                        onClick={() => {
                            setShowRegister(true);
                            resetForm();
                        }}
                        size="lg"
                        className="me-2"
                    >
                        Get Started
                    </Button>
                </Container>
            </div>

            <Container className="my-5">
                <Row className="align-items-center">
                    <Col
                        md={6}
                        className={`text-center image-section ${scrollY > 150 ? 'fly-in' : ''}`}
                    >
                        <img
                            src="https://img.freepik.com/free-vector/blog-post-concept-illustration_114360-26355.jpg"
                            alt="Blogimage"
                            className="img-fluid rounded"
                            style={{
                                width: '100%',
                                height: 'auto',
                                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                                marginBottom: '30px',
                                transition: 'transform 0.5s ease-out',
                            }}
                        />
                    </Col>
                    <Col md={6}>
                        <h2>About the Student Blogging Community</h2>
                        <p>
                            The KLE TECH Blogging Platform is a space designed for students to share their thoughts, ideas, and knowledge with the community.
                            Join us to connect with like-minded individuals, expand your network, and be a part of the ever-growing student community.
                        </p>
                    </Col>
                </Row>
            </Container>

            <Container className="my-5">
                <Row className="align-items-center">
                    <Col md={6}>
                        <h2>About the KLE Technological University</h2>
                        <p>
                            KLE Technological University is a vibrant academic community that encourages students to explore, innovate, and excel in their respective fields.
                            It provides a nurturing environment for personal and professional growth, fostering a culture of collaboration and continuous learning.
                        </p>
                    </Col>
                    <Col
                        md={6}
                        className={`text-center image-section order-md-2 ${scrollY > 150 ? 'fly-in' : ''}`}
                    >
                        <img
                            src="https://www.kletech.ac.in/hubballi/images/abt-over-img.jpg"
                            alt="Blogimage"
                            className="img-fluid rounded"
                            style={{
                                width: '100%',
                                height: 'auto',
                                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                                marginBottom: '30px',
                                transition: 'transform 0.5s ease-out',
                            }}
                        />
                    </Col>
                </Row>
            </Container>

            <footer style={{ backgroundColor: '#475762', color: 'white', padding: '20px 0', marginTop: 'auto' }}>
                <Container className="text-center">
                    <p>&copy; 2024 KLE TECH Blogging Platform. All rights reserved.</p>
                    <p>
                        <a href="https://kletech.ac.in" style={{ color: 'white' }} target="_blank" rel="noopener noreferrer">
                            Visit KLE TECH Website
                        </a>
                    </p>
                </Container>
            </footer>
        </div>
    );
};

export default HomePage;