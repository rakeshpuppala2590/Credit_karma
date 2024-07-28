import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";

const Home = () => {
  const [linkToken, setLinkToken] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch the link token from the server
    const createLinkToken = async () => {
      const response = await axios.post("/api/create_link_token");
      setLinkToken(response.data.link_token);
    };
    createLinkToken();
  }, []);

  const onSuccess = async (public_token) => {
    // Exchange the public token for an access token
    const response = await axios.post("/api/exchange_public_token", {
      public_token,
    });
    const accessToken = response.data.access_token;

    // Fetch transactions using the access token
    const transactionsResponse = await axios.get("/api/transactions", {
      params: { access_token: accessToken },
    });
    setTransactions(transactionsResponse.data.transactions);
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
