import * as React from "react";
import { useState } from "react";
import { Button, TextField, Divider, Link, Box, Typography, Alert } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { useUserStore } from "../store/userStore";

export default function SigninPage() {
    const [email, setEmail] = useState("admin@crud.com");
    const [password, setPassword] = useState("admin");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const [authUser, getAuthUser] = useUserStore((state) => [state.authUser, state.getAuthUser])

    const handleSubmit = () => {
        console.log({
            email: email,
            password: password,
        });

        authService.onLogin({email, password}).then(() => {
            getAuthUser();
            navigate('/');
        }).catch(() => { setError(true) });
    };

    return (
        <Box
            sx={{
                // maxWidth: 350,
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Typography
                component="h1"
                variant="h4"
                fontWeight={800}
                mb={0.4}
                mt={1}
            >
                Login
            </Typography>
            <Box sx={{ mt: 1, maxWidth: '400px' }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Emal"
                    name="email"
                    autoComplete="email"
                    defaultValue={email}
                    onChange={event => setEmail(event.target.value)}
                    autoFocus
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
                    defaultValue={password}
                    onChange={event => setPassword(event.target.value)}
                    onKeyDownCapture={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit();
                        }
                    }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={!email || !password}
                    onClick={handleSubmit}
                    sx={{
                        mt: 3,
                        mb: 2,
                        py: 1,
                    }}
                >
                    Login
                </Button>

                <Box component="div" sx={{width:'100%'}} mb={5}>
                    { error && <Alert severity="error">Email/Password Inválido</Alert>}
                </Box>
            </Box>
        </Box>
    );
}
