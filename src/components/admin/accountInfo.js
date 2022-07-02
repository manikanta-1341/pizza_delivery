import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'


export default function AccDetails() {
    const nav = useNavigate()
    const admin_info = jwt_decode(window.sessionStorage.getItem('authtoken')).admin
    const btn_style = {
        width: "100%",
        mx: "auto",
        color: "inherit",
        fontSize: "1rem",
        "&:hover":{
            fontWeight:"bold",
            color:"#1565c0"
        }
    }
    const Logout = () => {
        window.sessionStorage.removeItem('authtoken')
        nav("/")
    }
    return (
        <>
            <Box sx={[
                {
                    position: "fixed",
                    right: 40, top: 60,
                    minWidth: "15rem",
                    overflow: "auto",
                    height: "100%"
                }
            ]}>
                <Card elevation={3}>
                    <CardContent>
                        <Grid container alignItems="center" justifyContent="space-around">
                            <Grid item >
                                <Typography variant="h6">Welcome</Typography>

                            </Grid>
                            <Grid item >
                                <Typography variant='h5' sx={{ textTransform: "capitalize", textAlign: "center" }}>
                                    {admin_info.name}</Typography>
                            </Grid>
                        </Grid>
                        <Typography sx={{ textAlign: "center" }}>{admin_info.username}</Typography>
                        <Button sx={btn_style} onClick={()=>nav('/admin/orders')}>Orders</Button>
                        <Button sx={btn_style} onClick={() => Logout()}>Logout</Button>  
                    </CardContent> 
                </Card>
            </Box>
        </>
    );
}



