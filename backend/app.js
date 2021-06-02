require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

// adding cors to the backend
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

// this 2 will help to get request body.. json as well as url params.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// redirecting routes to the payment routes
app.use("/api/payment", require("./routes/payment-route"));

// this will redirect request to the user route.
app.use("/api/user", require("./routes/user-route"));

// run the server after db connected.
mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(80, () => {
        console.log("working!!!!");
      });
    }
  }
);
