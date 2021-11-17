const { Sequelize } = require("sequelize");
const PaymentModel = require("../models/PaymentModel");
const Relations = require("../models/Relations");
const UserModel = require("../models/UserModel");

const sequelize = new Sequelize(process.env.PG_URL, {
	logging: false,
});

async function pg() {
	try {
		let db = {};

		db.users = await UserModel(sequelize, Sequelize);
		db.payments = await PaymentModel(sequelize, Sequelize);

		await Relations(db);

		await sequelize.sync({ force: true });

		await db.users.create({
			user_phone: "998901515064",
		});

		return db;
	} catch (error) {
		console.log("ERROR:", error);
	}
}

module.exports = pg;
