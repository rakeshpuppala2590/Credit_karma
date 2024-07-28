// src/components/Home.jsx
import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";
import Dashboard from "./Dashboard";

const Home = () => {
  const [linkToken, setLinkToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const createLinkToken = async () => {
      try {
        const response = await axios.post("http://localhost:5050/api/create_link_token");
        setLinkToken(response.data.link_token);
      } catch (error) {
        console.error("Error creating link token:", error);
      }
    };
    createLinkToken();
  }, []);

  const onSuccess = async (public_token) => {
    try {
      const response = await axios.post("http://localhost:5050/api/exchange_public_token", {
        public_token,
      });
      const accessToken = response.data.access_token;
      setAccessToken(accessToken);
    } catch (error) {
      console.error("Error exchanging public token:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const transactionsResponse = await axios.get("http://localhost:5050/api/transactions", {
        params: { access_token: accessToken },
      });
      setTransactions(transactionsResponse.data.transactions);
      setShowDashboard(true);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  });

  return (
    <>
      <Nav />
      <div className="home p-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
          onClick={() => open()}
          disabled={!ready}
        >
          Link Bank Account
        </button>
        {accessToken && (
          <button
            className="bg-green-500 text-white py-2 px-4 rounded mb-4"
            onClick={fetchTransactions}
          >
            Fetch Transactions
          </button>
        )}
        {showDashboard && <Dashboard transactions={transactions} />}
      </div>
      <Footer />
    </>
  );
};

export default Home;
