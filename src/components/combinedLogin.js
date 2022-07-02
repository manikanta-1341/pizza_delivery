import {  Grid } from "@mui/material";
import SignIn from "./users/login_page";
import AdminSignIn from './admin/adminLogin';



export default function CombinedLogin(){
    return(
        <>
        <Grid 
        container
        justifyContent="center"
        mt={2}
        >
            <Grid item md={6}>
                <SignIn/>
            </Grid>
            <Grid item md={6}>
                <AdminSignIn />
            </Grid>
        </Grid>
        </>
    );
}