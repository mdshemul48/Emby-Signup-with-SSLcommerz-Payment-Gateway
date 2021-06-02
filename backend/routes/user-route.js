const router = require("express").Router();

const alreadyExist = require("../controllers/alreadyExist");
router.post("/username", alreadyExist);

module.exports = router;
