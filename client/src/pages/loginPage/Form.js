import { useState,useContext } from "react";
import {
    Box,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
    Button,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router";
import FlexBetween from "../../components/FlexBetween";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const registerSchema = yup.object().shape({
    username: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    country: yup.string().required("required"),
    city: yup.string().required("required"),
    phone: yup.string().required("required"),
  });

  const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
  });

  const initialValuesRegister = {
    username: "",
    email: "",
    password: "",
    country: "",
    city: "",
    phone: "",
  };
  
  const initialValuesLogin = {
    email: "",
    password: "",
  };

  const Form=()=>{
    const [pageType, setPageType] = useState("login");
    const navigate = useNavigate();
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const { loading, error, dispatch } = useContext(AuthContext);

    const register = async (values, onSubmitProps)=>{
        /*const formData = new FormData();
        for(let value in values) {
            formData.append(value,values[value]);
        }*/
        const savedUserResponse = await fetch(
            "https://hotel-booking-ikjh.onrender.com/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                body: JSON.stringify(values),
            }
        );
        /*await axios.post('http://localhost:3001/auth/register', JSON.stringify(values))
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          }); */
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();
        if(savedUser){
            setPageType("login")
        }
    }

    const login = async (values, onSubmitProps) => {
        dispatch({ type: "LOGIN_START" });
        const loggedInResponse = await fetch("https://hotel-booking-ikjh.onrender.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn.token) {
          localStorage.setItem("user",JSON.stringify(loggedIn.details));
          dispatch({ type: "LOGIN_SUCCESS", payload: loggedIn.details });
          navigate("/home");
        }
        else {
            dispatch({ type: "LOGIN_FAILURE", payload: loggedIn.response.data });
        }
      };

      const onGuestLogin = async () => {
        /*const loggedInResponse = await fetch("https://hotel-booking-ikjh.onrender.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({email: "nareshkurukooti@gmail.com",password:"ABC123"}),
        });
        const loggedIn = await loggedInResponse.json();*/
        navigate("/home");
        /*if (loggedIn.token) {
          localStorage.setItem("token",loggedIn.token);
          //navigate("/home");
        }*/
      };

    const handleFormSubmit = async (values, onSubmitProps)=>{
        if(isLogin) await login(values, onSubmitProps)
        if(isRegister) await register(values,onSubmitProps)
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4,minmax(0,1fr))"
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label="username"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.username}
                                    name="username"
                                    error={Boolean(touched.username) && Boolean(errors.username)}
                                    helperText={touched.username && errors.username}
                                    sx={{gridColumn:"span 2"}}
                                />
                                <TextField
                                    label="Country"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.country}
                                    name="country"
                                    error={Boolean(touched.country) && Boolean(errors.country)}
                                    helperText={touched.country && errors.country}
                                    sx={{gridColumn:"span 2"}}
                                />
                                <TextField
                                    label="City"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.city}
                                    name="city"
                                    error={Boolean(touched.city) && Boolean(errors.city)}
                                    helperText={touched.city && errors.city}
                                    sx={{gridColumn:"span 2"}}
                                />
                                <TextField
                                    label="Phone"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.phone}
                                    name="phone"
                                    error={Boolean(touched.phone) && Boolean(errors.phone)}
                                    helperText={touched.phone && errors.phone}
                                    sx={{gridColumn:"span 2"}}
                                />
                                
                            </>
                        )}

                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{gridColumn:"span 4"}}
                            className="input-field-box"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{gridColumn:"span 4"}}
                        />
                        
                        {/* BUTTONS */}
                        <Box sx={{gridColumn:"span 4"}}>
                            <Button
                                sx={{gridColumn:"span 2",color:"black",fontWeight:"bold"}}
                                type="submit"
                            >
                                {isLogin ? "LOGIN" : "REGISTER"}
                            </Button>
                            <Button
                                sx={{gridColumn:"span 2",marginLeft:"2rem",color:"black",fontWeight:"bold"}}
                                type="button"
                                onClick={onGuestLogin}
                            >
                                {isLogin && "Login as a Guest"}
                            </Button>
                            <Typography
                                sx={[{color:"#454547",fontSize:"12px"},{
                                    '&:hover': {
                                      cursor:"pointer",
                                    },
                                  }]}
                                onClick={()=>{
                                    setPageType(isLogin ? "register" : "login");
                                    resetForm();
                                }}
                            >
                                {isLogin ? "Don't have an account? Sign Up here." : "Already have an account? Login here"}
                            </Typography>
                        </Box>
                    </Box>
                </form>
            )}
        </Formik>
    )

  }

  export default Form