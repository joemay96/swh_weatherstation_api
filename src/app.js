const express = require("express");
const path = require("path");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const api = require("./api");
const middleware = require("./middleware");

const Client = require("./plugins/pocketbase.js");

require("dotenv").config();

const app = express();

app.set("trust proxy", 1);

app.use(express.static("public"));

//set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");
app.use(expressLayouts);

app.use(morgan("dev"));
app.use(express.json());

const requestData = async () => {
	return await Client.collection("weatherdata").getFullList(200, {
		sort: "-created",
	});
};

const formatData = (data) => {
	const timestamps = [];
	const humidities = [];
	const temperatures = [];
	const lightintensities = [];
	const windspeeds = [];

	data.forEach((row) => {
		timestamps.puhs(row.created);
		humidities.puhs(row.humidity);
		temperatures.puhs(row.temperature);
		lightintensities.puhs(row.lightintensity);
		windspeeds.puhs(row.windspeed);
	});

	return {
		timestamps,
		humidities,
		temperatures,
		lightintensities,
		windspeeds,
	};
};

// The main route, where all the data is shown
app.get("/", async (req, res) => {
	const weatherdata = await requestData();
	const formattedData = formatData(weatherdata);
	res.render("index", {
		data: {
			timestamp: formattedData?.timestamps,
			humidity: formattedData?.humidities,
			temperature: formattedData?.temperatures,
			lightintensity: formattedData?.lightintensities,
			windspeed: formattedData?.windspeeds,
		},
	});
});

app.get("/data", async (req, res) => {
	const weatherdata = await requestData();
	console.log(weatherdata);
	res.render("data", {
		data: {
			timestamp: weatherdata[0]?.created,
			humidity: weatherdata[0]?.humidity,
			temperature: weatherdata[0]?.temperature,
			lightintensity: weatherdata[0]?.lightintensity,
			windspeed: weatherdata[0]?.windspeed,
			windspeed_cum: weatherdata[0]?.windspeed_cum,
		},
	});
});

app.use("/api/v1", api);
app.use(middleware.notFound);

module.exports = app;
