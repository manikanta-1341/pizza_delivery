import { Box, Card, CardActions, CardContent, Grid, Typography, Button } from "@mui/material";
import { useEffect , useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { url } from '../../api/api'
import jwt_decode from 'jwt-decode'



export default function CartCheck() {
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
            <Cart />
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




const Cart = ()=> {
    
    const selectedItem = useSelector((state) => state.selectedItem);
    const ItemsforCheckOut = selectedItem.filter((obj) => obj.price && obj.selected && obj.quantity)
    const totalValue = ItemsforCheckOut.map((e) => { return e.price * e.quantity }).reduce((acc, cv) => acc + cv)
    const user_data = jwt_decode(window.sessionStorage.getItem('token'))
    const nav = useNavigate()
    let script = document.createElement('script')
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    document.body.append(script)
    var options = {
        "key": "rzp_test_VowM3OfZOHOMjn", // Enter the Key ID generated from the Dashboard
        "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Pizza's",
        "description": "Test Transaction",
        "image": "https://www.dominos.co.in/files/items/Margherit.jpg",
        "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": `${url}/payment/successful`, 
        "prefill": {
            "name": user_data.user.name,
            "email": user_data.user.email,
            "contact": user_data.user.phone
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };

    useEffect(() => {

    }, [ItemsforCheckOut])

    const textName_style = {
        color: "text.secondary",
        fontWeight: "bold"
    }
    const textValue_style = {
        fontWeight: "bold"
    }

    const OrderCreation = async (totalValue) => {
        try {
            let response = await axios.post(`${url}/order/create`, {
                amount: totalValue * 100,
                _id : user_data.user._id,
                user_order:ItemsforCheckOut
            })
            if (response.data.id) {
                // console.log(response.data, user_data)
                options.amount = totalValue * 100
                options.order_id = response.data.id
                PaymentWindow()
            }
        } catch (error) {
            alert("Payment Failed")
        }
    }

    const PaymentWindow = ()=>{
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    return (
        <Box
            sx={{ p: "1rem" }}
        >
            <Card>
                <CardContent>
                    {
                        ItemsforCheckOut?.map((e) => {
                            return (
                                <Grid container key={e._id} >
                                    <Grid container item justifyContent="space-between">
                                        <Grid item>
                                            <Typography sx={textName_style}>{e.name + "  " + e.quantity + "    " + e.selected}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography sx={textValue_style}>{e.price * e.quantity}₹</Typography>
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ flexGrow: 1 }} />
                                </Grid>

                            )
                        })
                    }
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                    <Box>
                    <Button onClick={()=>nav('/items')}>Cancel</Button>
                    <Button onClick={() => OrderCreation(totalValue)}>Proceed to Pay</Button>
                    </Box>
                    <Typography variant="h6" sx={textValue_style}>{totalValue}₹</Typography>
                </CardActions>
            </Card>
        </Box>
    );
}