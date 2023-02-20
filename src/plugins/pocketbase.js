require("dotenv").config();

const PocketBase = require("pocketbase/cjs");
// needed by PocketBase with older versions of Node

// TODO: import these for realtime
// require('cross-fetch/polyfill');
// global.EventSource = require('eventsource');

// Checking for the correct URL
const POCKETBASE_URL = process.env.POCKETBASE_URL || "http://127.0.0.1:8090";
const userData = await pb
	.collection("users")
	.authWithPassword(
		process.env.USERNAME || "weatherstation",
		process.env.PASSWORD || "peqrzzDkX5vCP3GQ",
	);

const Client = new PocketBase(POCKETBASE_URL);

module.exports = Client;
