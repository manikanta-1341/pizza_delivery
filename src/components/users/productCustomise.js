import {
    Box,
    Card,
    CardContent,
    Button,
    Radio,
    Typography,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Checkbox,
    MenuItem,
    Select,
    TextField,
    Divider,
    AppBar,
    Toolbar,
    IconButton
} from "@mui/material";
import axios from "axios";
import { url } from "../../api/api";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Fetch_customPizza, Fetch_call } from "../../actions/actions";
import { toogleCheck, accountComp } from "../../reducer/reducer";
import jwt_decode from "jwt-decode";
import AccDetails from "./accountInfo";
import {
    CheckBox,
    CheckBoxOutlineBlank,
    AccountCircle
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import store from "../../store/store";
export default function CustomizationSample() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const user_info = jwt_decode(window.sessionStorage.getItem("token")).user;
    const accCompOpen = useSelector((state) => state.accCompOpen);
    const inventory = useSelector((state) => state.inventory);
    const apiStatus = useSelector((state) => state.inventoryApiStatus);
    const [radioSelect, SetRadioSelect] = useState("");
    const checkList = useSelector((state) => state.customCheckList);
    const [qty, setQty] = useState(0);
    const [size, setSize] = useState("");
    const [totalValue, setTotalValue] = useState(0);
    const [customItem, setCustomItem] = useState([]);
    const [extras, SetExtras] = useState('')
    let script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.append(script);
    var options = {
        key: "rzp_test_VowM3OfZOHOMjn", // Enter the Key ID generated from the Dashboard
        amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Pizza's",
        description: "Test Transaction",
        image: "https://www.dominos.co.in/files/items/Margherit.jpg",
        order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: `${url}/payment/successful`,
        prefill: {
            name: user_info.name,
            email: user_info.email,
            contact: user_info.phone,
        },
        notes: {
            address: "Razorpay Corporate Office",
        },
        theme: {
            color: "#3399cc",
        },
    };

    useEffect(() => {
        dispatch(Fetch_call());
        dispatch(Fetch_customPizza());
    }, [dispatch]);

    const handleChange = (key, _id) => {
        dispatch(toogleCheck({ type: key, id: _id }));
    };

    const handleQty = (event) => {
        if (event.target.value >= 10) {
            alert("Sorry,please give quantity below 10");
        } else {
            setQty(event.target.value);
        }
    };
    const ResetForm = () => {
        setTotalValue(0)
        SetExtras('')
        setQty('')
        setSize('')
        SetRadioSelect('')
        Object.keys(checkList).map((key) => {
            return (
                checkList[key].filter((obj) => {
                if (obj.Check === true) {
                    dispatch(toogleCheck({ type: key, id: obj._id }));
                }
                return obj
            })
            )
        });
    };

    const handleRadioSelect = (name, type, id) => {
        SetRadioSelect(name);
        // if (radioSelect !== "") {
        //     checkList.base.filter((e) => {
        //         if (e.name === name) {
        //             dispatch(toogleCheck({ type: type, id: id }))
        //         }
        //     })
        // }
    };
    const handleSubmit = () => {
        let extra = [];
        let total = 0;
        if (radioSelect !== "") {
            checkList.base.filter((e) => {
                if (e.name === radioSelect) {
                    dispatch(toogleCheck({ type: "base", id: e._id }));
                }
                return e
            });
        }
        if (radioSelect !== "" && size !== "" && qty !== 0) {
            store.getState().customCheckList['base'].filter(
                (e) =>
                    {e.Check === true &&
                    extra.push({ ...e, quantity: qty, selected: size })
                    return e}
            );
            checkList.sauce.map(
                (e) =>
                    e.Check === true &&
                    extra.push({ ...e, quantity: qty, selected: size })
            );
            checkList.cheese.map(
                (e) =>
                    e.Check === true &&
                    extra.push({ ...e, quantity: qty, selected: size })
            );
            if (checkList.veggies.filter((e) => e.Check === true).length === 0) {
                checkList.veggies.map(async (e, i) => {
                    if (i < 3) {
                        return await dispatch(toogleCheck({ type: "veggies", id: e._id }));
                    }
                    return e;
                });
            } else if (checkList.veggies.filter((e) => e.Check === true).length > 3) {
                let extraVeggies = checkList.veggies
                    .map((e) => ({ ...e }))
                    .filter((e) => e.Check === true);
                extraVeggies.map((e) => {
                    e.quantity = qty;
                    e.selected = size;
                    return e;
                });
                // console.log(extraVeggies,extraVeggies.length)
                extra.push(...extraVeggies.splice(3, extraVeggies.length));
            }

            if (checkList.meats.filter((e) => e.Check === true).length > 1) {
                let extraMeats = checkList.meats
                    .map((e) => ({ ...e }))
                    .filter((e) => e.Check === true);
                extraMeats.map((e) => {
                    e.quantity = qty;
                    e.selected = size;
                    return e;
                });
                // console.log(extraMeats,extraMeats.length)
                extra.push(...extraMeats.splice(1, extraMeats.length));
            }
            // console.log(extra);
            // console.log(store.getState(),store.getState().customCheckList)
            let dummyObj = Object.keys(store.getState().customCheckList).map((key) =>
                store
                    .getState()
                    .customCheckList[key].filter((obj) => obj.Check === true))
            let result_obj = []
            dummyObj.map((arr) => {
                if (arr.length !== undefined) {
                    arr.map((el) => {return result_obj.push({ ...el, quantity: qty, selected: size })})
                }
                return arr
            })
            SetExtras(extra)
            setCustomItem(result_obj)
            total = extra.map((e) => { return e.price }).reduce((acc, cv) => acc + cv)
            setTotalValue(total)
        } else {
            alert("Base,quantity,Size are required");
        }
    };

    const handleMenu = () => {
        dispatch(accountComp())
    };

    const OrderCreation = async (totalValue) => {
        try {
            let response = await axios.post(`${url}/order/create`, {
                amount: totalValue * 100,
                _id: user_info._id,
                user_order: customItem,
            });
            if (response.data.id) {
                // console.log(response.data, user_info);
                options.amount = totalValue * 100;
                options.order_id = response.data.id;
                PaymentWindow();
            }
        } catch (error) {
            alert("Payment Failed");
        }
    };

    const PaymentWindow = () => {
        try {
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
            // console.log(rzp1);
        } catch (error) {
            console.log("err:", error);
            alert("Payment Failed");
        }
    };
    return (
        <Box>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar sx={{ zIndex: 0, position: "static" }}>
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "baseline", columnGap: "1rem" }}>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                Pizza's
                            </Typography>
                            <Typography variant="h6" sx={{ flexGrow: 1, textTransform: "capitalize" }}>
                                customize
                            </Typography>
                            <Button sx={{ color: "white", fontSize: "1.2rem" }} onClick={() => nav('/items')}>Home</Button>
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
            {apiStatus === "success" && inventory ? (
                <Card elevation={4} sx={{ width: 520, mx: "auto", mt: "3%" }}>
                    <CardContent>
                        {Object.keys(inventory)?.map((key, i) => {
                            return (
                                key !== "_id" &&
                                key !== "__v" && (
                                    <Box key={key} sx={{ mt: 2 }}>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <Typography
                                                variant="h4"
                                                sx={{ textTransform: "capitalize" }}
                                            >
                                                {key}
                                            </Typography>
                                            {key === "veggies" && (
                                                <Typography>( 3 veggies are free of cost)</Typography>
                                            )}
                                            {key === "meats" && (
                                                <Typography>(1 meat is free of cost)</Typography>
                                            )}
                                        </Box>
                                        <Table padding="none">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Price/piece</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {inventory[key].map((obj) => {
                                                    return key === "base" ? (
                                                        <TableRow key={obj._id}>
                                                            <TableCell>
                                                                <Radio
                                                                    value={obj.Name}
                                                                    icon={<CheckBoxOutlineBlank />}
                                                                    checkedIcon={<CheckBox />}
                                                                    checked={radioSelect === obj.Name}
                                                                    disabled={totalValue>0 && true}
                                                                    onChange={() => {
                                                                        handleRadioSelect(obj.Name, key, obj._id);
                                                                        handleChange(key, obj.Name, obj.Price);
                                                                    }}
                                                                />
                                                            </TableCell>
                                                            <TableCell sx={{ fontSize: "1rem" }}>
                                                                {obj.Name}
                                                            </TableCell>
                                                            <TableCell sx={{ fontSize: "1rem" }}>
                                                                {size === "Small"
                                                                    ? obj.Price
                                                                    : size === "Medium"
                                                                        ? obj.Price * 2
                                                                        : size === "Large"
                                                                            ? obj.Price * 4
                                                                            : obj.Price}
                                                            </TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        <TableRow key={obj._id}>
                                                            <TableCell>
                                                                <Checkbox
                                                                disabled={totalValue>0 && true}
                                                                    checked={
                                                                        checkList[key].filter(
                                                                            (e) => e._id === obj._id
                                                                        )[0].Check
                                                                    }
                                                                    onClick={() => handleChange(key, obj._id)}
                                                                ></Checkbox>
                                                            </TableCell>
                                                            <TableCell sx={{ fontSize: "1rem" }}>
                                                                {obj.Name}
                                                            </TableCell>
                                                            <TableCell sx={{ fontSize: "1rem" }}>
                                                                {size === "Small"
                                                                    ? obj.Price
                                                                    : size === "Medium"
                                                                        ? obj.Price * 2
                                                                        : size === "Large"
                                                                            ? obj.Price * 4
                                                                            : obj.Price}
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </Box>
                                )
                            );
                        })}
                        {radioSelect && (
                            <>
                                <Divider />
                                <Box
                                    sx={{
                                        my: "3%",
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                        alignItems: "center",
                                    }}
                                >
                                    <Select
                                        value={size}
                                        onChange={(event) => setSize(event.target.value)}
                                        sx={{ px: "1rem", py: "0px", height: "1.8rem" }}
                                    >
                                        <MenuItem selected disabled value="Size">
                                            ---Size---
                                        </MenuItem>
                                        <MenuItem value="Small">Small</MenuItem>
                                        <MenuItem value="Medium">Medium</MenuItem>
                                        <MenuItem value="Large">Large</MenuItem>
                                    </Select>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography>quantity:</Typography>
                                        <TextField
                                            sx={{
                                                "& .MuiOutlinedInput-input": {
                                                    textAlign: "center",
                                                    py: 0,
                                                    px: 0,
                                                    minWidth: 0,
                                                },
                                                width: 50,
                                            }}
                                            value={qty}
                                            onChange={(event) => handleQty(event)}
                                        />
                                    </Box>
                                </Box>
                                <Divider />
                            </>
                        )}
                        {
                            extras !== "" && (
                                <Box>
                                    <Typography sx={{ fontWeight: "bold" }}>Checkout:</Typography>
                                    <Box sx={{ p: 2, border: "1px solid grey",  }}>
                                        {extras.map((e) => {
                                            return (
                                                <Box key={e._id} sx={{display: "flex", justifyContent: "space-between"}}>
                                                    <Typography>{e.name}</Typography>
                                                    <Typography sx={{fontWeight:"bold"}}>{e.price}</Typography>
                                                </Box>
                                            )
                                        })}

                                    </Box>
                                </Box>
                            )
                        }
                        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                            <Button type="reset" onClick={() => ResetForm()}>
                                Reset
                            </Button>
                            <Button onClick={() => nav("/items")}>Cancel</Button>
                            {totalValue === 0 ? (
                                <Button onClick={() => handleSubmit()}>Place Order</Button>
                            ) : (


                                <Button onClick={() => OrderCreation(totalValue * qty)}>
                                    Proceed To Pay
                                    <Typography
                                        sx={{ px: 1, fontWeight: "bold", color: "black" }}
                                    >
                                        {totalValue * qty}
                                    </Typography>
                                </Button>

                            )}
                        </Box>
                    </CardContent>
                </Card>
            ) : (
                <></>
            )}
            {accCompOpen ? <AccDetails /> : null}
        </Box>
    );
}
