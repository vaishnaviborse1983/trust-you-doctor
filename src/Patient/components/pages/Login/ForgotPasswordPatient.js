import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';

const ForgotPasswordPatient = ({ history }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleResetPassword = async () => {
        // Validation
        if (!email) {
            toast.error('Please enter your email address');
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setLoading(true);
        
        try {
            const auth = getAuth();
            
            // Send password reset email to the actual email address
            await sendPasswordResetEmail(auth, email);
            
            setSuccess(true);
            toast.success(`Password reset link sent to ${email}`);
            
        } catch (error) {
            console.error('Password reset error:', error);
            
            if (error.code === 'auth/user-not-found') {
                toast.error('No account found with this email. Please register first.');
            } else if (error.code === 'auth/too-many-requests') {
                toast.error('Too many attempts. Please try again later.');
            } else if (error.code === 'auth/invalid-email') {
                toast.error('Invalid email address format.');
            } else {
                toast.error('Failed to send reset email. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <ToastContainer />
            <Card style={{ width: '400px', padding: '20px' }}>
                <Card.Body>
                    <Card.Title className="text-center mb-4">
                        Reset Your Password
                    </Card.Title>
                    
                    {success ? (
                        <>
                            <Alert variant="success">
                                <Alert.Heading>Check Your Email!</Alert.Heading>
                                <p>
                                    We've sent a password reset link to <strong>{email}</strong>.
                                    Please check your email and follow the instructions to reset your password.
                                </p>
                                <hr />
                                <p className="mb-0">
                                    <strong>Note:</strong> The reset link will expire in 1 hour.
                                </p>
                            </Alert>
                            <div className="text-center mt-3">
                                <Button 
                                    variant="primary" 
                                    onClick={() => history.push('/login')}
                                >
                                    Back to Login
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-muted mb-4">
                                Enter your registered email address. We'll send a password reset link to this email.
                            </p>
                            
                            <Form.Group className="mb-4">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your registered email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                                <Form.Text className="text-muted">
                                    Enter the email you used during registration
                                </Form.Text>
                            </Form.Group>
                            
                            <Button 
                                variant="primary" 
                                className="w-100 mb-3"
                                onClick={handleResetPassword}
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </Button>
                            
                            <div className="text-center mt-3">
                                <Button 
                                    variant="link" 
                                    onClick={() => history.push('/login')}
                                >
                                    Back to Login
                                </Button>
                                <span className="mx-2">|</span>
                                <Button 
                                    variant="link" 
                                    onClick={() => history.push('/register')}
                                >
                                    Create New Account
                                </Button>
                            </div>
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default withRouter(ForgotPasswordPatient);