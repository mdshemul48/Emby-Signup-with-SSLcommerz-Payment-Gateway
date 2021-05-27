const SSLCommerzPayment = require("sslcommerz");

const initalizingPayment = (req, res) => {
  //
  // this will create a payment and send that link (GatewayPageURL) to frontend.
  // then frontend will process that user for payment
  //

  // getting all the data of user.
  const { username, email, name, password, number } = req.body;

  // creating invoice of payment.
  const data = {
    total_amount: process.env.PRODUCT_PRICE,
    currency: "BDT",
    tran_id: "REF123",
    success_url: process.env.ROOT_API_LINK + "/api/payment/success",
    fail_url: process.env.ROOT_API_LINK + "/fail",
    cancel_url: process.env.ROOT_API_LINK + "/cancel",
    ipn_url: process.env.ROOT_API_LINK + "/ipn",
    product_name: "emby service.",
    product_category: "digital service",
    product_profile: "general",
    cus_name: name,
    cus_email: email,
    cus_add1: "NO",
    cus_city: "NO",
    cus_postcode: "NO",
    shipping_method: "NO",
    cus_phone: number,
    value_a: username,
    value_b: password,
    value_c: "ref003_C",
    value_d: "ref004_D",
  };

  // initalizing SSLCommerz payment geteway
  const sslcommer = new SSLCommerzPayment(
    process.env.SSL_USERNAME,
    process.env.SSL_PASSWORD,
    false
  ); //true for live default false for sandbox

  sslcommer.init(data).then((data) => {
    //process the response that got from sslcommerz
    //https://developer.sslcommerz.com/doc/v4/#returned-parameters
    if (data?.GatewayPageURL) {
      return res
        .status(200)
        .json({ successful: true, link: data?.GatewayPageURL });
    } else {
      return res.status(400).json({
        successful: false,
        message:
          "something wrong with the payment. try again or contact to the administrator.",
      });
    }
  });
};

module.exports = initalizingPayment;
