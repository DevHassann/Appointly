const express = require("express");
const Errors = require("./Utils/Error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

// const checkOrigin = (req, res, next) => {
//   const allowedOrigins = ["http://localhost:3000"];
//   const origin = req.get("origin");

//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   } else {
//     return res
//       .status(403)
//       .json({
//         error:
//           "Unauthorized!! Please Stay In your limits and Request only from the APP",
//       });
//   }
// };

// app.use(checkOrigin);

app.use(
  cors({
    origin: "https://appointly-mu.vercel.app",
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.json());
app.use(cookieParser());
app.use("/test", (req, res) => {
  res.send("Hello world!");
});

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "Configurations/.env",
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
