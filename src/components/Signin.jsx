import React, { useState } from 'react';
import Button from '@mui/material/Button';
import '/Users/rakeshpuppala/Desktop/twitter-clone/src/Styles/login.css';

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

  return ( 
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-md p-8 max-w-md w-full">
        {!showSignup && !showSignin && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Welcome</h2>
            <div className="mb-4 relative">
              <input 
                type={secondField === "email" ? "email" : "tel"} 
                placeholder={secondField === "email" ? "Email" : "Phone"} 
                className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-400" 
              />
            </div>
            <div className="mb-4 flex justify-end">
              <span 
                className="text-blue-500 cursor-pointer"
                onClick={toggleSecondField}
              >
                {secondField === "email" ? "Use Phone instead" : "Use Email instead"}
              </span>
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="contained" color="primary" className="w-full" onClick={handleSignin}>Sign In</Button>
            </div>
            <div className="text-center mt-4">
              <p className="text-gray-500">
                Don't have an account? 
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
              <div className="mb-4">
                <input type="text" placeholder="Name" className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-400" />
              </div>
              <div className="mb-4 relative">
                <input type={secondField === "email" ? "email" : "tel"} placeholder={secondField === "email" ? "Email" : "Phone"} className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-400" />
              </div>
              <div className="mb-4 flex justify-end">
                <span 
                  className="text-blue-500 cursor-pointer"
                  onClick={toggleSecondField}
                >
                  {secondField === "email" ? "Use Phone instead" : "Use Email instead"}
                </span>
              </div>
              <div className="mb-4">
                <input type="password" placeholder="Password" className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-400" />
              </div>
              <div className="mb-4">
                <input type="date" placeholder="Date of Birth" className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-400" />
                <p className="text-sm text-gray-500 mt-1">Please provide your Date of Birth</p>
              </div>
              <div className="flex justify-between">
                <Button variant="contained" color="primary" className="w-1/2 mr-2">Sign Up</Button>
                <Button variant="contained" color="secondary" className="w-1/2 ml-2" onClick={() => setShowSignup(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        )}
        {showSignin && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold">Sign In</h2>
              <p className="text-gray-500">Welcome back</p>
            </div>
            <form>
              <div className="mb-4 relative">
                <input 
                  type={secondField === "email" ? "email" : "tel"} 
                  placeholder={secondField === "email" ? "Email" : "Phone"} 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-400" 
                />
              </div>
              <div className="mb-4 flex justify-end">
                <span 
                  className="text-blue-500 cursor-pointer"
                  onClick={toggleSecondField}
                >
                  {secondField === "email" ? "Use Phone instead" : "Use Email instead"}
                </span>
              </div>
              <div className="mb-4">
                <input type="password" placeholder="Password" className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-400" />
              </div>
              <div className="flex justify-between">
                <Button variant="contained" color="primary" className="w-1/2 mr-2">Sign In</Button>
                <Button variant="contained" color="secondary" className="w-1/2 ml-2" onClick={() => setShowSignin(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}


export default Signin;