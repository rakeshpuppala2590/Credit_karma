import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import '../Styles/Home.css';
import { useNavigate } from "react-router-dom";
import { validateName, validateEmail, validatePhone, validatePassword, validateDateOfBirth } from './Validations';

const Signin = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [secondField, setSecondField] = useState("email");
  const navigate = useNavigate();
  const [loginMessage, setLoginMessage] =useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    dob: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    dob: ""
  });

  const handleSignup = () => {
    setShowSignup(true);
    setShowSignin(false);
  };

  const handleSignin = () => {
    setShowSignup(false);
    setShowSignin(true);
  };

  const toggleSecondField = () => {
    setSecondField(prevField => prevField === "email" ? "phone" : "email");
    setFormData(prevState => ({
      ...prevState,
      email: "",
      phone: ""
    }));
    setErrors(prevState => ({
      ...prevState,
      email: "",
      phone: ""
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return validateName(value);
      case "email":
        return validateEmail(value);
      case "phone":
        return validatePhone(value);
      case "password":
        return validatePassword(value);
      case "dob":
        return validateDateOfBirth(value);
      default:
        return "";
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    const errorMessage = validateField(name, value);
    setErrors(prevState => ({
      ...prevState,
      [name]: errorMessage
    }));
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const nameError = validateName(formData.name);
    const passwordError = validatePassword(formData.password);
    const dobError = validateDateOfBirth(formData.dob);

    setErrors({
      email: emailError,
      phone: phoneError,
      name: nameError,
      password: passwordError,
      dob: dobError
    });

    console.log(errors)
    if (!nameError && !passwordError && !dobError) {
      try {
        
        const response = await axios.post('http://localhost:5050/api/users/signup', formData);
        setLoginMessage(response.data.message);
        handleSignin();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSigninSubmit = async (event) => {
    event.preventDefault();
    const emailOrPhoneError = secondField === "email" ? validateEmail(formData.email) : validatePhone(formData.phone);
    const passwordError = validatePassword(formData.password);

    setErrors({
      email: secondField === "email" ? emailOrPhoneError : "",
      phone: secondField === "phone" ? emailOrPhoneError : "",
      name: "",
      password: passwordError,
      dob: ""
    });

    if (!emailOrPhoneError && !passwordError) {
      try {
        const response = await axios.post('http://localhost:5050/api/users/signin', formData)
        console.log("succesful", response);
        setLoginMessage('');
        navigate('/Home')
      }
      catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="form-container">
        {!showSignup && !showSignin && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Welcome</h2>
            <div className="floating-label">

              <input
                type={secondField === "email" ? "email" : "tel"}
                name={secondField === "email" ? "email" : "phone"}
                placeholder=" "
                className="floating-input"
                value={secondField === "email" ? formData.email : formData.phone}
                onChange={handleInputChange}
              />
              <label className={`floating-label-text ${formData.email || formData.phone ? 'floating-label-up' : ''}`}>
                {secondField === "email" ? "Email" : "Phone"}
              </label>
              {secondField === "email" && errors.email && <p className="text-red-500">{errors.email}</p>}
              {secondField === "phone" && errors.phone && <p className="text-red-500">{errors.phone}</p>}
            </div>
            <div className="mb-2 flex justify-end toggle-span">
              <span
                className="text-blue-500 cursor-pointer"
                onClick={toggleSecondField}
              >
                {secondField === "email" ? "Use Phone instead" : "Use Email instead"}
              </span>
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="contained" color="primary" className="w-full" onClick={handleSignin}>
                Sign In
              </Button>
            </div>
            <div className="text-center mt-4">
              <p className="text-gray-500">
                Don't have an account?&nbsp;
                <span
                  onClick={handleSignup}
                  className="text-blue-500 cursor-pointer ml-1"
                >
                  Sign up
                </span>
              </p>
            </div>
          </div>
        )}
        {showSignup && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold">Sign Up</h2>
              <p className="text-gray-500">Create your account</p>
            </div>
            <form onSubmit={handleSignupSubmit}>
              <div className="floating-label">
                <input
                  type="text"
                  name="name"
                  placeholder=" "
                  className="floating-input"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <label className={`floating-label-text ${formData.name ? 'floating-label-up' : ''}`}>Name</label>
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
              <div className="floating-label">
                <input
                  type={secondField === "email" ? "email" : "tel"}
                  name={secondField === "email" ? "email" : "phone"}
                  placeholder=" "
                  className="floating-input"
                  value={secondField === "email" ? formData.email : formData.phone}
                  onChange={handleInputChange}
                />
                <label className={`floating-label-text ${formData.email || formData.phone ? 'floating-label-up' : ''}`}>
                  {secondField === "email" ? "Email" : "Phone"}
                </label>
                {secondField === "email" && errors.email && <p className="text-red-500">{errors.email}</p>}
                {secondField === "phone" && errors.phone && <p className="text-red-500">{errors.phone}</p>}
              </div>
              <div className="mb-2 flex justify-end toggle-span">
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={toggleSecondField}
                >
                  {secondField === "email" ? "Use Phone instead" : "Use Email instead"}
                </span>
              </div>
              <div className="floating-label">
                <input
                  type="password"
                  name="password"
                  placeholder=" "
                  className="floating-input"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <label className={`floating-label-text ${formData.password ? 'floating-label-up' : ''}`}>Password</label>
                {errors.password && <p className="text-red-500">{errors.password}</p>}
              </div>
              <div className="floating-label">
                <input
                  type="date"
                  name="dob"
                  placeholder=" "
                  className="floating-input"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
                <label className={`floating-label-text ${formData.dob ? 'floating-label-up' : ''}`}>Date of Birth</label>
                {errors.dob && <p className="text-red-500">{errors.dob}</p>}
              </div>
              <div className="button-container mt-4">
                <Button type="submit" variant="contained" color="primary" className="mr-2">Sign Up</Button>
                <Button variant="contained" className="ml-2" onClick={() => setShowSignup(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        )}
        {showSignin && (
          <div>
            <div className="text-center mb-8">
              {loginMessage && <p className="text-red-500">{loginMessage}</p>}
              <h2 className="text-2xl font-semibold">Sign In</h2>
              <p className="text-gray-500">Enter your credentials</p>
            </div>
            <form onSubmit={handleSigninSubmit}>
              <div className="floating-label">
                <input
                  type={secondField === "email" ? "email" : "tel"}
                  name={secondField === "email" ? "email" : "phone"}
                  placeholder=" "
                  className="floating-input"
                  value={secondField === "email" ? formData.email : formData.phone}
                  onChange={handleInputChange}
                />
                <label className={`floating-label-text ${formData.email || formData.phone ? 'floating-label-up' : ''}`}>
                  {secondField === "email" ? "Email" : "Phone"}
                </label>
                {secondField === "email" && errors.email && <p className="text-red-500">{errors.email}</p>}
                {secondField === "phone" && errors.phone && <p className="text-red-500">{errors.phone}</p>}
              </div>
              <div className="mb-2 flex justify-end toggle-span">
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={toggleSecondField}
                >
                  {secondField === "email" ? "Use Phone instead" : "Use Email instead"}
                </span>
              </div>
              <div className="floating-label">
                <input
                  type="password"
                  name="password"
                  placeholder=" "
                  className="floating-input"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <label className={`floating-label-text ${formData.password ? 'floating-label-up' : ''}`}>Password</label>
                {errors.password && <p className="text-red-500">{errors.password}</p>}
              </div>
              <div className="button-container mt-4">
                <Button type="submit" variant="contained" color="primary" className="mr-2">Sign In</Button>
                <Button variant="contained" className="ml-2" onClick={() => setShowSignin(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signin;
