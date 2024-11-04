import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Link, FormControlLabel, Checkbox } from '@mui/material';
import Grid from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/DataApi';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [userId,setUserId] = useState('');
    const [password,setPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState('');

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            const fetchData = await loginUser(userId,password)
            console.log("token",fetchData.token)
            localStorage.setItem('user',userId)
            localStorage.setItem('token',fetchData.token)
            navigate("/dashboard");
        } catch(error) {
            setErrorMessage("Invalid User")
        }
       
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Typography variant="h5" color="error">
                    {errorMessage}
                    </Typography>
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
