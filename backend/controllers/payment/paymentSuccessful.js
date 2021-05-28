const SSLCommerzPayment = require("sslcommerz");

const paymentSuccessful = async (req, res) => {
  console.log(req.body);
  const {
    status,
    value_a: username,
    value_b: password,
    value_c: email,
    value_d: name,
  } = req.body;

  if (!status === "valid") {
    return res
      .status(402)
      .send("payment not valid. please try again or contact to admin.");
  }
  const createEmbyUser = fetch("");

  res.send("hello world");
};
module.exports = paymentSuccessful;
