import  React,{ useEffect , useState} from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Avatar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ShoppingBag } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { accountComp } from '../../reducer/reducer';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    
    const dispatch = useDispatch(); 
    const userCart = useSelector((state) => state.userCart);
    const selectedItem = useSelector((state) => state.selectedItem);
    const[ cart_qty,setCart_qty] = useState(0)
    const nav = useNavigate()
  useEffect(()=>{
        let dummy_qty = userCart.map((e)=>{return e.qty}).reduce((acc,cv)=>acc+cv)
        setCart_qty(dummy_qty)
    },[userCart])

   

    const handleMenu = () => {
        dispatch(accountComp())
    };


    const handleCart =()=>{
        let userSelectedItems = selectedItem.filter((obj) => obj.price && obj.selected)
        if(cart_qty>0 && userSelectedItems.length>0){
            return nav('/cart')  
        }
        alert("Add atleast one item with pizza size to proceed further") 
    } 

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6"  sx={{ flexGrow: 1 }}>
                        Pizza's
                    </Typography>
                   
                        <Box>
                            <IconButton
                                color="inherit"
                                sx={{
                                    fontSize: "2.5rem",
                                    position: "relative", 
                                }}
                                onClick={()=>handleCart()}
                            >
                                <ShoppingBag fontSize='2.5rem'/>
                            {cart_qty>0?<Avatar
                                sx={{
                                    position: "absolute",
                                    bottom: "0%",
                                    right: "7%",
                                    width: 24, height: 24, backgroundColor: "white",
                                    color:"crimson"
                                }}
                            ><Typography fontWeight="bold">{cart_qty}</Typography>
                            </Avatar>:null} 
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={()=>handleMenu()}
                                color="inherit"
                            >
                                <AccountCircle fontSize='large' />
                            </IconButton>
                        </Box>
                   
                </Toolbar>
            </AppBar>
        </Box>
    );
}
