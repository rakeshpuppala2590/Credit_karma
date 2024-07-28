import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";
import Transactions from "./Transactions";

const Home = () => {
  const [linkToken, setLinkToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const createLinkToken = async () => {
      try {
        console.log("Creating link token...");
        const response = await axios.post("http://localhost:5050/api/create_link_token");
        setLinkToken(response.data.link_token);
        console.log("Link token created:", response.data.link_token);
      } catch (error) {
        console.error("Error creating link token:", error);
      }
    };
    createLinkToken();
  }, []);

  const onSuccess = async (public_token) => {
    try {
      console.log("Exchanging public token for access token...");
      const response = await axios.post("http://localhost:5050/api/exchange_public_token", {
        public_token,
      });
      const accessToken = response.data.access_token;
      setAccessToken(accessToken);
      console.log("Access token obtained:", accessToken);
    } catch (error) {
      console.error("Error exchanging public token:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      console.log("Fetching transactions...");
      const transactionsResponse = await axios.get("http://localhost:5050/api/transactions", {
        params: { access_token: accessToken },
      });
      setTransactions(transactionsResponse.data.transactions);
      console.log("Transactions fetched:", transactionsResponse.data.transactions);
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
        <Transactions transactions={transactions} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
