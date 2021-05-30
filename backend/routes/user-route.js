const router = require("express").Router();

const alreadyExist = require("../controllers/alreadyExist");
router.get("/username", alreadyExist);

module.exports = router;
