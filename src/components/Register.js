import React, { useState } from "react";

/* -------------------------------------------------------------------------- */
/*                                 import antd                                */
/* -------------------------------------------------------------------------- */

import {
  Form,
  Button,
  Row,
  Col

} from 'antd';

//  import { UploadOutlined } from '@ant-design/icons';

import {
  EyeOutlined
} from '@ant-design/icons';
// import { UploadOutlined } from '@ant-design/icons';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
//style
// import './style.css';

function Register() {




  const navigate = useNavigate();
  const [dataLogin,setdataLogin] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isContainerActive, setIsContainerActive] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);


  const [selectedFile, setSelectedFile] = useState([]);
  const [data, setData] = React.useState({
    photo: '',
    username: '',
    email: '',
    password: ''

  });


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
    try {
      const url = 'http://localhost:8080/api/auth/signin';
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



  const handleSubmitSignup = async (event) => {

    const eventFormData = new FormData();
    eventFormData.append('photo', selectedFile[0]);
    eventFormData.append('username', data.username);
    eventFormData.append('email', data.email);
    eventFormData.append('password', data.password);
    try {

      const url = 'http://localhost:8080/api/auth/signup';
      console.log("Trying /verifymail");
      //  axios({
      //   method: 'post',
      //   url: 'http://localhost:8000/api/auth/signup',
      //   data: eventFormData ,
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });
      const { data: res } = await axios.post(url, eventFormData);
      console.log("successssss");
      navigate('/verifymail');
      console.log(res.message);
      console.log("signup success");
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
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className={`container ${isContainerActive ? ' sign-up-mode' : ''} `}>
        <div className="forms-container">
          <div className="signin-signup">


            <form className="sign-in-form" onSubmit={handleSubmit}>
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  onChange={handleChange}
                  value={dataLogin.username}
                  required
                />
              </div>
              <div className="input-field">
                <button onClick={togglePassword} className='password'><EyeOutlined /></button>
                <input
                  className="input"
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={dataLogin.password}
                  required
                />
              </div>
              <Link to="/reset">
                <p className="social-text">
                  Forgot password ?
                </p>
              </Link>
              {error && <div className="error_msg">{error}</div>}
              <input type="submit" value="Login" className="btn solid" />
              <p className="social-text">Or Sign in with social platforms</p>

            </form>



            <Form className="sign-up-form panel lef-panel box1" onFinish={handleSubmitSignup} >
              <Row>
                <Col>
                  <Form.Item name="username">
                    <input
                      type="text"
                      name="username"
                      placeholder="username"
                      onChange={handleChangee}
                      value={data.username}
                      required
                    />
                  </Form.Item>
                </Col>
                <Col>

                </Col>
              </Row>
              <input name="gallery" type="file" multiple onChange={handleFileSelect} />


              <Form.Item name="email">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  onChange={handleChangee}
                  value={data.email}
                  required
                />
              </Form.Item>

              <Form.Item name="password">
                <Row >
                  <Col>
                    <input
                      className="input"
                      type={passwordShown ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      onChange={handleChangee}
                      value={data.password}
                      required
                    />
                  </Col>

                </Row>
              </Form.Item>

              <Button htmlType="submit" className="btn solid" >Sign Up</Button>
            </Form>














          </div>
        </div>

       
      </div>



    </>
  );
}

export default Register;




