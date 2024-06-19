const express = require("express");
require('dotenv').config()
const cors = require("cors");
const users = require("./routes/users");

const db = require("./db/connection")

const PORT = process.env.PORT || 5050;
const app = express();
db()
app.use(cors());
app.use(express.json());
app.use("/api/users", users);


// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});