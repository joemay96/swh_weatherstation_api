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

const formatGraphData = (data) => {
	const timestamps = [];
	const humidities = [];
	const temperatures = [];
	const lightintensities = [];
	const windspeeds = [];

	data.forEach((row) => {
		timestamps.push(row.created);
		humidities.push(row.humidity);
		temperatures.push(row.temperature);
		lightintensities.push(row.lightintensity);
		windspeeds.push(row.windspeed);
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
	const formattedData = formatGraphData(weatherdata);
	res.render("index", {
		data: {
			timestamps: formattedData?.timestamps,
			humidities: formattedData?.humidities,
			temperatures: formattedData?.temperatures,
			lightintensities: formattedData?.lightintensities,
			windspeeds: formattedData?.windspeeds,
		},
	});
});

app.get("/data", async (req, res) => {
	const weatherdata = await requestData();
	res.render("data", {
		weatherdata,
	});
});

app.use("/api/v1", api);
app.use(middleware.notFound);

module.exports = app;
