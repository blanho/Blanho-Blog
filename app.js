// Middleware Structure Setup
const express = require("express");
const morgan = require("morgan");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connection");
app.use(morgan());
app.use(express.json());

const port = 5000 || process.env.PORT;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
