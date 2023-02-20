const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("ok");
});

// recive the data from the weather station and save it in a db
router.post("/", (req, res) => {
	res.send("ok");
});

module.exports = router;
