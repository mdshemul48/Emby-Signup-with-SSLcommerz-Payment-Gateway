require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const SSLCommerzPayment = require("sslcommerz");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/pay", (req, res) => {
  const { username, email, name, password } = req.body;
  console.log(username, email, name, password);
  const data = {
    total_amount: 100,
    currency: "BDT",
    tran_id: "REF123",
    success_url: process.env.ROOT_API_LINK + "/success",
    fail_url: process.env.ROOT_API_LINK + "/fail",
    cancel_url: process.env.ROOT_API_LINK + "/cancel",
    ipn_url: process.env.ROOT_API_LINK + "/ipn",
    product_name: "emby service.",
    product_category: "digital service",
    product_profile: "general",
    cus_name: name,
    cus_email: email,
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_postcode: "1000",
    shipping_method: "NO",
    cus_phone: "01711111111",
    value_a: username,
    value_b: password,
    value_c: "ref003_C",
    value_d: "ref004_D",
  };
  const sslcommer = new SSLCommerzPayment(
    process.env.SSL_USERNAME,
    process.env.SSL_PASSWORD,
    false
  ); //true for live default false for sandbox
  sslcommer.init(data).then((data) => {
    //process the response that got from sslcommerz
    //https://developer.sslcommerz.com/doc/v4/#returned-parameters
    if (data?.GatewayPageURL) {
      return res.status(200).redirect(data?.GatewayPageURL);
    } else {
      return res.status(400).json({ data });
    }
  });
});
app.post("/success", async (req, res) => {
  console.log(req.body);
  const { valid, risk_title, val_id } = req.body;
});

app.post("/fail", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.post("/cancel", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.post("/ipn", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(80, () => {
  console.log("working!!!!");
});
