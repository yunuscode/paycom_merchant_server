module.exports = class HomeController {
	static async HomePostController(req, res) {
		try {
			switch (req.body.method) {
				case "CheckPerformTransaction":
					HomeController.CheckPerformTransaction(req, res);
					break;

				case "CreateTransaction":
					HomeController.CreateTransaction(req, res);
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

		res.error.invalidAmount(res);

		// res.json({
		// 	result: {
		// 		allow: true,
		// 	},
		// });
	}

	static async CreateTransaction(req, res) {
		/**
		 * Logic
		 * Error codes: -31001 - Invalid amount; -31050 others
		 */

		res.error.invalidAmount(res);

		// res.json({
		// 	result: {
		// 		allow: true,
		// 	},
		// });
	}
};
