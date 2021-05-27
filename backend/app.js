require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// this 2 will help to get request body.. json as well as url params.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// redirecting routes to the payment routes
app.use("/api/payment", require("./routes/payment-route"));

app.listen(80, () => {
  console.log("working!!!!");
});
