module.exports = function ErrorModifierMiddleware(req, res, next) {
	let error = {};

	error.invalidAmount = function (res) {
		res.status(200).json({
			error: {
				code: -31001,
				message: {
					ru: "Недопустимая сумма",
					uz: "Noto'g'ri summa",
					en: "Invalid amount",
				},
			},
		});
	};

	error.invalidAccount = function (res) {
		res.status(200).json({
			error: {
				code: -31050,
				message: {
					ru: "Мы не нашли вашу учетную запись",
					uz: "Biz sizning hisobingizni topolmadik.",
					en: "We couldn't find your account",
				},
				data: "user_id", // you can change it
			},
		});
	};
};
