module.exports = async (sequelize, Sequelize) => {
	return await sequelize.define("users", {
		user_id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4(),
			primaryKey: true,
		},
		user_phone: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});
};
