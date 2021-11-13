const express = require("express");
const AuthMiddleware = require("./middlewares/AuthMiddleware");
const app = express();

app.listen(80);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(AuthMiddleware);

app.post("/", function (req, res) {
	// if (req.body.method == "CheckPerformTransaction") {
	checkPerformTransaction(req.body, req, res);
	// }
});

function checkPerformTransaction(data, req, res) {
	console.log(data);

	res.status(200).json({
		error: {
			code: -31050,
			message: {
				ru: "Номер телефона не найден",
				uz: "Raqam ro'yhatda yo'q",
				en: "Phone number not found",
			},
			data: "user_id",
		},
		id: data.id,
	});
}
