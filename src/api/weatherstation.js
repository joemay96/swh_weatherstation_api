const express = require("express");
const router = express.Router();

const Client = require("../plugins/pocketbase.js");

router.get("/", (req, res) => {
	res.send("ok");
});

// recive the data from the weather station and save it in a db
router.post("/", async (req, res) => {
	const pw = req.get("ww");
	if (
		pw === process.env.PW ||
		pw === "secPW123456VerySecureWeatherStationPassword"
	) {
		const data = req.body;

		try {
			const record = await Client.collection("weatherdata").create(data);
			console.log(record);
			res.sendStatus(200);
		} catch (err) {
			console.log(err);
			res.status(400).json({
				status: 400,
				message: "Data not saved in DB",
				error: err,
			});
		}
	} else {
		res.status(400).send("PW not correct");
	}
});

module.exports = router;
