module.exports = class HomeController {
	static async HomePostController(req, res) {
		try {
			switch (req.body.method) {
				case "CheckPerformTransaction":
					HomeController.CheckPerformTransaction(req, res);
					break;

				default:
					break;
			}
		} catch (error) {
			console.log(error);
		}
	}

	static async CheckPerformTransaction(req, res) {
		/**
		 * Logic
		 * Error codes: -31001 - Invalid amount; -31050 others
		 */

		let error = true;

		if (error) {
			res.status(200).json({
				error: {
					code: -31050,
					message: {
						ru: "Authorization invalid",
						uz: "Authorization invalid",
						en: "Authorization invalid",
					},
					data: "user_id",
				},
			});
		} else {
			res.json({
				result: {
					allow: true,
				},
			});
		}
	}
};
