// Structure Setup
const express = require("express");
const morgan = require("morgan");
const app = express();
const fileUpload = require("express-fileupload");
require("express-async-errors");
require("dotenv").config();
const connectDB = require("./db/connection");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes");

const ErrorHandling = require("./middleware/errors");
const NotFound = require("./middleware/404");
const cookieParser = require("cookie-parser");

// Essential Middleware
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET_KEY));
app.use(fileUpload());
app.use(express.static("./public"));

// Custom Middleware
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);

// Error Handling
app.use(ErrorHandling);
app.use(NotFound);

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
