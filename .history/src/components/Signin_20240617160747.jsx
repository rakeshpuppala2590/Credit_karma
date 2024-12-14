import React, { useState } from 'react';
import Button from '@mui/material/Button';
import '../Styles/Home.css';
import { validateEmail, validateName, validateDateOfBirth, validatePhone} from './Exceptions';


const Signin = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [secondField, setSecondField] = useState("email");
  const [email, setEmail] = useState("");

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
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
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
                placeholder=" " 
                className="floating-input"
                value={email}
                onChange={handleEmailChange}
              />
              <label className="floating-label-text">
                {secondField === "email" ? "Email" : "Phone"}
              </label>
            </div>
            <div className="mb-2 flex justify-end toggle-span"> {/* Adjusted margin-top here */}
              <span 
                className="text-blue-500 cursor-pointer"
                onClick={toggleSecondField}
              >
                {secondField === "email" ? "Use Phone instead" : "Use Email instead"}
              </span>
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="contained" color="primary" className="w-full" onClick={() => handleSignin(email)}>Sign In</Button>
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
            <form>
              <div className="floating-label">
                <input type="text" placeholder=" " className="floating-input" />
                <label className="floating-label-text">Name</label>
              </div>
              <div className="floating-label">
                <input type={secondField === "email" ? "email" : "tel"} placeholder=" " className="floating-input" />
                <label className="floating-label-text">
                  {secondField === "email" ? "Email" : "Phone"}
                </label>
              </div>
              <div className="mb-2 flex justify-end toggle-span"> {/* Adjusted margin-top here */}
                <span 
                  className="text-blue-500 cursor-pointer"
                  onClick={toggleSecondField}
                >
                  {secondField === "email" ? "Use Phone instead" : "Use Email instead"}
                </span>
              </div>
              <div className="floating-label">
                <input type="password" placeholder=" " className="floating-input" />
                <label className="floating-label-text">Password</label>
              </div>
              <div className="button-container mt-4">
                <Button variant="contained" color="primary" className="mr-2">Sign Up</Button>
                <Button variant="contained" className="ml-2" onClick={() => setShowSignup(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        )}
        {showSignin && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold">Sign In</h2>
              <p className="text-gray-500">Enter your credentials</p>
            </div>
            <form>
              <div className="floating-label">
                <input type={secondField === "email" ? "email" : "tel"} placeholder=" " className="floating-input" value={email} onChange={handleEmailChange}/>
                <label className="floating-label-text">
                  {secondField === "email" ? "Email" : "Phone"}
                </label>
              </div>
              <div className="mb-2 flex justify-end toggle-span"> {/* Adjusted margin-top here */}
                <span 
                  className="text-blue-500 cursor-pointer"
                  onClick={toggleSecondField}
                >
                  {secondField === "email" ? "Use Phone instead" : "Use Email instead"}
                </span>
              </div>
              <div className="floating-label">
                <input type="password" placeholder=" " className="floating-input" />
                <label className="floating-label-text">Password</label>
              </div>
              <div className="button-container mt-4">
                <Button variant="contained" color="primary" className="mr-2">Sign In</Button>
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
