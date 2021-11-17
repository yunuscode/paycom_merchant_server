require("dotenv").config();

const express = require("express");
const AuthMiddleware = require("./middlewares/AuthMiddleware");
const ErrorModifierMiddleware = require("./middlewares/ErrorModifierMiddleware");
const db = require("./modules/pg");
const Router = require("./routes");
const app = express();

app.listen(process.env.PORT || 80);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(AuthMiddleware);
app.use(ErrorModifierMiddleware);

async function server() {
	const database = await db();

	app.use((req, res, next) => {
		req.db = database;
		next();
	});

	app.use("/", Router);
}

server();
