require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json({ extended: true }));

// redirecting routes to the payment routes
app.use("/api/payment", require("./routes/payment-route"));

app.listen(80, () => {
  console.log("working!!!!");
});
