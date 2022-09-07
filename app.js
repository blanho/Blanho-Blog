// Structure Setup
const express = require("express");
const morgan = require("morgan");
const app = express();
require("express-async-errors");
require("dotenv").config();
const connectDB = require("./db/connection");
const authRouter = require("./routes/authRoutes");
const ErrorHandling = require("./middleware/errors");
const NotFound = require("./middleware/404");

// Essential Middleware
app.use(express.json());

// Custom Middleware
app.use("/api/v1/auth", authRouter);

// Error Handling
app.use(NotFound);
app.use(ErrorHandling);

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
