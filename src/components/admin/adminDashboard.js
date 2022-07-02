import {
    Button, Card, CardContent, Typography, CardActions, Box, AppBar,
    Toolbar, IconButton, Table, TableHead, TableRow, TableCell, TableBody,
    Grid, CircularProgress,

} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"
import { adminAccountComp } from "../../reducer/reducer";
import AccDetails from "./accountInfo";
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Fetch_call, Fetch_customPizza } from "../../actions/actions";


export default function AdminDashboardCheck() {
    const [tokencheck] = useState(window.sessionStorage.getItem('authtoken'))
    const nav = useNavigate()
    if (tokencheck) {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function (event) {
            window.history.go(1);
        };
    }
    return (
        tokencheck ? <>
            <AdminDashboard />
        </>
            :
            <>
                <Card sx={{ width: '100%', maxWidth: "40%", mx: "auto", mt: "12%", p: "2%", backgroundColor: "#e9e9e9" }} variant="outlined">
                    <CardContent>
                        <Typography sx={{ textAlign: "center" }} variant="h5" color="dark">Please Login To Access The Content</Typography>
                    </CardContent>
                    <CardActions>
                        <Button sx={{ mx: "auto", fontSize: "1.5rem" }} onClick={() => nav('/admin/login')}>Login</Button>
                    </CardActions>
                </Card>
            </>
    );
}

const AdminDashboard = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const AdminaccCompOpen = useSelector((state) => state.AdminaccCompOpen);
    const inventory = useSelector(state => state.inventory)
    const items = useSelector(state => state.items)
    useEffect(() => {
        dispatch(Fetch_call())
        dispatch(Fetch_customPizza())
    }, [dispatch])

    const handleMenu = () => {
        dispatch(adminAccountComp())
    };

   
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar sx={{ zIndex: 0, position: "static" }}>
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "baseline", columnGap: "1rem" }}>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                Pizza's
                            </Typography>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                Admin Dashboard
                            </Typography>
                            <Button sx={{ color: "white", fontSize: "1rem" }} onClick={() => nav('/admin/dashboard')}>Home</Button>
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
            <Box sx={{ mt: "5%", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                <Button variant="contained" onClick={() => nav('/create/inventory')}>Create&nbsp;Inventory</Button>
                <Button variant="contained" onClick={() => nav('/update/inventory')}>Update&nbsp;Inventory</Button>
                <Button variant="contained" onClick={() => nav('/admin/orders')}>Orders</Button>
            </Box>
            <Box sx={{
                mt:"1.5rem",
                mx:2,
                backgroundColor:"#0077ff2e",
                p:2,
                borderLeft:"10px solid blue"
                }}><Typography variant="h5">Pizza's</Typography></Box>
            {
                items.length >0?
                <Box sx={{mt:"1.5rem"}}>
                    <Table padding="normal" sx={{border:"2px solid#bebec387",maxWidth:550,mx:"auto"}}>
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography sx={{textAlign:"center",fontWeight:"bold"}}>Name</Typography></TableCell>
                                <TableCell><Typography sx={{textAlign:"center",fontWeight:"bold"}}>Remaning&nbsp;Quantity</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                items.map((obj)=>{
                                    return(
                                        <TableRow key={obj._id}>
                                            <TableCell><Typography sx={{textAlign:"center"}}>{obj.name}</Typography></TableCell>
                                            <TableCell><Typography sx={{textAlign:"center"}}>{obj.quantity}</Typography></TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </Box>
                :
                <Box
                    sx={{
                        mt: "20%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress />
                    <Typography>...Loading Please Wait</Typography>
                </Box>
            }
            <Box sx={{
                mt:"1.5rem",
                mx:2,
                backgroundColor:"#0077ff2e",
                p:2,
                borderLeft:"10px solid blue"
                }}><Typography variant="h5">Raw&nbsp;Materials</Typography></Box>
            {inventory !== "" ?
                <Box sx={{ mt: "2rem" }}>
                    <Grid container spacing={4}>
                        {
                            Object.keys(inventory)?.map((key) => {
                                return (
                                    key !== "_id" && key !== "__v" && (
                                        // <TableContainer>
                                        <Grid item xs={6} key={key} >
                                            <Table sx={{ border: "2px solid #bebec387", }} padding="normal" size="small" >
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell colSpan={2}><Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>{key}</Typography></TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell><Typography sx={{ textAlign: "center" }}>Name</Typography></TableCell>
                                                        <TableCell><Typography sx={{ textAlign: "center" }}>Remaning&nbsp;Quantity</Typography></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        inventory[key].map((obj) => {
                                                            return (

                                                                <TableRow key={obj._id}>
                                                                    <TableCell><Typography sx={{ textAlign: "center" }}>{obj.Name}</Typography></TableCell>
                                                                    <TableCell><Typography sx={{ textAlign: "center" }}>{obj.Quantity}</Typography></TableCell>   
                                                                
                                                                </TableRow>
                                                            )
                                                        })
                                                    }
                                                </TableBody>
                                            </Table>
                                        </Grid>
                                        // </TableContainer>
                                    )
                                )
                            })
                        }
                    </Grid>
                </Box>
                :
                <Box
                    sx={{
                        mt: "20%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress />
                    <Typography>...Loading Please Wait</Typography>
                </Box>
            }
            {AdminaccCompOpen ? <AccDetails /> : null}
        </>
    );
}