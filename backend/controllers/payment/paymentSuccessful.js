const User = require("../../models/user");
const Emby = require("../../util/emby");

const paymentSuccessful = async (req, res) => {
  // getting all info from the request
  const {
    status,
    value_a: username,
    value_b: password,
    value_c: email,
    value_d: name,
  } = req.body;

  // checking if payment is valid or not.
  if (!status === "valid") {
    return res
      .status(402)
      .send("payment not valid. please try again or contact to admin.");
  }

  // creating user to emby server and getting user id.
  const emby = new Emby(process.env.EMBY_URL, process.env.EMBY_API_KEY);
  let embyCreatedId;

  try {
    embyCreatedId = await emby.createUser(username, password);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      successful: false,
      message: "something wrong with the server or maybe id already exist.",
    });
  }

  // creating user and saving to the database.
  const createdUser = new User({
    name,
    username,
    email,
    embyId: embyCreatedId.userId,
  });

  try {
    await createdUser.save();
  } catch (err) {
    return res.status(500).json({
      successful: false,
      message: "user not created please contact to administrator.",
    });
  }

  res.redirect(process.env.SUCCESSFUL_PAGE);
};

module.exports = paymentSuccessful;
