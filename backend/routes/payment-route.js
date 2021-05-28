// this will handle all the payment related routes
// and bring them to the controller..
const router = require("express").Router();

// when routes matched to this routes this controller function will run. then this will handle the rest.
router.post("/", require("../controllers/payment/initalizingPayment"));

//  this will handle successful request and create user.
router.post("/success", require("../controllers/payment/paymentSuccessful"));

module.exports = router;
