const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.PG_URL, {
	logging: console.log,
});

async function db() {
	try {
		await sequelize.authenticate();
	} catch (error) {
		console.log("ERROR:", error);
	}
}

module.exports = db;
