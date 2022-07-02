import { useDispatch, useSelector } from 'react-redux';
import { createOrderList } from '../../reducer/reducer'
import jwt_decode from "jwt-decode"
import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, IconButton, Button, AppBar, Toolbar,CardActions } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import axios from 'axios';
import { url } from '../../api/api'
import { useNavigate } from 'react-router-dom';
import { accountComp } from '../../reducer/reducer';
import AccDetails from "./accountInfo";
import {Fetch_customPizza} from '../../actions/actions'

export default function OrdersCheck() {
    const [tokencheck] = useState(window.sessionStorage.getItem('token'))
    const nav = useNavigate()
    if (tokencheck) {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function (event) {
            window.history.go(1);
        };
    }
    return (
        tokencheck ? <>
            <Orders />
        </>
            :
            <>
                <Card sx={{ width: '100%', maxWidth: "40%", mx: "auto", mt: "12%", p: "2%", backgroundColor: "#e9e9e9" }} variant="outlined">
                    <CardContent>
                        <Typography sx={{ textAlign: "center" }} variant="h5" color="dark">Please Login To Access The Content</Typography>
                    </CardContent>
                    <CardActions>
                        <Button sx={{ mx: "auto", fontSize: "1.5rem" }} onClick={() => nav('/user/login')}>Login</Button>
                    </CardActions>
                </Card>
            </>
    );
}






const Orders = ()=> {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const user_info = jwt_decode(window.sessionStorage.getItem('token')).user
    const orderList = useSelector(state => state.orderList)
    const accCompOpen = useSelector((state) => state.accCompOpen);
    useEffect(() => {
        let ApiCall = async () => {
            let response = await axios.get(`${url}/user/orders/${user_info._id}`)
            dispatch(Fetch_customPizza())
            dispatch(createOrderList(response.data.orders))
        }
        ApiCall()

    }, [dispatch,user_info._id])

    const text_styles = {
        color: "text.secondary",
        fontWeight: "bold"
    }

    const handleMenu = () => {
        dispatch(accountComp())
    };
    return (
        <Box>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar sx={{ zIndex: 0 }}>
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Box sx={{display:"flex",alignItems:"baseline" ,columnGap:"1rem"}}>
                            <Typography variant="h6"  sx={{ flexGrow: 1 }}>
                                Pizza's
                            </Typography>
                            <Button sx={{ color: "white",fontSize:"1.2rem" }} onClick={() => nav('/items')}>Home</Button>
                        </Box>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => handleMenu()}
                            color="inherit"
                        >
                            <AccountCircle fontSize='large' />
                        </IconButton>
                    </Toolbar>
                </AppBar>

            </Box>
            <Box sx={{ m: "1.5rem", mt: "8%" }}>
                {
                    orderList?.map((e) => {
                        return (
                            <Card elevation={2} key={e._id}
                                sx={{
                                    // borderRadius:"0rem",
                                    boxShadow: e.status === "processing" ?
                                        `0px 3px 1px -2px #ff5722 ,
                                        0px 2px 2px 0px #ff5722 ,
                                        0px 1px 5px 0px #ff5722 `
                                        : e.status === "Order Placed" ?
                                            `0px 3px 1px -2px #8bc34a ,
                                        0px 2px 2px 0px #8bc34a ,
                                        0px 1px 5px 0px #8bc34a `
                                            : e.status === "In Kitchen" ?
                                                `0px 3px 1px -2px #4caf50 ,
                                        0px 2px 2px 0px #4caf50 ,
                                        0px 1px 5px 0px #4caf50 `
                                                : `0px 3px 1px -2px #00ff0a ,
                                        0px 2px 2px 0px #00ff0a ,
                                        0px 1px 5px 0px #00ff0a `
                                    ,
                                    mb: "1rem"

                                }}
                            >
                                <CardContent>
                                    <Grid container  justifyContent="space-between" alignItems="center">
                                        <Grid item flexDirection="column">
                                            {e.order?.map((obj) => {
                                                return (
                                                    <Box key={obj._id}>
                                                        <Grid item >
                                                            <Typography sx={text_styles} >{obj.name + "  " + obj.quantity + "    " + obj.selected}</Typography>
                                                        </Grid>

                                                        <Box sx={{ flexGrow: 1 }}></Box>
                                                    </Box>
                                                )
                                            })}
                                        </Grid>
                                        <Grid item >
                                            <Typography sx={[text_styles]} >{e.totalValue}₹ Paid</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid>
                                        <Typography sx={{ textTransform: "capitalize", fontWeight: "bold" }} >{e.status}</Typography>
                                    </Grid>
                                </CardContent>
                            </Card>
                        )
                    })
                }
            </Box>
            {accCompOpen ? <AccDetails /> : null}
        </Box>
    );
}