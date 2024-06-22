import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <Nav />
      <div className="home">
        <h1>Home Page</h1>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
