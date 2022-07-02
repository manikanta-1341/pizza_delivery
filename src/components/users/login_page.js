import React, { useState } from 'react';
import { Formik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { url } from '../../api/api'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()} 
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {
    const nav = useNavigate()
    
    let initialvalues = {
        email: "",
        password: ""
    }
    const [passwordDiv, setPasswordDiv] = useState(true)
    const handleSubmit = async (e) => {
        // console.log(e)
        try {
            let response = await axios.post(`${url}/user/login`, {
                username: e.email,
                password: e.password
            })
            // console.log(response)
            if (!response.data.msg) {
                
                window.sessionStorage.setItem('token', response.data)
                nav('/items')
            }
            else {
                alert(response.data.msg)
            }
        }
        catch (err) {
            console.log(err)
        }
    };
    const Validate = (value) => {
        let error = {}
        if (value.email === "") {
            error.email = "Email is Required"
        }
        if (value.password === "") {
            error.password = "Password is Required"
        }
        return error
    }

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
        window.history.go(1);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container
                component="main"
                maxWidth="xs"
            >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        User Login
                    </Typography>
                    <Formik
                        initialValues={initialvalues}
                        validate={(value) => Validate(value)}
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (

                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "100%", maxWidth: "40rem" }}>

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    // autoFocus
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Typography color="red">{touched.email && errors.email}</Typography>
                                {passwordDiv === true ? <Button

                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => {
                                        if (values.email !== "" && values.email.includes("@") && values.email.includes(".com")) {

                                            setPasswordDiv(false)
                                        }
                                        else {
                                            alert("Email is not valid")
                                        }
                                    }}
                                >
                                    Next
                                </Button>
                                    : <>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Typography color="red">{touched.password && errors.password}</Typography>

                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Sign In
                                        </Button>
                                    </>}
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="/forgetpassword" variant="body2" sx={{ textDecoration: "none" }}>
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/register" variant="body2" sx={{ textDecoration: "none" }}>
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>

                            </Box>
                        )}
                    </Formik>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}