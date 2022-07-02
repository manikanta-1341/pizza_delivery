import{ createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { url } from '../api/api'

export const Fetch_call = createAsyncThunk(
    'reducer1/Fetch_call',
    async ()=>{
        let response = await axios.get(`${url}/items`)
        return response.data
    }
)

export const Fetch_adminOrders = createAsyncThunk(
    'reducer1/Fetch_adminOrders',
    async (_id)=>{
        try{
            let response = await axios.get(`${url}/admin/orders/${_id}`)
            if(!response.data.msg){
                // console.log(response.data.orders)
                return response.data.orders
            }
            else{
                alert(response.data.msg)
            }
        }
        catch(err){
            console.log("err:",err)
        }
    }
)

export const Modify_Order = createAsyncThunk(
    'reducer1/Fetch_adminOrders',
    async (obj)=>{
        try{
            // console.log(obj.id)
            let response = await axios.post(`${url}/admin/order/modify/${obj.id}`,{
                status : obj.status,
                admin_id : obj.admin_id
            })
            if(!response.data.msg){
                // console.log(response.data) 
                return response.data
            }
            else{
                alert(response.data.msg)
            }
        }
        catch(err){
            alert("error while Fetching")
            console.log("err:",err)
        }
    }
)

export const Fetch_customPizza = createAsyncThunk(
    'reducer1/Fetch_customPizza',
    async()=>{
        try {
            let response = await axios.get(`${url}/inventory`)
            if(!response.data.msg){
                return response.data
            }
            else{
                alert(response.data.msg)
            }
        } catch (error) {
            console.log("err:",error)
            alert("Fetch Failed")
        }
    }
)

export const Modify_Inventory = createAsyncThunk(
    'reducer1/Modify_Inventory',
    async({id,checkList})=>{
        try{
            // console.log(checkList)
            let response = await axios.post(`${url}/inventory/update/${id}`,{
                list:checkList
            })
            // console.log(response) 
        }
        catch(error){
            console.log(error)
        }
    }
)

export const Update_Inventory_Quantity = createAsyncThunk(
    'reducer1/Fetch_customPizza',
    async(value)=>{
        try{

            let response = await axios.post(`${url}/inventory/update`,{
                arr_obj :value
            })
            return response.data
        }
        catch(err){
            alert("update inventory fetch failed")
            console.log("err:",err)
        }
    }
)