import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import "./index.css"
import { useState,useEffect } from "react";

const LoginPage = () => {
    const theme = useTheme();
    localStorage.removeItem('user')
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
      <>
      <Box className='login-page-bg'>
      </Box>
      <Box className='login-page-bg-black'>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="black" marginTop="2rem"marginRight="12rem">
          Booking.com
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="bold" fontSize="16px" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Booking.com for awesome hotel bookings !
        </Typography>
        <Typography  fontSize="12px" variant="h5" sx={{ mb: "1.5rem" }}>
          Please click on 'Login as a Guest' button to get into the page or register a account
        </Typography>
        <Form />
      </Box>
    </Box>
    </>
    );
  };

export default LoginPage