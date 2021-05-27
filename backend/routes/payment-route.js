// this will handle all the payment related routes
// and bring them to the controller..

const router = require("express").Router();

const paymentControllers = require("../controllers/payment-controller");
// when routes matched to this routes this controller function will run. then this will handle the rest.
router.post("/", paymentControllers.initalizingPayment);

module.exports = router;
