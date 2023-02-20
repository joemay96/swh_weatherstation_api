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

app.use(express.static("poublic"));

//set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");
app.use(expressLayouts);

app.use(morgan("dev"));
app.use(express.json());

// The main route, where all the data is shown
app.get("/", async (req, res) => {
	const weatherdata = await Client.records.getFullList("weatherdata", 200, {
		sort: "-created",
	});

	res.render("index", {
		message: "weatherdata",
	});
});

app.use("/api/v1", api);
app.use(middleware.notFound);

module.exports = app;
