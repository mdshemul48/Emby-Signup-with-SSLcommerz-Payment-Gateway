const Emby = require("../../util/emby");

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

  const emby = new Emby(process.env.EMBY_URL, process.env.EMBY_API_KEY);

  try {
    const id = await emby.createUser(username, password);
    console.log(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      successful: false,
      message: "something wrong with the server or maybe id already exist.",
    });
  }

  res.redirect(process.env.EMBY_URL);
};
module.exports = paymentSuccessful;
