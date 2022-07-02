import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  AppBar,
  Toolbar,
  IconButton
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { FieldArray, Formik, Form,ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from 'axios'
import { url } from '../../api/api'
import AccDetails from "./accountInfo";
import { AccountCircle } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux"
import { adminAccountComp } from "../../reducer/reducer";

export default function CreateInventoryCheck() {
  const [tokencheck] = useState(window.sessionStorage.getItem("authtoken"));
  const nav = useNavigate();
  if (tokencheck) {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
      window.history.go(1);
    };
  }
  return tokencheck ? (
    <>
      <CreateInventory />
    </>
  ) : (
    <>
      <Card
        sx={{
          width: "100%",
          maxWidth: "40%",
          mx: "auto",
          mt: "12%",
          p: "2%",
          backgroundColor: "#e9e9e9",
        }}
        variant="outlined"
      >
        <CardContent>
          <Typography sx={{ textAlign: "center" }} variant="h5" color="dark">
            Please Login To Access The Content
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            sx={{ mx: "auto", fontSize: "1.5rem" }}
            onClick={() => nav("/admin/login")}
          >
            Login
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

const CreateInventory = () => {
  const [inventory] = useState({
    base: [
      {
        id: "base1",
        Name: "",
        Quantity: "",
        Price: "",
      },
    ],
    sauce: [
      {
        id: "sauce1",
        Name: "",
        Quantity: "",
        Price: "",
      },
    ],
    cheese: [
      {
        id: "cheese1",
        Name: "",
        Quantity: "",
        Price: "",
      },
    ],
    veggies: [
      {
        id: "veggies1",
        Name: "",
        Quantity: "",
        Price: "",
      },
    ],
    meats: [
      {
        id: "meats1",
        Name: "",
        Quantity: "",
        Price: "",
      },
    ],
  });
  const [BasehoverOn, setBasehoverOn] = useState([]);
  const [SaucehoverOn, setSaucehoverOn] = useState([]);
  const [CheesehoverOn, setCheesehoverOn] = useState([]);
  const [VeggieshoverOn, setVeggieshoverOn] = useState([]);
  const [MeatshoverOn, setMeatshoverOn] = useState([]);
  const dispatch = useDispatch()
  const nav = useNavigate()
  const AdminaccCompOpen = useSelector((state) => state.AdminaccCompOpen);
  const D_regex = new RegExp("\\D", "g");
  const removeBtn_style = {
    backgroundColor: " transparent",
    position: "absolute",
    "&:hover": {
      backgroundColor: " transparent",
    },
    
    right: "-7%",
    bottom: "10%",
   
  };

  useEffect(() => {
    let dummybaseHover = [];
    let dummysauceHover = [];
    let dummycheeseHover = [];
    let dummyveggiesHover = [];
    let dummymeatsHover = [];
    inventory.base.map((e) => {
      dummybaseHover.push({ id: e.id, hover: false });
      return e;
    });
    inventory.sauce.map((e) => {
      dummysauceHover.push({ id: e.id, hover: false });
      return e;
    });
    inventory.cheese.map((e) => {
      dummycheeseHover.push({ id: e.id, hover: false });
      return e;
    });
    inventory.veggies.map((e) => {
      dummyveggiesHover.push({ id: e.id, hover: false });
      return e;
    });
    inventory.meats.map((e) => {
      dummymeatsHover.push({ id: e.id, hover: false });
      return e;
    });
    setBasehoverOn([...dummybaseHover]);
    setSaucehoverOn([...dummysauceHover]);
    setCheesehoverOn([...dummycheeseHover]);
    setVeggieshoverOn([...dummyveggiesHover]);
    setMeatshoverOn([...dummymeatsHover]);
  }, [inventory]);

  const handleHoverOnAdd = (type) => {
    switch (type) {
      case "base": {
        if (BasehoverOn.length === 0) {
          let dummyHover = [...BasehoverOn];
          dummyHover.push({
            id: `base1`,
            hover: false,
          });
          setBasehoverOn(dummyHover);
          break;
        } else {
          let dummyHover = [...BasehoverOn];
          dummyHover.push({
            id: `base${parseInt(
              BasehoverOn[BasehoverOn.length - 1].id.replace(D_regex, "")
            ) + 1
              }`,
            hover: false,
          });
          setBasehoverOn(dummyHover);
          break;
        }
      }
      case "sauce": {
        if (SaucehoverOn.length === 0) {
          let dummyHover = [...SaucehoverOn];
          dummyHover.push({
            id: `sauce1`,
            hover: false,
          });
          setSaucehoverOn(dummyHover);
          // console.log(dummyHover);
          break;
        }
        let dummyHover = [...SaucehoverOn];
        dummyHover.push({
          id: `sauce${parseInt(
            SaucehoverOn[SaucehoverOn.length - 1].id.replace(D_regex, "")
          ) + 1
            }`,
          hover: false,
        });
        setSaucehoverOn(dummyHover);
        // console.log(dummyHover);
        break;
      }
      case "cheese": {
        if (CheesehoverOn.length === 0) {
          let dummyHover = [...CheesehoverOn];
          dummyHover.push({
            id: `cheese1`,
            hover: false,
          });
          setCheesehoverOn(dummyHover);
          // console.log(dummyHover)
          break;
        }
        let dummyHover = [...CheesehoverOn];
        dummyHover.push({
          id: `cheese${parseInt(
            CheesehoverOn[CheesehoverOn.length - 1].id.replace(D_regex, "")
          ) + 1
            }`,
          hover: false,
        });
        setCheesehoverOn(dummyHover);
        // console.log(dummyHover)
        break;
      }
      case "veggies": {
        if (VeggieshoverOn.length === 0) {
          let dummyHover = [...VeggieshoverOn];
          dummyHover.push({
            id: `veggies1`,
            hover: false,
          });
          setVeggieshoverOn(dummyHover);
          // console.log(dummyHover)
          break;
        }
        let dummyHover = [...VeggieshoverOn];
        dummyHover.push({
          id: `veggies${parseInt(
            VeggieshoverOn[VeggieshoverOn.length - 1].id.replace(D_regex, "")
          ) + 1
            }`,
          hover: false,
        });
        setVeggieshoverOn(dummyHover);
        // console.log(dummyHover)
        break;
      }
      case "meats": {
        if (MeatshoverOn.length === 0) {
          let dummyHover = [...MeatshoverOn];
          dummyHover.push({
            id: `meats1`,
            hover: false,
          });
          setMeatshoverOn(dummyHover);
          // console.log(dummyHover)
          break;
        }
        let dummyHover = [...MeatshoverOn];
        dummyHover.push({
          id: `meats${parseInt(
            MeatshoverOn[MeatshoverOn.length - 1].id.replace(D_regex, "")
          ) + 1
            }`,
          hover: false,
        });
        setMeatshoverOn(dummyHover);
        // console.log(dummyHover)
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleDeleteHoverOn = (type, id) => {
    switch (type) {
      case "base": {
        let dummyHover = [...BasehoverOn];
        dummyHover.map((e, i) => {
          if (e.id === id) {
            dummyHover.splice(i, 1);
          }
          return e;
        });
        setBasehoverOn(dummyHover);
        // console.log(dummyHover)
        break;
      }
      case "sauce": {
        let dummyHover = [...SaucehoverOn];
        dummyHover.map((e, i) => {
          if (e.id === id) {
            dummyHover.splice(i, 1);
          }
          return e;
        });
        setSaucehoverOn(dummyHover);
        // console.log(dummyHover)
        break;
      }
      case "cheese": {
        let dummyHover = [...CheesehoverOn];
        dummyHover.map((e, i) => {
          if (e.id === id) {
            dummyHover.splice(i, 1);
          }
          return e;
        });
        setCheesehoverOn(dummyHover);
        // console.log(dummyHover)
        break;
      }
      case "veggies": {
        let dummyHover = [...VeggieshoverOn];
        dummyHover.map((e, i) => {
          if (e.id === id) {
            dummyHover.splice(i, 1);
          }
          return e;
        });
        setVeggieshoverOn(dummyHover);
        // console.log(dummyHover)
        break;
      }
      case "meats": {
        let dummyHover = [...MeatshoverOn];
        dummyHover.map((e, i) => {
          if (e.id === id) {
            dummyHover.splice(i, 1);
          }
          return e;
        });
        setMeatshoverOn(dummyHover);
        // console.log(dummyHover)
        break;
      }
      default:
        break;
    }
  };

  const handleMouseOver = (type, id) => {
    switch (type) {
      case "base": {
        let dummyHover = [...BasehoverOn];
        dummyHover
          .filter((obj) => obj.id === id)
          .map((obj) => (obj.hover = true));
        setBasehoverOn(dummyHover);
        // console.log(dummyHover,id)
        break;
      }
      case "sauce": {
        let dummyHover = [...SaucehoverOn];
        dummyHover
          .filter((obj) => obj.id === id)
          .map((obj) => (obj.hover = true));
        setSaucehoverOn(dummyHover);
        // console.log(dummyHover,id)
        break;
      }
      case "cheese": {
        let dummyHover = [...CheesehoverOn];
        dummyHover
          .filter((obj) => obj.id === id)
          .map((obj) => (obj.hover = true));
        setCheesehoverOn(dummyHover);
        // console.log(dummyHover,id)
        break;
      }
      case "veggies": {
        let dummyHover = [...VeggieshoverOn];
        dummyHover
          .filter((obj) => obj.id === id)
          .map((obj) => (obj.hover = true));
        setVeggieshoverOn(dummyHover);
        // console.log(dummyHover,id)
        break;
      }
      case "meats": {
        let dummyHover = [...MeatshoverOn];
        dummyHover
          .filter((obj) => obj.id === id)
          .map((obj) => (obj.hover = true));
        setMeatshoverOn(dummyHover);
        // console.log(dummyHover,id)
        break;
      }
      default:
        break;
    }
  };

  const handleMouseOut = (type, id) => {
    switch (type) {
      case "base": {
        let dummyHover = [...BasehoverOn];
        dummyHover
          .filter((obj) => obj.id === id)
          .map((obj) => (obj.hover = false));
        setBasehoverOn(dummyHover);
        // console.log(dummyHover,id)
        break;
      }
      case "sauce": {
        let dummyHover = [...SaucehoverOn];
        dummyHover
          .filter((obj) => obj.id === id)
          .map((obj) => (obj.hover = false));
        setSaucehoverOn(dummyHover);
        // console.log(dummyHover,id)
        break;
      }
      case "cheese": {
        let dummyHover = [...CheesehoverOn];
        dummyHover
          .filter((obj) => obj.id === id)
          .map((obj) => (obj.hover = false));
        setCheesehoverOn(dummyHover);
        // console.log(dummyHover,id)
        break;
      }
      case "veggies": {
        let dummyHover = [...VeggieshoverOn];
        dummyHover
          .filter((obj) => obj.id === id)
          .map((obj) => (obj.hover = false));
        setVeggieshoverOn(dummyHover);
        // console.log(dummyHover,id)
        break;
      }
      case "meats": {
        let dummyHover = [...MeatshoverOn];
        dummyHover
          .filter((obj) => obj.id === id)
          .map((obj) => (obj.hover = false));
        setMeatshoverOn(dummyHover);
        // console.log(dummyHover,id)
        break;
      }
      default:
        break;
    }
  };

  const ValidationSchema = Yup.object().shape({
    base: Yup.array().of(
      Yup.object().shape({
        Name: Yup.string().required("Required"),
        Quantity: Yup.number().required("Required"),
        Price: Yup.number().required("Required"),
      })
    ),
    sauce: Yup.array().of(
      Yup.object().shape({
        Name: Yup.string().required("Required"),
        Quantity: Yup.number().required("Required"),
        Price: Yup.number().required("Required"),
      })
    ),
    cheese: Yup.array().of(
      Yup.object().shape({
        Name: Yup.string().required("Required"),
        Quantity: Yup.number().required("Required"),
        Price: Yup.number().required("Required"),
      })
    ),
    veggies: Yup.array().of(
      Yup.object().shape({
        Name: Yup.string().required("Required"),
        Quantity: Yup.number().required("Required"),
        Price: Yup.number().required("Required"),
      })
    ),
    meats: Yup.array().of(
      Yup.object().shape({
        Name: Yup.string().required("Required"),
        Quantity: Yup.number().required("Required"),
        Price: Yup.number().required("Required"),
      })
    ),
  });

  const handleSubmit = async (event, onSubmitProps) => {
    try {
      let response = await axios.post(`${url}/items/create/inventory`, {
        inventory: event
      })
      if (!response.data.msg) {
        onSubmitProps.resetForm()
      }
      else {
        alert(response.data.msg)
      }
    } catch (error) {
      alert("Fetch Failed")
      console.log("err:", error)
    }
  };

  const handleMenu = () => {
    dispatch(adminAccountComp())
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
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Create&nbsp;Inventory
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
      <Box sx={{ maxWidth: "550px", mx: "auto",mt:"1.5rem" }}>
        <Card elevation={4}>
          <CardContent>
            <Formik
              initialValues={inventory}
              validationSchema={ValidationSchema}
              onSubmit={(event, onSubmitProps) => handleSubmit(event, onSubmitProps)}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <FieldArray name="base">
                    {(fieldArrayProps) => {
                      const { remove } = fieldArrayProps;
                      const base = fieldArrayProps.form.values.base;

                      return (
                        <Grid container rowGap={2} >
                          <Grid item xs={12} display="flex" alignItems="center">
                            <Typography fontWeight="bold">Base : </Typography>
                            <Button
                              onClick={() => {
                                if (base.length < 5) {
                                  if (base.length === 0) {
                                    base.push({
                                      id: "base1",
                                      Name: "",
                                      Quantity: "",
                                      Price: ""
                                    });
                                    handleHoverOnAdd("base");
                                  } else {
                                    base.push({
                                      id: `base${parseInt(
                                        base[base.length - 1].id.replace(
                                          D_regex,
                                          ""
                                        )
                                      ) + 1
                                        }`,
                                      Name: "",
                                      Quantity: "",
                                      Price: ""
                                    });
                                    handleHoverOnAdd("base");
                                  }
                                } else {
                                  alert("Only 5 items can be added at a time");
                                }
                              }}
                            >
                              Add Items
                            </Button>
                          </Grid>
                          {base?.map((e, i) => {
                            return (
                              <Grid
                                item
                                key={e.id}

                                xs={12}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-evenly"
                                position="relative"
                                onMouseOver={() =>
                                  handleMouseOver("base", e.id)
                                }
                                onMouseOut={() => handleMouseOut("base", e.id)}
                              >
                                <Grid item xs={5}>
                                  <TextField
                                    label="Name"
                                    name={`base[${i}].Name`}
                                    value={base[i].Name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    size="small"
                                    color={
                                      errors.base && base[i].Name === ""
                                        ? "error"
                                        : "primary"
                                    }
                                    sx={{ mb: "0.5rem" }}
                                  />
                                  <Typography color="red">
                                    <ErrorMessage name={`base.${i}.Name`} />
                                  </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                  <TextField
                                    label="Quantity"
                                    name={`base[${i}].Quantity`}
                                    value={base[i].Quantity.replace(/\D/g, "")}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    size="small"
                                    color={
                                      errors.base && base[i].Quantity === ""
                                        ? "error"
                                        : "primary"
                                    }
                                    sx={{ mb: "0.5rem" }}
                                  />

                                  <Typography color="red">
                                    <ErrorMessage name={`base.${i}.Quantity`} />
                                  </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                  <TextField
                                    label="Price"
                                    name={`base[${i}].Price`}
                                    value={base[i].Price.replace(/\D/g, "")}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    size="small"
                                    color={
                                      errors.base && base[i].Price === ""
                                        ? "error"
                                        : "primary"
                                    }
                                    sx={{ mb: "0.5rem" }}
                                  />

                                  <Typography color="red">
                                    <ErrorMessage name={`base.${i}.Price`} />
                                  </Typography>
                                </Grid>

                                {BasehoverOn.length > 0 &&
                                  BasehoverOn[i].hover ? (
                                  <Button
                                    sx={removeBtn_style}
                                    onClick={() => {
                                      remove(i);
                                      handleDeleteHoverOn("base", e.id);
                                    }}
                                  >
                                    <Close
                                      color="error"
                                      sx={{ fontSize: "30px" }}
                                    />
                                  </Button>
                                ) : null}
                              </Grid>
                            );
                          })}

                        </Grid>
                      );
                    }}
                  </FieldArray>

                  <FieldArray name="sauce">
                    {(fieldArrayProps) => {
                      const { push, remove } = fieldArrayProps;
                      const sauce = fieldArrayProps.form.values.sauce;

                      return (
                        <Grid container rowGap={2}>
                          <Grid item xs={12} display="flex" alignItems="center">
                            <Typography fontWeight="bold">Sauce : </Typography>
                            <Button
                              onClick={() => {
                                if (sauce.length < 5) {
                                  if (sauce.length === 0) {
                                    push({
                                      id: "sauce1",
                                      Name: "",
                                      Quantity: "",
                                      Price: ""
                                    });
                                    handleHoverOnAdd("sauce");
                                  } else {
                                    // console.log(base,base[base.length - 1].id.replace(D_regex,""))
                                    sauce.push({
                                      id: `sauce${parseInt(
                                        sauce[sauce.length - 1].id.replace(
                                          D_regex,
                                          ""
                                        )
                                      ) + 1
                                        }`,
                                      Name: "",
                                      Quantity: "",
                                      Price: ""
                                    });
                                    handleHoverOnAdd("sauce");
                                    // console.log(sauce);
                                  }
                                } else {
                                  alert("Only 5 items can be added at a time");
                                }
                              }}
                            >
                              Add Items
                            </Button>
                          </Grid>
                          {sauce?.map((e, i) => {
                            return (
                              <Grid
                                item
                                key={e.id}
                                xs={12}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-evenly"
                                position="relative"
                                onMouseOver={() =>
                                  handleMouseOver("sauce", e.id)
                                }
                                onMouseOut={() => handleMouseOut("sauce", e.id)}
                              >
                                <Grid item xs={5}>
                                  <TextField
                                    label="Name"
                                    name={`sauce[${i}].Name`}
                                    value={sauce[i].Name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    size="small"
                                    color={
                                      errors.sauce && sauce[i].Name === ""
                                        ? "error"
                                        : "primary"
                                    }
                                    sx={{ mb: "0.5rem" }}
                                  />
                                  <Typography color="red">
                                    <ErrorMessage name={`sauce.${i}.Name`} />
                                  </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                  <TextField
                                    label="Quantity"
                                    name={`sauce[${i}].Quantity`}
                                    value={sauce[i].Quantity.replace(/\D/g, "")}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    size="small"
                                    color={
                                      errors.sauce && sauce[i].Quantity === ""
                                        ? "error"
                                        : "primary"
                                    }
                                    sx={{ mb: "0.5rem" }}
                                  />

                                  <Typography color="red">
                                    <ErrorMessage
                                      name={`sauce.${i}.Quantity`}
                                    />
                                  </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                  <TextField
                                    label="Price"
                                    name={`sauce[${i}].Price`}
                                    value={sauce[i].Price.replace(/\D/g, "")}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    size="small"
                                    color={
                                      errors.sauce && sauce[i].Price === ""
                                        ? "error"
                                        : "primary"
                                    }
                                    sx={{ mb: "0.5rem" }}
                                  />

                                  <Typography color="red">
                                    <ErrorMessage
                                      name={`sauce.${i}.Price`}
                                    />
                                  </Typography>
                                </Grid>

                                {SaucehoverOn.length > 0 &&
                                  SaucehoverOn[i].hover ? (
                                  <Button
                                    sx={removeBtn_style}
                                    onClick={() => {
                                      remove(i);
                                      handleDeleteHoverOn("sauce", e.id);
                                    }}
                                  >
                                    <Close
                                      color="error"
                                      sx={{ fontSize: "30px" }}
                                    />
                                  </Button>
                                ) : null}
                              </Grid>
                            );
                          })}
                        </Grid>
                      );
                    }}
                  </FieldArray>

                  <FieldArray name="cheese">
                    {(fieldArrayProps) => {
                      const { push, remove } = fieldArrayProps;
                      const cheese = fieldArrayProps.form.values.cheese;

                      return (
                        <Grid container rowGap={2}>
                          <Grid item xs={12} display="flex" alignItems="center">
                            <Typography fontWeight="bold">Cheese : </Typography>
                            <Button
                              onClick={() => {
                                if (cheese.length < 4) {
                                  if (cheese.length === 0) {
                                    push({
                                      id: "cheese1",
                                      Name: "",
                                      Quantity: "",
                                      Price: ""
                                    });
                                    handleHoverOnAdd("cheese");
                                  } else {
                                    cheese.push({
                                      id: `cheese${parseInt(
                                        cheese[cheese.length - 1].id.replace(
                                          D_regex,
                                          ""
                                        )
                                      ) + 1
                                        }`,
                                      Name: "",
                                      Quantity: "",
                                      Price: ""
                                    });
                                    handleHoverOnAdd("cheese");
                                  }
                                } else {
                                  alert("Only 4 items can be added at a time");
                                }
                              }}
                            >
                              Add Items
                            </Button>
                          </Grid>
                          {cheese?.map((e, i) => {
                            return (
                              <Grid
                                item
                                key={e.id}
                                xs={12}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-evenly"
                                position="relative"
                                onMouseOver={() =>
                                  handleMouseOver("cheese", e.id)
                                }
                                onMouseOut={() =>
                                  handleMouseOut("cheese", e.id)
                                }
                              >
                                <Grid item xs={5}>
                                  <TextField
                                    label="Name"
                                    name={`cheese[${i}].Name`}
                                    value={cheese[i].Name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    size="small"
                                    color={
                                      errors.cheese && cheese[i].Name === ""
                                        ? "error"
                                        : "primary"
                                    }
                                    sx={{ mb: "0.5rem" }}
                                  />
                                  <Typography color="red">
                                    <ErrorMessage name={`cheese.${i}.Name`} />
                                  </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                  <TextField
                                    label="Quantity"
                                    name={`cheese[${i}].Quantity`}
                                    value={cheese[i].Quantity.replace(
                                      /\D/g,
                                      ""
                                    )}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    size="small"
                                    color={
                                      errors.cheese && cheese[i].Quantity === ""
                                        ? "error"
                                        : "primary"
                                    }
                                    sx={{ mb: "0.5rem" }}
                                  />

                                  <Typography color="red">
                                    <ErrorMessage
                                      name={`cheese.${i}.Quantity`}
                                    />
                                  </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                  <TextField
                                    label="Price"
                                    name={`cheese[${i}].Price`}
                                    value={cheese[i].Price.replace(
                                      /\D/g,
                                      ""
                                    )}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    size="small"
                                    color={
                                      errors.cheese && cheese[i].Price === ""
                                        ? "error"
                                        : "primary"
                                    }
                                    sx={{ mb: "0.5rem" }}
                                  />

                                  <Typography color="red">
                                    <ErrorMessage
                                      name={`cheese.${i}.Price`}
                                    />
                                  </Typography>
                                </Grid>

                                {CheesehoverOn.length > 0 &&
                                  CheesehoverOn[i].hover ? (
                                  <Button
                                    sx={removeBtn_style}
                                    onClick={() => {
                                      remove(i);
                                      handleDeleteHoverOn("cheese", e.id);
                                    }}
                                  >
                                    <Close
                                      color="error"
                                      sx={{ fontSize: "30px" }}
                                    />
                                  </Button>
                                ) : null}
                              </Grid>
                            );
                          })}
                        </Grid>
                      );
                    }}
                  </FieldArray>

                  <FieldArray name="veggies">
                    {(fieldArrayProps) => {
                      const { push, remove } = fieldArrayProps;
                      const veggies = fieldArrayProps.form.values.veggies;

                      return (
                        <Grid container rowGap={2}>
                          <Grid item xs={12} display="flex" alignItems="center">
                            <Typography fontWeight="bold">
                              Veggies :{" "}
                            </Typography>
                            <Button
                              onClick={() => {
                                if (veggies.length === 0) {
                                  push({
                                    id: "veggies1",
                                    Name: "",
                                    Quantity: "",
                                    Price: ""
                                  });
                                  handleHoverOnAdd("veggies");
                                } else {
                                  veggies.push({
                                    id: `veggies${parseInt(
                                      veggies[veggies.length - 1].id.replace(
                                        D_regex,
                                        ""
                                      )
                                    ) + 1
                                      }`,
                                    Name: "",
                                    Quantity: "",
                                    Price: ""
                                  });
                                  handleHoverOnAdd("veggies");
                                }
                              }}
                            >
                              Add Items
                            </Button>
                          </Grid>
                          {veggies?.map((e, i) => {
                            return (
                              <Grid
                                item
                                key={e.id}
                                xs={12}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-evenly"
                                position="relative"
                                onMouseOver={() =>
                                  handleMouseOver("veggies", e.id)
                                }
                                onMouseOut={() =>
                                  handleMouseOut("veggies", e.id)
                                }
                              >
                                <Grid item xs={5}>
                                  <TextField
                                    label="Name"
                                    name={`veggies[${i}].Name`}
                                    value={veggies[i].Name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    size="small"
                                    color={
                                      errors.veggies && veggies[i].Name === ""
                                        ? "error"
                                        : "primary"
                                    }
                                    sx={{ mb: "0.5rem" }}
                                  />
                                  <Typography color="red">
                                    <ErrorMessage name={`veggies.${i}.Name`} />
                                  </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                  <TextField
                                    label="Quantity"
                                    name={`veggies[${i}].Quantity`}
                                    value={veggies[i].Quantity.replace(
                                      /\D/g,
                                      ""
                                    )}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    size="small"
                                    color={
                                      errors.veggies &&
                                        veggies[i].Quantity === ""
                                        ? "error"
                                        : "primary"
                                    }
                                    sx={{ mb: "0.5rem" }}
                                  />

                                  <Typography color="red">
                                    <ErrorMessage
                                      name={`veggies.${i}.Quantity`}
                                    />
                                  </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                  <TextField
                                    label="Price"
                                    name={`veggies[${i}].Price`}
                                    value={veggies[i].Price.replace(
                                      /\D/g,
                                      ""
                                    )}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    size="small"
                                    color={
                                      errors.veggies &&
                                        veggies[i].Price === ""
                                        ? "error"
                                        : "primary"
                                    }
                                    sx={{ mb: "0.5rem" }}
                                  />

                                  <Typography color="red">
                                    <ErrorMessage
                                      name={`veggies.${i}.Price`}
                                    />
                                  </Typography>
                                </Grid>

                                {VeggieshoverOn.length > 0 &&
                                  VeggieshoverOn[i].hover ? (
                                  <Button
                                    sx={removeBtn_style}
                                    onClick={() => {
                                      remove(i);
                                      handleDeleteHoverOn("veggies", e.id);
                                    }}
                                  >
                                    <Close
                                      color="error"
                                      sx={{ fontSize: "30px" }}
                                    />
                                  </Button>
                                ) : null}
                              </Grid>
                            );
                          })}
                        </Grid>
                      );
                    }}
                  </FieldArray>

                  <FieldArray name="meats">
                    {(fieldArrayProps) => {
                      const { push, remove } = fieldArrayProps;
                      const meats = fieldArrayProps.form.values.meats;

                      return (
                        <Grid container rowGap={2}>
                          <Grid item xs={12} display="flex" alignItems="center">
                            <Typography fontWeight="bold">Meats : </Typography>
                            <Button
                              onClick={() => {
                                if (meats.length === 0) {
                                  push({
                                    id: "meats1",
                                    Name: "",
                                    Quantity: "",
                                    Price: ""
                                  });
                                  handleHoverOnAdd("meats");
                                } else {
                                  // console.log(base,base[base.length - 1].id.replace(D_regex,""))
                                  meats.push({
                                    id: `meats${parseInt(
                                      meats[meats.length - 1].id.replace(
                                        D_regex,
                                        ""
                                      )
                                    ) + 1
                                      }`,
                                    Name: "",
                                    Quantity: "",
                                    Price: ""
                                  });
                                  handleHoverOnAdd("meats");

                                }
                              }}
                            >
                              Add Items
                            </Button>
                          </Grid>
                          {meats?.map((e, i) => {
                            return (
                              <Grid
                                item
                                key={e.id}
                                xs={12}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-evenly"
                                position="relative"
                                onMouseOver={() =>
                                  handleMouseOver("meats", e.id)
                                }
                                onMouseOut={() => handleMouseOut("meats", e.id)}
                              >
                                <Grid item xs={5}>
                                  <TextField
                                    label="Name"
                                    name={`meats[${i}].Name`}
                                    value={meats[i].Name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    size="small"
                                    color={
                                      errors.meats && meats[i].Name === ""
                                        ? "error"
                                        : "primary"
                                    }
                                    sx={{ mb: "0.5rem" }}
                                  />
                                  <Typography color="red">
                                    <ErrorMessage name={`meats.${i}.Name`} />
                                  </Typography>
                                </Grid>
                                <Grid item xs={3} >
                                  <TextField
                                    label="Quantity"
                                    name={`meats[${i}].Quantity`}
                                    value={meats[i].Quantity.replace(/\D/g, "")}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    size="small"
                                    color={
                                      errors.meats && meats[i].Quantity === ""
                                        ? "error"
                                        : "primary"
                                    }
                                    sx={{ mb: "0.5rem" }}
                                  />

                                  <Typography color="red">
                                    <ErrorMessage
                                      name={`meats.${i}.Quantity`}
                                    />
                                  </Typography>
                                </Grid>
                                <Grid item xs={3} >
                                  <TextField
                                    label="Price"
                                    name={`meats[${i}].Price`}
                                    value={meats[i].Price.replace(/\D/g, "")}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    size="small"
                                    color={
                                      errors.meats && meats[i].Price === ""
                                        ? "error"
                                        : "primary"
                                    }
                                    sx={{ mb: "0.5rem" }}
                                  />

                                  <Typography color="red">
                                    <ErrorMessage
                                      name={`meats.${i}.Price`}
                                    />
                                  </Typography>
                                </Grid>

                                {MeatshoverOn.length > 0 &&
                                  MeatshoverOn[i].hover ? (
                                  <Button
                                    sx={removeBtn_style}
                                    onClick={() => {
                                      remove(i);
                                      handleDeleteHoverOn("meats", e.id);
                                    }}
                                  >
                                    <Close
                                      color="error"
                                      sx={{ fontSize: "30px" }}
                                    />
                                  </Button>
                                ) : null}
                              </Grid>
                            );
                          })}
                        </Grid>
                      );
                    }}
                  </FieldArray>
                  <Button type="submit">Create</Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Box>
      {AdminaccCompOpen ? <AccDetails /> : null}
    </Box>
  );
};
