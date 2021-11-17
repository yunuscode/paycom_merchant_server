require("dotenv").config();

const { Router } = require("express");
const express = require("express");
const AuthMiddleware = require("./middlewares/AuthMiddleware");
const db = require("./modules/pg");
const app = express();

app.listen(process.env.PORT || 80);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(AuthMiddleware);

async function server() {
	const database = await db();

	app.use((req, res, next) => {
		req.db = database;
		next();
	});

	app.use(Router);
}

server();
