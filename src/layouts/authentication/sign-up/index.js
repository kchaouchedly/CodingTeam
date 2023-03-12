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
import React from "react";


import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

// import { UploadOutlined } from '@ant-design/icons';

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

function SignUp() {
  const navigate = useNavigate();
  const [dataLogin,setdataLogin] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isContainerActive, setIsContainerActive] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [agreement, setAgremment] = useState(true);
  const handleSetAgremment = () => setAgremment(!agreement);
  const [selectedFile, setSelectedFile] = useState([]);
  const [success, setSuccess] = useState(false);
  const [data, setData] = React.useState({
    photo: '',
    username: '',
    email: '',
    password: ''

  });
  const [errorMessage, setErrorMessage] = useState("");

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };




  const signUpButton = () => {
    setIsContainerActive(false);
  };
  const signInButton = () => {
    setIsContainerActive(true);
  };






  const handleChange = ({ currentTarget: input }) => {
      setdataLogin({ ...dataLogin, [input.name]: input.value });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      const url = 'http://localhost:8000/api/auth/signin';
      const { data: res } = await axios.post(url, dataLogin);
      localStorage.setItem('token', res.data);
      console.log('data', dataLogin)
      window.location = '/';
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
        console.log('erreur');
      }
    }
  };
  const [successMessage, setSuccessMessage] = useState("");

  // const handleSubmitSignup = async (event) => {
  //     event.preventDefault();
  //     setSuccess(true);
  
  //     const eventFormData = new FormData();
  //     eventFormData.append('photo', selectedFile[0]);
  //     eventFormData.append('username', data.username);
  //     eventFormData.append('email', data.email);
  //     eventFormData.append('password', data.password);
  
  //     try {
  //       const url = 'http://localhost:8080/api/auth/signup';
  //       const { data: res } = await axios.post(url, eventFormData);
        
  //       navigate('/authentication/sign-in');
  //       console.log(res.message);
  //       console.log("signup success");
  //       setSuccessMessage("Please verify your email");
  //     } catch (error) {
  //       if (error.response && error.response.status >= 400 && error.response.status <= 500) {
  //         setError(error.response.data.message);
  //       }
  //     }
  //   };
  const handleSubmitSignup = async (event) => {
    event.preventDefault();
    setSuccess(true);
  
    const eventFormData = new FormData();
    eventFormData.append('photo', selectedFile[0]);
    eventFormData.append('username', data.username);
    eventFormData.append('email', data.email);
    eventFormData.append('password', data.password);
  
    try {
      const url = 'http://localhost:8000/api/auth/signup';
      const { data: res } = await axios.post(url, eventFormData);
  
      console.log(res.message);
      console.log("signup success");
      setSuccessMessage("Please verify your email To validate your Account using the link sent ");
  
      // Redirect to sign-in page after 30 seconds
      setTimeout(() => {
        navigate('/authentication/sign-in');
      }, 6000);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };


 



  const handleChangee = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };


  const handleFileSelect = (e) => {
    ///   setSelectedFile(selectedFile)

    // setSelectedFile(e.target.files)
    setSelectedFile(e.target.files);

    console.log('e.target.files ', e.target.files);
  };

  console.log('selectedFile ', selectedFile);
  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card>
        <form onSubmit={handleSubmitSignup}>
          <SoftBox p={3} mb={1} textAlign="center">
            <SoftTypography variant="h5" fontWeight="medium">
              Register with
            </SoftTypography>
          </SoftBox>
          <SoftBox mb={2}>
            <Socials />
          </SoftBox>
          <Separator />
          <SoftBox pt={2} pb={3} px={3}>
            <SoftBox onSubmit={handleSubmitSignup}>
              <SoftBox mb={2}>
                <SoftInput
                  type="text"
                  placeholder="Name"
                  name="username"
                  value={data.username}
                  onChange={handleChangee}
                  required
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={data.email}
                  onChange={handleChangee}
                  required
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput type="file" name="avatar" onChange={handleFileSelect} />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={data.password}
                  onChange={handleChangee}
                  required
                />
              </SoftBox>
              <SoftBox display="flex" alignItems="center">
                <Checkbox checked={agreement} onChange={handleSetAgremment} />
                <SoftTypography
                  variant="button"
                  fontWeight="regular"
                  onClick={handleSetAgremment}
                  sx={{ cursor: "poiner", userSelect: "none" }}
                >
                  &nbsp;&nbsp;I agree the&nbsp;
                </SoftTypography>
                <SoftTypography
                  component="a"
                  href="#"
                  variant="button"
                  fontWeight="bold"
                  textGradient
                >
                  Terms and Conditions
                </SoftTypography>
              </SoftBox>
              
              <SoftBox mt={4} mb={1}>
                <SoftButton variant="gradient" color="dark" fullWidth type="submit" >
                  sign up
                </SoftButton>
              </SoftBox>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
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
      </Card>
    </BasicLayout>
  );

  

}

export default SignUp;
 
