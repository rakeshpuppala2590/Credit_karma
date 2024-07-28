const express = require("express");
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
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
const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox, // Use 'sandbox' for testing
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

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
    console.error("Error creating link token:", error.response ? error.response.data : error);
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
    console.error("Error exchanging public token:", error.response ? error.response.data : error);
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
    console.error("Error fetching transactions:", error.response ? error.response.data : error);
    res.status(500).send("Error fetching transactions");
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
