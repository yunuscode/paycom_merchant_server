const HomeRouter = require("./HomeRouter");

const Router = require("express").Router();

Router.use("/", HomeRouter);

module.exports = Router;
