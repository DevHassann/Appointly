const express = require("express");
const Errors = require("./Utils/Error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "https://appointly-seven.vercel.app",
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(`Request received at ${req.url}`);
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());
app.use(cookieParser());
app.use("/test", (req, res) => {
  res.send("Hello world!");
});

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "/Configurations/.env",
  });
}

// import routes
const user = require("./Controllers/user");
const seller = require("./Controllers/seller");
const order = require("./Controllers/order");
const meeting = require("./Controllers/meeting");

app.use("/api/v2/user", user);
app.use("/api/v2/seller", seller);
app.use("/api/v2/order", order);
app.use("/api/v2/meeting", meeting.router);

// it's for ErrorHandling
app.use(Errors);

module.exports = app;
