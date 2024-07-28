import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";

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

  // Helper function to categorize transactions
  const categorizeTransactions = (transactions) => {
    const categories = {};
    transactions.forEach((transaction) => {
      const category = transaction.category ? transaction.category[0] : "Uncategorized";
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(transaction);
    });
    return categories;
  };

  const categorizedTransactions = categorizeTransactions(transactions);

  return (
    <>
      <Nav />
      <div className="home">
        <h1>Home Page</h1>
        <button onClick={() => open()} disabled={!ready}>
          Link Bank Account
        </button>
        {accessToken && (
          <button onClick={fetchTransactions}>
            Fetch Transactions
          </button>
        )}
        <h2>Transactions</h2>
        {Object.keys(categorizedTransactions).map((category) => (
          <div key={category}>
            <h3>{category}</h3>
            <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {categorizedTransactions[category].map((transaction) => (
                  <tr key={transaction.transaction_id}>
                    <td>{transaction.date}</td>
                    <td>{transaction.name}</td>
                    <td>{transaction.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;