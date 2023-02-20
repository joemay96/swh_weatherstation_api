const express = require("express");
const router = express.Router();

// const Client = require("../plugins/pocketbase.js");

router.get("/", (req, res) => {
	res.send("ok");
});

// recive the data from the weather station and save it in a db
router.post("/", (req, res) => {
	res.send("ok");
	//TODO: send data to database client
});

module.exports = router;
