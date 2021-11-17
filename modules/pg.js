const { Sequelize } = require("sequelize");
const PaymentModel = require("../models/PaymentModel");
const Relations = require("../models/Relations");
const UserModel = require("../models/UserModel");

const sequelize = new Sequelize(process.env.PG_URL, {
	logging: console.log,
});

async function pg() {
	try {
		let db = {};

		db.users = await UserModel(sequelize, Sequelize);
		db.payments = await PaymentModel(sequelize, Sequelize);

		await Relations(db);

		return db;
	} catch (error) {
		console.log("ERROR:", error);
	}
}

module.exports = pg;
