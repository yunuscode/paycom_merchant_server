module.exports = async (sequelize, Sequelize) => {
	return await sequelize.define("payments", {
		payment_id: {
			type: Sequelize.STRING,
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
		payment_perform_time: {
			type: Sequelize.DATE,
			allowNull: true,
		},
		payment_cancel_time: {
			type: Sequelize.DATE,
			allowNull: true,
		},
		payment_reason: {
			type: Sequelize.STRING(),
			allowNull: true,
		},
	});
};
