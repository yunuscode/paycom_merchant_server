require("dotenv").config();

const express = require("express");
const db = require("./modules/pg");
const app = express();

app.listen(process.env.PORT || 80);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function server() {
	const database = await db();
}

server();
