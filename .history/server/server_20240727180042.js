const express = require("express");
const plaid = require("plaid");
require('dotenv').config();
const cors = require("cors");
const users = require("./routes/users");

const db = require("./db/connection");

const PORT = process.env.PORT || 5050;
const app = express();
db();

app.use(cors());
app.use(express.json());
app.use("/api/users", users);

// Plaid client configuration
const plaidClient = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox, // Use 'sandbox' for testing
});

// Endpoint to create a Link token
app.post("/api/create_link_token", async (req, res) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: "unique_user_id" },
      client_name: "Your App Name",
      products: ["transactions"],
      country_codes: ["US"],
      language: "en",
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error creating link token");
  }
});

// Endpoint to exchange Public Token for Access Token
app.post("/api/exchange_public_token", async (req, res) => {
  const { public_token } = req.body;
  try {
    const response = await plaidClient.itemPublicTokenExchange({ public_token });
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error exchanging public token");
  }
});

// Endpoint to fetch transactions
app.get("/api/transactions", async (req, res) => {
  const { access_token } = req.query;
  try {
    const response = await plaidClient.transactionsGet({
      access_token,
      start_date: "2020-01-01",
      end_date: "2021-01-01",
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching transactions");
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
