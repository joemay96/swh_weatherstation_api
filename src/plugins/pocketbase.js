require("dotenv").config();

const PocketBase = require("pocketbase/cjs");
require("cross-fetch/polyfill");

// Checking for the correct URL
const POCKETBASE_URL = process.env.POCKETBASE_URL || "http://127.0.0.1:8090";

const authenticate = async () => {
	const authData = await Client.collection("users").authWithPassword(
		"weatherstation",
		"peqrzzDkX5vCP3GQ",
	);
};

const Client = new PocketBase(POCKETBASE_URL);
authenticate();

module.exports = Client;
