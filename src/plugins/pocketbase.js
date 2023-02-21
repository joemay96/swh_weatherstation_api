require("dotenv").config();

const PocketBase = require("pocketbase/cjs");
require("cross-fetch/polyfill");

const POCKETBASE_URL = process.env.POCKETBASE_URL || "http://127.0.0.1:8090";

const authenticate = async () => {
	try {
		const authData = await Client.collection("users").authWithPassword(
			"weatherstation" || process.env.USERNAME,
			process.env.PASSWORD,
		);
	} catch (err) {
		console.log(err);
	}
};

const Client = new PocketBase(POCKETBASE_URL);
authenticate();

module.exports = Client;
