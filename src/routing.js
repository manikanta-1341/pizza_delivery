import { BrowserRouter, Routes, Route } from "react-router-dom";
import CombinedLogin from "./components/combinedLogin"
import LoginComponent from "./components/users/login_page"
import SignUp from "./components/users/register"
import Passwordreset from "./components/users/passwordReset"
import ResetForm from "./components/users/newPassword"

import AdminSignIn from './components/admin/adminLogin'
import AdminSignUp from './components/admin/adminRegister'
import AdminPasswordreset from './components/admin/adminpasswordReset'
import AdminResetForm from './components/admin/adminnewPassword'

import SuccessCard from "./components/passwordSuccess"
import ProductComponentCheck from "./components/users/product"
import ActivationCard from "./components/activated";
import CreateInventoryCheck from "./components/admin/createInventory";
import UpdateInventoryCheck from "./components/admin/updateinventory"; 
import CartCheck from "./components/users/cart";
import OrdersCheck from "./components/users/orders";
import AdminOrdersCheck from "./components/admin/orders";
import AdminDashboardCheck from "./components/admin/adminDashboard";
import Customization from "./components/users/productCustomise";

export default function Routing(){
    return(
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<CombinedLogin/>}></Route>
                        <Route path="/user/login" element={<LoginComponent/>}></Route>
                        <Route path="/register" element={<SignUp/>}></Route>
                        <Route path="/forgetpassword/:id" element={<Passwordreset/>}></Route>
                        <Route path="/resetpassword/:id" element={<ResetForm/>}></Route>

                        <Route path='/admin/login' element={<AdminSignIn/>}></Route>
                        <Route path="/admin/register" element={<AdminSignUp/>}></Route>
                        <Route path="/admin/forgetpassword" element={<AdminPasswordreset/>}></Route>
                        <Route path="/admin/resetpassword/:id" element={<AdminResetForm/>}></Route>
                        <Route path ="/admin/dashboard" element={<AdminDashboardCheck/>}></Route>
                        <Route path ="/admin/orders" element={<AdminOrdersCheck/>}></Route>

                        <Route path="/success" element={<SuccessCard/>}></Route>
                        <Route path="/activated" element={<ActivationCard/>}></Route>
                        

                        <Route path='/items' element={<ProductComponentCheck/>}></Route>
                        <Route path='/create/inventory' element={<CreateInventoryCheck/>}></Route>
                        <Route path='/update/inventory' element={<UpdateInventoryCheck/>}></Route>
                        <Route path='/customize' element={<Customization/>}></Route>
                       
                        <Route path='/cart' element={<CartCheck/>}></Route>
                        <Route path ='/orders' element={<OrdersCheck/>}></Route>
                    </Routes>
                </BrowserRouter>

            </div>
        </>
    );
}