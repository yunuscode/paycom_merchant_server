module.exports = async (db) => {
	await db.users.hasMany(db.payments, {
		foreignKey: {
			name: "user_id",
			allowNull: false,
		},
	});

	await db.payments.belongsTo(db.users, {
		foreignKey: {
			name: "user_id",
			allowNull: false,
		},
	});
};
