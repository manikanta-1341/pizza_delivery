import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Grid,
    TextField,
    Typography,
    Select,
    MenuItem
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fetch_call } from "../../actions/actions";
import {
    userCartModify,
    userQtyIncrement,
    userQtyDecrement,
    selectedItemModify,
} from "../../reducer/reducer";
import NavBar from "./navbar";
import AccDetails from "./accountInfo";
import { useNavigate } from "react-router-dom";



export default function ProductComponentCheck() {
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
            <ProductComponent />
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



const ProductComponent = ()=> {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.items);
    const apiStatus = useSelector((state) => state.apiStatus);
    const userCart = useSelector((state) => state.userCart);
    const selectedItem = useSelector((state) => state.selectedItem);
    const accCompOpen = useSelector((state) => state.accCompOpen);
    const nav = useNavigate()
    useEffect(() => {
        dispatch(Fetch_call());
    }, [dispatch]);



    const handleChange = (event, _id, price, qty) => {
        if (event.target.value) {

            dispatch(selectedItemModify({ size: event.target.value, _id: _id, price: price, qty: qty }))
        }
        dispatch(selectedItemModify({ size: event.target.value, _id: _id, price: price, qty: qty }))
    };


    const handleCart = () => {
        let userSelectedItems = selectedItem.filter((obj) => obj.price && obj.selected)
        let userSelectedQty = userCart.map((obj) => { return obj.qty }).reduce((acc, cv) => acc + cv)
        if (userSelectedQty > 0 && userSelectedItems.length > 0) {
            return nav('/cart')
        }
        alert("Add atleast one item with pizza size to proceed further")
    }

    const handleCartModify = (_id,i) => { 
        if (selectedItem[i].selected) {

            dispatch(userCartModify(_id))
        }
        else { 
            alert("Select size of a pizza")
        }
    }

    return (
        <>
            {apiStatus === "loading" ? (
                <>
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
                </>
            ) : (
                <>
                    {apiStatus === "success" && items.length > 0 ? (
                        <>
                            <NavBar />
                            <Grid
                                container
                                rowGap={4}
                                justifyContent="space-evenly"
                                sx={{ pb: "2rem", mt: "2%" }}
                            >
                                <>
                                    <Grid item md={4} lg={3}>
                                        <Card
                                            sx={{
                                                width: "18.75rem",
                                                mx: "auto",
                                                position: "relative",
                                            }}
                                        >
                                            <CardMedia sx={{ textAlign: "center" }}>
                                                <img
                                                    alt="item_image"
                                                    src="https://www.dominos.co.in/files/items/Margherit.jpg"
                                                    width="200px"
                                                    height="200px"
                                                />
                                            </CardMedia>

                                            <CardContent sx={{ textAlign: "center" }}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: "bold",
                                                        textTransform: "capitalize",
                                                    }}
                                                    
                                                >
                                                    customize pizza
                                                </Typography>
                                                <Typography sx={{ color: "#6969698a" }}>
                                                    Confused which one to take? then make your own
                                                    customisied pizza .
                                                </Typography>

                                               
                                            </CardContent>
                                            <CardActions
                                                sx={{
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Button
                                                onClick={()=>nav('/customize')}
                                                >
                                                    Customize
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    {items.map((e, i) => {
                                        return (
                                            <Grid key={e._id} item md={4} lg={3}>
                                                <Card
                                                    elevation={2}
                                                    sx={{
                                                        width: "18.75rem",
                                                        //maxHeight: "500px",
                                                        //height: "100%",
                                                        mx: "auto",
                                                        position: "relative",
                                                    }}
                                                >
                                                    <CardMedia sx={{ textAlign: "center" }}>
                                                        <img
                                                            alt="item_image"
                                                            src={e.image}
                                                            width="200px"
                                                            height="200px"
                                                        />
                                                    </CardMedia>
                                                    <CardContent>
                                                        <Box
                                                            sx={{
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            <Typography sx={{ fontWeight: "bold" }}>
                                                                {e.name}
                                                            </Typography>
                                                            <Typography sx={{ color: "#6969698a" }}>
                                                                {e.type}
                                                            </Typography>
                                                            <Box
                                                                display="flex"
                                                                alignItems="center"
                                                                justifyContent="space-around"
                                                                sx={{mt:"4%"}}
                                                            >
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={selectedItem[i].selected ? selectedItem[i].selected : ""}
                                                                    sx={{ px: "1rem", py: "0px", height: "1.8rem" }}
                                                                    onChange={(event) => handleChange(event, e._id, e.price, userCart[i].qty)}
                                                                >
                                                                    <MenuItem value="Small">Small</MenuItem>
                                                                    <MenuItem value="Medium">Medium</MenuItem>
                                                                    <MenuItem value="Large">Large</MenuItem>
                                                                </Select>

                                                                <Typography sx={{ fontWeight: "600" }}>
                                                                    {selectedItem[i].selected ?
                                                                        selectedItem[i].price + "₹"
                                                                        : `Small-${e.price}₹`
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </CardContent>
                                                    <CardActions
                                                        sx={{
                                                            p:
                                                                userCart[i].addtoCart === false
                                                                    ? "1rem"
                                                                    : "0.875rem",
                                                            flexDirection: "column",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        {e.quantity < 1 ? (
                                                            <>
                                                                <Typography>unavailable</Typography>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Box
                                                                    sx={{
                                                                        display: "flex",
                                                                        textAlign:"center"
                                                                    }}
                                                                >
                                                                    {userCart[i].addtoCart ? (
                                                                       
                                                                        <Button
                                                                            onClick={() => handleCartModify(e._id,i)}
                                                                        >
                                                                            Add to Cart
                                                                        </Button>
                                                                       
                                                                        
                                                                    ) : (
                                                                       
                                                                        <Box sx={{display:"flex",alignItems:"center"}}>

                                                                            <Button
                                                                                onClick={() =>
                                                                                    dispatch(userQtyDecrement(e._id))
                                                                                }
                                                                               
                                                                            >
                                                                                <Remove />
                                                                            </Button>
                                                                            <TextField
                                                                                id="outlined-basic"
                                                                                variant="outlined"
                                                                                value={userCart[i].qty}
                                                                                sx={{
                                                                                    "& .MuiOutlinedInput-input": {
                                                                                        textAlign: "center",
                                                                                        py: 0,
                                                                                        px: 0,
                                                                                        minWidth: 0,
                                                                                    },
                                                                                }}
                                                                            />
                                                                            <Button
                                                                                onClick={() =>
                                                                                    dispatch(userQtyIncrement(e._id))
                                                                                }
                                                                                disabled={
                                                                                    userCart[i].qty === e.quantity
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                            >
                                                                                <Add />
                                                                            </Button>
                                                                        </Box>
                                                                        
                                                                       
                                                                    )}
                                                                </Box>

                                                                {userCart[i].qty > 0 ? (
                                                                    <Button onClick={() => handleCart()}>Proceed to Checkout</Button>
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </>
                                                        )}
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        );
                                    })}
                                </>
                            </Grid>
                            {accCompOpen ? <AccDetails /> : null}
                        </>
                    ) : (
                        <>
                            <Typography>Data not found</Typography>
                        </>
                    )}
                </>
            )}
        </>
    );
}
