import { createSlice} from "@reduxjs/toolkit";
import { Fetch_call, Fetch_adminOrders, Fetch_customPizza} from '../actions/actions'
const initialState = {
    items: [],
    userCart: [],
    selectedItem: [],
    orderList: [],
    AdminOrders: [],
    inventory: {},
    customCheckList: {
        base: [],
        sauce: [],
        cheese: [],
        veggies: [],
        meats: []
    },
    inventoryUpdateList:[],
    accCompOpen: false,
    AdminaccCompOpen: false,
    apiStatus: "",
    adminOrdersApiStatus: "",
    inventoryApiStatus: "",
}

const Slice = createSlice({
    name: "reducer1",
    initialState,
    reducers: {
        fetch_items: (state, { payload }) => {
            state.user = [...payload]
        },
        userCartModify: (state, { payload }) => {
            state.userCart.map((e, i) => {
                if (e._id === payload) {
                    e.addtoCart = false
                    e.qty = e.qty + 1
                }
                if (state.selectedItem[i]._id === payload) {
                    state.selectedItem[i].quantity = e.qty
                }
                return e
            })
        },
        userQtyIncrement: (state, { payload }) => {
            let item_qty = ""
            state.items.filter((el) => {
                if (el._id === payload) {
                    item_qty = el.quantity
                }
                return el
            })
            state.userCart.map((e, i) => {
                if (e._id === payload && e.qty < item_qty) {
                    e.qty++
                }
                if (state.selectedItem[i]._id === payload) {
                    state.selectedItem[i].quantity++
                }
                return e
            })
        },
        userQtyDecrement: (state, { payload }) => {
            state.userCart.map((e, i) => {
                if (e._id === payload) {
                    if (e.qty === 1) {
                        e.addtoCart = !e.addtoCart
                        e.qty = 0
                    }
                    else {
                        e.qty--
                    }
                }
                if (state.selectedItem[i]._id === payload) {
                    if (state.selectedItem[i].quantity === 1) {
                        state.selectedItem[i].quantity && (delete state.selectedItem[i].quantity)
                        state.selectedItem[i].selected && (delete state.selectedItem[i].selected)
                        state.selectedItem[i].price && (delete state.selectedItem[i].price)
                    }
                    else {
                        state.selectedItem[i].quantity--
                    }
                }
                return e
            })
        },
        selectedItemModify: (state, { payload }) => {
            state.selectedItem.filter((e) => e._id === payload._id).map((e) => {

                payload.size && (e["selected"] = payload.size)
                payload.price &&
                    (
                        payload.size === "Small" ? e["price"] = parseInt(payload.price)
                            : payload.size === "Medium" ? e["price"] = (payload.price * 2)
                                : e["price"] = (payload.price * 4)
                    )
                return e
            })
        },
        accountComp: (state) => {
            state.accCompOpen = !state.accCompOpen
        },
        adminAccountComp: (state) => {
            state.AdminaccCompOpen = !state.AdminaccCompOpen
        },
        createOrderList: (state, { payload }) => {
            state.orderList = payload
        },
        toogleCheck: (state, { payload }) => {
            state.customCheckList[payload.type].filter((e) => e._id === payload.id).map((e) => e.Check = !e.Check)
            
        },
        inventoryUpdate:(state,{ payload })=>{
            state.inventoryUpdateList.map((obj)=>{
                if(obj._id === payload.id){
                    obj.quantity = payload.value
                }
                return obj 
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(Fetch_call.pending, (state) => {
            state.apiStatus = "loading"
        })
        builder.addCase(Fetch_call.fulfilled, (state, { payload }) => {
            state.items = [...payload]
            state.apiStatus = "success"
            state.userCart.length === 0 ?
                (
                
                state.items.map((e) => {
                    state.userCart.push({ "_id": e._id, "qty": 0, "addtoCart": true })
                    state.selectedItem.push({ "_id": e._id, "name": e.name }) 
                    return e;
                })
                )
                : (<></>)
        })
        builder.addCase(Fetch_call.rejected, (state) => {
            state.apiStatus = "failed"
        })

        builder.addCase(Fetch_adminOrders.pending, (state) => {
            state.adminOrdersApiStatus = "loading"
        })
        builder.addCase(Fetch_adminOrders.fulfilled, (state, { payload }) => {
            state.AdminOrders = payload
            state.adminOrdersApiStatus = "success"
        })
        builder.addCase(Fetch_adminOrders.rejected, (state) => {
            state.adminOrdersApiStatus = "failed"
        })

        builder.addCase(Fetch_customPizza.pending, (state) => {
            state.inventoryApiStatus = "loading"
        })
        builder.addCase(Fetch_customPizza.fulfilled, (state, { payload }) => {
            state.inventory = payload[0]
            state.inventoryApiStatus = "success"
            try {

                Object.keys(payload[0]).map((key) => {
                    
                     if (key !== "_id" && key !== "__v") {
                        payload[0][key].map((obj) => {
                            
                            if(state.customCheckList[key].length !== payload[0][key].length){

                                return (
                                    state.customCheckList[key].push(
                                    { _id: obj._id, name: obj.Name, price: obj.Price,Check: false }
                                    ),
                                    state.inventoryUpdateList.push(
                                        { _id: obj._id, type:key, name: obj.Name, quantity :0}
                                    )
                                )
                            }
                            return obj;
                        })
                    }
                    return key;
                })

            } catch (error) {
                console.log("err::", error)
            }
        })
        builder.addCase(Fetch_customPizza.rejected, (state) => {
            state.inventoryApiStatus = "failed"
        })
    }
})

export const {
    fetch_items,
    userCartModify,
    userQtyIncrement,
    userQtyDecrement,
    selectedItemModify,
    accountComp,
    adminAccountComp,
    createOrderList,
    adminOrders,
    toogleCheck,
    inventoryUpdate

} = Slice.actions

export default Slice
