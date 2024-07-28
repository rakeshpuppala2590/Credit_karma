import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";

const Home = () => {
  const [linkToken, setLinkToken] = useState(null);
  const [transactions, setTransactions] = useState([]);

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

      const transactionsResponse = await axios.get("http://localhost:5050/api/transactions", {
        params: { access_token: accessToken },
      });
      setTransactions(transactionsResponse.data.transactions);
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
      <div className="home">
        <h1>Home Page</h1>
        <button onClick={() => open()} disabled={!ready}>
          Link Bank Account
        </button>
        <h2>Transactions</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.transaction_id}>
              {transaction.date}: {transaction.name} - {transaction.amount}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Home;
