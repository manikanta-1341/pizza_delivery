import {
    Box, CardContent, Card, CardActions, Typography, Grid, Button,
    TextField, Table, TableBody, TableCell, TableHead, TableRow,
    AppBar, Toolbar, IconButton

} from '@mui/material'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Fetch_customPizza, Update_Inventory_Quantity } from "../../actions/actions";
import { inventoryUpdate } from "../../reducer/reducer"
import { AccountCircle } from '@mui/icons-material'
import { adminAccountComp } from "../../reducer/reducer";
import AccDetails from "./accountInfo";


export default function UpdateInventoryCheck() {
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
            <UpdateInventory />
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








const UpdateInventory = () => {
    const AdminaccCompOpen = useSelector((state) => state.AdminaccCompOpen);
    const inventory = useSelector(state => state.inventory)
    const updateList = useSelector(state => state.inventoryUpdateList)
    const dispatch = useDispatch()
    const nav = useNavigate()
    const D_regex = new RegExp("\\D", "g");
    useEffect(() => {
        dispatch(Fetch_customPizza())
    }, [dispatch])

    const handleMenu = () => {
        dispatch(adminAccountComp())
    };

    const handleChange = (event) => {
        // console.log('in change')
        updateList.filter((obj) => obj.name === event.target.name && (dispatch(inventoryUpdate({ id: obj._id, value: event.target.value.replace(D_regex, "") }))))

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let updated_values = updateList.filter((obj) => obj.quantity !== "" && obj.quantity !== 0)
        updated_values.length > 0 ? dispatch(Update_Inventory_Quantity(updated_values)) : <></>
    }
    return (
        <Box>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar sx={{ zIndex: 0, position: "static" }}>
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "baseline", columnGap: "1rem" }}>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                Pizza's
                            </Typography>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                Update&nbsp;Inventory
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
            <Box>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <Box sx={{ mt: "2rem" }}>
                        <Grid container
                       
                        >

                            {
                                Object.keys(inventory).map((key) => {
                                    return (
                                        key !== "_id" && key !== "__v" && (
                                            <Grid item xs={12} key={key}>
                                                <Box sx={{
                                                    my: "1.5rem",
                                                    mx: 2,
                                                    backgroundColor: "#0077ff2e",
                                                    p: 2,
                                                    borderLeft: "10px solid blue"
                                                }}><Typography variant="h5" sx={{textTransform:"capitalize" }}>{key}</Typography></Box>

                                                <Table sx={{ maxWidth: 500, mx: "auto", border: "2px solid black", }} size="small" >
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell colSpan={3}><Typography variant="h5" sx={{ textAlign: "center",textTransform:"capitalize" }}>{key}</Typography></TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell><Typography sx={{ textAlign: "center" }}>Name</Typography></TableCell>
                                                            <TableCell><Typography sx={{ textAlign: "center" }}>Available&nbsp;Quantity</Typography></TableCell>
                                                            <TableCell><Typography sx={{ textAlign: "center" }}>Update&nbsp;Quantity</Typography></TableCell>
                                                        </TableRow>

                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            inventory[key].map((obj, i) => {
                                                                return (
                                                                    
                                                                    <TableRow key={obj._id} >
                                                                        <TableCell><Typography sx={{ textAlign: "center" }}>{obj.Name}</Typography></TableCell>
                                                                        <TableCell><Typography sx={{ textAlign: "center" }}>{obj.Quantity}</Typography></TableCell>
                                                                        <TableCell>
                                                                            <TextField
                                                                                type="text"
                                                                                name={obj.Name}
                                                                                placeholder="Quantity"
                                                                                value={updateList[i] ? updateList.filter(e => e._id === obj._id).quantity : ""}
                                                                                onChange={(event) => handleChange(event)}

                                                                                size="small"
                                                                            >

                                                                            </TextField>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    
                                                                )
                                                            })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </Grid>
                                        )
                                    )
                                })
                            }
                        </Grid>
                    </Box>
                    <Box sx={{ textAlign: "center", my: "1rem" }}>
                        <Button sx={{ fontSize: "18px" }} variant="contained" type="submit">Update</Button>
                    </Box>
                </form>
            </Box>
            {AdminaccCompOpen ? <AccDetails /> : null}
        </Box>

    );
}