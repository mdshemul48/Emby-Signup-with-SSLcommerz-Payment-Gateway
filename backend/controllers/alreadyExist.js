const User = require("../models/user");

const alreadyExist = async (req, res) => {
  // getting username from the request
  const { username } = req.body;
  console.log(username);
  // checking if user already exist in the db or not.
  let userExist;
  try {
    userExist = await User.findOne({ username });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      successful: false,
      message: "something wrong with the server. ",
    });
  }
  // if username found in db return true else false
  if (userExist) {
    return res.json({
      successful: true,
      message: "username already exist.",
      found: true,
    });
  }

  return res.json({
    successful: true,
    message: "username didn't exist.",
    found: false,
  });
};

module.exports = alreadyExist;
