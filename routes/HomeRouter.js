const HomeController = require("../controllers/HomeController");

const HomeRouter = require("express").Router();

HomeRouter.post("/", HomeController.HomePostController);

module.exports = HomeRouter;
