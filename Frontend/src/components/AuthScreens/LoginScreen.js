import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

import { Modal, Button, Form, Navbar, Nav, Container, Alert, Row, Col, Card } from 'react-bootstrap';
import { FaSun, FaMoon, FaPenFancy, FaUsers, FaGraduationCap, FaArrowRight } from 'react-icons/fa';

const HomePage = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [registerData, setRegisterData] = useState({ name: '', USN: '', email: '', password: '' });
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [error, setError] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const navigate = useNavigate();

    // Update theme class on body based on dark mode toggle
    useEffect(() => {
        document.body.className = darkMode ? 'dark-theme' : 'light-theme';
    }, [darkMode]);

    // Track scroll position to apply flying-in animation
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Mock data for featured posts (in a real app, this would come from an API)
    useEffect(() => {
        const mockPosts = [
            {
                id: 1,
                title: "The Future of AI in Education",
                excerpt: "Exploring how artificial intelligence is transforming learning experiences in universities...",
                category: "Technology"
            },
            {
                id: 2,
                title: "Sustainable Campus Initiatives",
                excerpt: "How KLE TECH is leading the way in eco-friendly campus operations and education...",
                category: "Sustainability"
            },
            {
                id: 3,
                title: "Student Entrepreneurship Stories",
                excerpt: "Inspiring journeys of students who turned their ideas into successful startups...",
                category: "Entrepreneurship"
            }
        ];
        setFeaturedPosts(mockPosts);
    }, []);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const resetForm = () => {
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
            {/* Enhanced Navbar */}
            <Navbar
                bg={darkMode ? "dark" : "light"}
                expand="lg"
                variant={darkMode ? "dark" : "light"}
                fixed="top"
                style={{
                    padding: '0.6rem 1rem',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                }}
            >
                <Container>
                    <Navbar.Brand href="/" className="d-flex align-items-center">
                        <FaPenFancy className="me-2" style={{ color: '#0d6efd' }} />
                        <span style={{ fontWeight: '600', fontSize: '1.4rem' }}>KLE Tech Blog</span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="align-items-center">
                            <Nav.Link href="#features" className="mx-2">Features</Nav.Link>
                            <Nav.Link href="#about" className="mx-2">About</Nav.Link>
                            <Nav.Link href="#posts" className="mx-2">Featured</Nav.Link>
                            <Button
                                variant="outline-primary"
                               onClick={() => {
                  // Redirect to Login page
                  navigate('/authlogin');
                }}
                                className="mx-2"
                                style={{ borderRadius: '20px' }}
                            >
                                Sign In
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => {
                  // Redirect to Register page
                  navigate('/register');
                }}
                                className="mx-2"
                                style={{ borderRadius: '20px' }}
                            >
                                Get Started
                            </Button>
                            <Button 
                                variant="link" 
                                onClick={toggleTheme} 
                                className="mx-2"
                                style={{ 
                                    color: darkMode ? 'white' : 'black', 
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero Section with Gradient Background */}
            <div
                className="hero-section d-flex align-items-center"
                style={{
                    background: darkMode 
                        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' 
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '120px 0 80px',
                    color: 'white',
                    minHeight: '100vh',
                    marginTop: '56px'
                }}
            >
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="pe-lg-5">
                            <h1 className="display-4 fw-bold mb-4">Share Your Voice with KLE Tech Community</h1>
                            <p className="lead mb-4">
                                A dedicated platform for students and faculty to share ideas, insights, and innovations. 
                                Join our growing community of thinkers and creators.
                            </p>
                            <div className="d-flex flex-wrap gap-3">
                                <Button
                                    variant="light"
                                    size="lg"
                                    onClick={() => {
                                        setShowRegister(true);
                                        resetForm();
                                    }}
                                    className="px-4 py-2 rounded-pill d-flex align-items-center"
                                >
                                    Start Writing <FaArrowRight className="ms-2" />
                                </Button>
                                <Button
                                    variant="outline-light"
                                    size="lg"
                                    onClick={() => {
                                        const element = document.getElementById('features');
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="px-4 py-2 rounded-pill"
                                >
                                    Learn More
                                </Button>
                            </div>
                        </Col>
                        <Col lg={6} className="mt-5 mt-lg-0">
                            <img
                                src="https://img.freepik.com/free-vector/blogging-concept-illustration_114360-1038.jpg"
                                alt="Blogging Illustration"
                                className="img-fluid"
                                style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))' }}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Features Section */}
            <Container id="features" className="py-5 my-5">
                <Row className="text-center mb-5">
                    <Col>
                        <h2 className="display-5 fw-bold">Why Join Our Platform?</h2>
                        <p className="lead text-muted">Discover the benefits of being part of our academic blogging community</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={4} className="mb-4">
                        <Card className="h-100 border-0 shadow-sm hover-shadow">
                            <Card.Body className="text-center p-4">
                                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                                    <FaPenFancy size={30} className="text-primary" />
                                </div>
                                <Card.Title>Easy Publishing</Card.Title>
                                <Card.Text>
                                    Share your thoughts and ideas with our intuitive writing interface designed for academic content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="h-100 border-0 shadow-sm hover-shadow">
                            <Card.Body className="text-center p-4">
                                <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                                    <FaUsers size={30} className="text-success" />
                                </div>
                                <Card.Title>Engaged Community</Card.Title>
                                <Card.Text>
                                    Connect with students and faculty across departments for meaningful discussions and feedback.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="h-100 border-0 shadow-sm hover-shadow">
                            <Card.Body className="text-center p-4">
                                <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                                    <FaGraduationCap size={30} className="text-info" />
                                </div>
                                <Card.Title>Academic Focus</Card.Title>
                                <Card.Text>
                                    Content tailored for educational growth, research sharing, and intellectual development.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Featured Posts Section */}
            <div id="posts" className="py-5 bg-light">
                <Container>
                    <Row className="text-center mb-5">
                        <Col>
                            <h2 className="display-5 fw-bold">Featured Content</h2>
                            <p className="lead text-muted">Discover trending topics from our community</p>
                        </Col>
                    </Row>
                    <Row>
                        {featuredPosts.map((post) => (
                            <Col lg={4} md={6} className="mb-4" key={post.id}>
                                <Card className="h-100 border-0 shadow-sm post-card">
                                    <Card.Body className="p-4">
                                        <span className="badge bg-primary mb-2">{post.category}</span>
                                        <Card.Title className="h5">{post.title}</Card.Title>
                                        <Card.Text className="text-muted">{post.excerpt}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="bg-transparent border-0 pt-0">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="text-muted">{post.author}</small>
                                            <small className="text-muted">{post.date}</small>
                                        </div>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>

            {/* About University Section */}
            <Container id="about" className="py-5 my-5">
                <Row className="align-items-center">
                    <Col md={6} className="pe-md-5">
                        <h2 className="display-6 fw-bold mb-4">About KLE Technological University</h2>
                        <p className="lead">
                            KLE Technological University is a vibrant academic community that encourages students to explore, 
                            innovate, and excel in their respective fields. We provide a nurturing environment for personal 
                            and professional growth, fostering a culture of collaboration and continuous learning.
                        </p>
                        <p>
                            Our blogging platform extends this mission into the digital realm, creating spaces for knowledge 
                            sharing beyond the classroom and connecting our community through the exchange of ideas.
                        </p>
                        <Button 
                            variant="outline-primary" 
                            href="https://kletech.ac.in" 
                            target="_blank"
                            className="mt-3 rounded-pill"
                        >
                            Visit University Website
                        </Button>
                    </Col>
                    <Col md={6} className="mt-5 mt-md-0">
                        <img
                            src="https://www.kletech.ac.in/wp-content/uploads/2023/05/Dr.-Ashok-Shettar-Sir-VC-KLE-Tech-1.jpg"
                            alt="KLE Technological University Campus"
                            className="img-fluid rounded shadow"
                        />
                    </Col>
                </Row>
            </Container>

            {/* Call to Action Section */}
            <div className="py-5" style={{
                background: darkMode 
                    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' 
                    : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white'
            }}>
                <Container className="text-center py-5">
                    <h2 className="display-5 fw-bold mb-4">Ready to Share Your Ideas?</h2>
                    <p className="lead mb-4">Join hundreds of students and faculty already publishing on our platform</p>
                    <Button
                        variant="light"
                        size="lg"
                        onClick={() => {
                  // Redirect to Register page
                  navigate('/register');
                }}
                        className="px-5 py-3 rounded-pill fw-bold"
                    >
                        Create Your Account Now
                    </Button>
                </Container>
            </div>

            {/* Footer */}
            <footer style={{ 
                backgroundColor: darkMode ? '#1a1a2e' : '#2c3e50', 
                color: 'white', 
                padding: '40px 0 20px'
            }}>
                <Container>
                    <Row>
                        <Col md={4} className="mb-4">
                            <h5>KLE Tech Blog</h5>
                            <p>A platform for the academic community to share knowledge, insights, and innovations.</p>
                        </Col>
                        <Col md={2} className="mb-4">
                            <h6>Quick Links</h6>
                            <ul className="list-unstyled">
                                <li><a href="#features" className="text-light text-decoration-none">Features</a></li>
                                <li><a href="#posts" className="text-light text-decoration-none">Featured Posts</a></li>
                                <li><a href="#about" className="text-light text-decoration-none">About</a></li>
                            </ul>
                        </Col>
                        <Col md={3} className="mb-4">
                            <h6>University Links</h6>
                            <ul className="list-unstyled">
                                <li><a href="https://kletech.ac.in" className="text-light text-decoration-none" target="_blank" rel="noopener noreferrer">Main Website</a></li>
                                <li><a href="https://kletech.ac.in/academics/" className="text-light text-decoration-none" target="_blank" rel="noopener noreferrer">Academics</a></li>
                                <li><a href="https://kletech.ac.in/admissions/" className="text-light text-decoration-none" target="_blank" rel="noopener noreferrer">Admissions</a></li>
                            </ul>
                        </Col>
                        <Col md={3} className="mb-4">
                            <h6>Contact</h6>
                            <p>KLE Technological University<br />Hubballi, Karnataka 580031<br />Email: info@kletech.ac.in</p>
                        </Col>
                    </Row>
                    <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                    <Row className="align-items-center">
                        <Col md={6}>
                            <p className="mb-0">&copy; 2024 KLE Technological University. All rights reserved.</p>
                        </Col>
                        <Col md={6} className="text-md-end">
                            <a href="#" className="text-light me-3">Privacy Policy</a>
                            <a href="#" className="text-light">Terms of Service</a>
                        </Col>
                    </Row>
                </Container>
            </footer>

            {/* Register Modal */}
            <Modal show={showRegister} onHide={() => setShowRegister(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create Account</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleRegisterSubmit}>
                    <Modal.Body>
                        {registerSuccess && (
                            <Alert variant="success" className="py-2">
                                Registration successful! Redirecting to login...
                            </Alert>
                        )}
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your full name"
                                value={registerData.name}
                                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>USN</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your USN"
                                value={registerData.USN}
                                onChange={(e) => setRegisterData({ ...registerData, USN: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={registerData.email}
                                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={registerData.password}
                                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowRegister(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Login Modal */}
            <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleLoginSubmit}>
                    <Modal.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowLogin(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default HomePage;