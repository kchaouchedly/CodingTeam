/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components

import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


// @mui material components
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import curved6 from "assets/images/curved-images/curved14.jpg";
// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

function SignIn() {
  const [dataLogin,setdataLogin] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const handleSetAgremment = () => setAgremment(!agreement);
  const [passwordShown, setPasswordShown] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
 




  const handleChange = ({ currentTarget: input }) => {
    setdataLogin({ ...dataLogin, [input.name]: input.value });
  };



  const handleSubmitSignup = async (event) => {
    event.preventDefault();
    setSuccess(true);
  
  
  };
  
  

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const url = 'http://localhost:8000/api/auth/signin';
    const { data: res } = await axios.post(url, dataLogin);
    localStorage.setItem('token', res.data);
    console.log('data', dataLogin)
    window.location = '/test';
  } catch (error) {
    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
      setError(error.response.data.message);
      console.log('erreur');
    }
  }
};






  return (
    <CoverLayout
      title="Welcome back!"
      description="Enter your email and password to sign in"
      image={curved6}
    >

        <form onSubmit={handleSubmit}>
        <SoftBox mb={2}>
          
        <SoftBox mb={1} ml={0.5}>
            <SoftBox >
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
            </SoftBox>
                <SoftInput
                  type="text"
                  placeholder="Name"
                  name="username"
                  value={dataLogin.username}
                  onChange={handleChange}
                  required
                />
                
              </SoftBox>
              <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={dataLogin.password}
                  onChange={handleChange}
                  required
                />
              </SoftBox>
               
              
              <SoftBox display="flex" alignItems="center">
          
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onSubmit={handleSubmit}
            
            sx={{ cursor: "pointer", userSelect: "none" }}
          > &nbsp;&nbsp;Remember me
          </SoftTypography>

            </SoftBox>

            <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth type="submit" >
            sign in
          </SoftButton>
        </SoftBox>

        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
              
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>

           
          </SoftBox>
        </form>
  
       
        {successMessage && (
  <SoftBox p={3} mt={3} bg="success" color="white" sx={{ fontFamily: 'Calibri', backgroundColor: 'green' }}>
    <SoftTypography>{successMessage}</SoftTypography>
  </SoftBox>
)}
    {error && 
    <SoftBox p={3} mt={3} bg="success" color="white" sx={{ fontFamily: 'Calibri', backgroundColor: 'red' }}>
    <SoftTypography>{error}</SoftTypography>
  </SoftBox>
    }
    
    </CoverLayout>
  );
}

export default SignIn;
