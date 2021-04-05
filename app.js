require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
var cors = require("cors");

// use it before all route definitions
app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

app.use("/api/users", userRouter);
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
