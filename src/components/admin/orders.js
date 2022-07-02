import {
    Box, Card, CardContent,CardActions, Typography, CircularProgress, Select, MenuItem, Grid,
    IconButton,
    AppBar,
    Toolbar,
    Button,
} from "@mui/material";
import { AccountCircle, CheckCircleOutline } from "@mui/icons-material";
import { useEffect , useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import AccDetails from "./accountInfo";
import { Fetch_adminOrders, Modify_Order } from "../../actions/actions";
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";
import { adminAccountComp } from "../../reducer/reducer";


export default function AdminOrdersCheck() {
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
            <AdminOrders />
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




const AdminOrders = ()=> {
    const admin_info = jwt_decode(window.sessionStorage.getItem('authtoken'))
    const adminOrdersApistatus = useSelector(state => state.adminOrdersApiStatus)
    const orders = useSelector(state => state.AdminOrders)

    const AdminaccCompOpen = useSelector((state) => state.AdminaccCompOpen);
    const nav = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(Fetch_adminOrders(admin_info.admin._id))
    }, [dispatch,admin_info.admin._id])

    const ModifyOrder = (event, _id) => {
        // setSelectedOrderStatus(event.target.value)
        switch (event.target.value) {
            case "Order Received": {
                dispatch(Modify_Order({ status: "Order Received", id: _id, admin_id: admin_info.admin._id }))

                break;
            }
            case "In Kitchen": {
                dispatch(Modify_Order({ status: "In Kitchen", id: _id, admin_id: admin_info.admin._id }))

                break;
            }
            case "Sent to Delivery": {
                dispatch(Modify_Order({ status: "Sent to Delivery", id: _id, admin_id: admin_info.admin._id }))

                break;
            }
            default: {
                break;
            }

        }

    }

    const handleMenu = () => {
        dispatch(adminAccountComp())
    };

    return (
        <Box sx={{ m: "1.5rem", mt: "8%" }}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar sx={{ zIndex: 0 }}>
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "baseline", columnGap: "1rem" }}>
                            <Typography variant="h6"  sx={{ flexGrow: 1 }}>
                                Pizza's
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
            {adminOrdersApistatus === "loading" ?
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
                :
                adminOrdersApistatus === "success" ?
                    <Box>
                       
                        {

                            orders?.map((e) => {
                                return (

                                    <Card key={e._id} elevation={4} sx={{ mb: "1.3rem" }}>

                                        <CardContent>
                                            <Box sx={{ display: "flex",justifyContent:"space-between", alignItems: "center" }}>
                                                <Box>
                                                    <Grid container justifyContent="space-between" alignItems="center">
                                                        <Grid item flexDirection="column">
                                                            {e.order?.map((obj,i) => {
                                                                return (
                                                                    // console.log(e,obj,i)
                                                                    <Box key={obj._id}>
                                                                        <Grid item >
                                                                            <Typography >{obj.name + "  " + obj.quantity + "    " + obj.selected}</Typography>
                                                                        </Grid> 
                                                                          <Box sx={{ flexGrow: 1 }}></Box> 
                                                                    </Box>
                                                                )
                                                            })}
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container columnGap={2}>
                                                        <Typography sx={{ textTransform: "capitalize", fontWeight: "bold" }} >{e.status}</Typography>

                                                        {e.status !== "Sent to Delivery" ?
                                                            <Select

                                                                value={
                                                                    e.status !== "processing" ? ""
                                                                        : e.status === "Order Received" ? "Accept"

                                                                            : ""


                                                                }
                                                                sx={{ px: "0.875rem", height: "1.5rem" }}
                                                                onChange={(event) => ModifyOrder(event, e._id)}
                                                            >
                                                                <MenuItem value="Order Received"
                                                                    disabled={
                                                                        e.status === "Order Received" || e.status === "In Kitchen"
                                                                            ? true : false
                                                                    }
                                                                >Accept</MenuItem>
                                                                <MenuItem value="In Kitchen"
                                                                    disabled={
                                                                        e.status === "In Kitchen" || e.status === "Sent to Delivery"
                                                                            ? true : false
                                                                    }
                                                                >In Kitchen</MenuItem>
                                                                <MenuItem value="Sent to Delivery"
                                                                    disabled={
                                                                        e.status === "Sent to Delivery" ? true : false
                                                                    }
                                                                >Sent to Delivery</MenuItem>
                                                            </Select>
                                                            :

                                                            <Typography>Order Closed</Typography>

                                                        }
                                                    </Grid>
                                                </Box>
                                                {e.status ==="Sent to Delivery"?<CheckCircleOutline color="success" sx={{fontSize:"4rem"}} />:""}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                )
                            })
                        }
                    </Box >
                    :
                    <>
                        <Typography>Data not found</Typography>
                    </>
            }
            {AdminaccCompOpen ? <AccDetails /> : null}
        </Box >
    );
}