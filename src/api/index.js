const express = require("express");
const router = express.Router();

const weatherstation = require("./weatherstation");

router.get("/", (req, res) => {
	res.json({
		message: "Weather Station API",
	});
});

router.use("/weather", weatherstation);

module.exports = router;
