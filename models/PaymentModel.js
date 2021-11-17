module.exports = async (sequelize, Sequelize) => {
	return await sequelize.define("payments", {
		payment_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		payment_state: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 1,
		},
		payment_amount: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	});
};
