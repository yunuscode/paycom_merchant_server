const base64 = require("base-64");

module.exports = function AuthMiddleware(req, res, next) {
	try {
		const token = req.headers.authorization;

		if (!token) throw new Error("Invalid token");
		const removeBasic = token.replace("Basic ", "");
		const data = base64.decode(removeBasic);

		if (!data.includes(process.env.KEY)) throw new Error("Invalid token");

		next();
	} catch (error) {
		res.status(200).json({
			error: {
				code: -32504,
				message: {
					ru: "Authorization invalid",
					uz: "Authorization invalid",
					en: "Authorization invalid",
				},
			},
		});
		return;
	}
};
