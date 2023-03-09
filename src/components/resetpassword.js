import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const linkformail="http://localhost:8080/api/auth/reset" ; 
const ResetPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tokenn,setTokenn]=useState();
 

  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = async (formValues, { setSubmitting }) => {
    try {
      const response = await axios.post(linkformail, {
        email: formValues.email
        
      })
      setTokenn(response.data)
  console.log(response)

      console.log(response.data);
      setIsSubmitted(true);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  const { token } = useParams();
  console.log(token)
  const handleNavigate = () => {
    navigate(`/reset-password/${tokenn}`);
    console.log(token)
  }
  return (
    <div className="col-md-6 offset-md-3">
      <h2>Reset Password</h2>
      {isSubmitted ? (
        <div className="alert alert-success">
          Password reset email sent to your email address. Please check your inbox.
          <button type="button" className="btn btn-link" onClick={handleNavigate}>Reset Password Now</button>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email address"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Reset Email"}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ResetPassword;
