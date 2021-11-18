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

				case "CheckTransaction":
					HomeController.CheckTransaction(req, res);
					break;

				case "PerformTransaction":
					HomeController.PerformTransaction(req, res);
					break;

				case "CancelTransaction":
					HomeController.CancelTransaction(req, res);
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
         * If you want to send error about invalid amount 
		    res.error.invalidAmount(res);
         * If you want to send error about invalid account
            res.error.invalidAccount(res);
         */

		res.json({
			result: {
				allow: true,
			},
		});
	}

	static async CreateTransaction(req, res) {
		try {
			/**
         * If you want to send error about invalid amount 
		    res.error.invalidAmount(res);
         * If you want to send error about invalid account
            res.error.invalidAccount(res);
         */

			const user = await req.db.users.findOne({
				where: {
					user_phone: req.body.params.account.user_id,
				},
			});

			if (!user) {
				res.error.invalidAccount(res);
				return;
			}

			let payment = await req.db.payments.findOne({
				where: {
					payment_id: req.body.params.id,
				},
			});

			if (!payment) {
				payment = await req.db.payments.create({
					payment_id: req.body.params.id,
					payment_state: req.body.params.state,
					payment_amount: req.body.params.amount,
					user_id: user.dataValues.user_id,
				});
			}

			res.json({
				result: {
					create_time: new Date(
						payment.dataValues.createdAt
					).getTime(),
					transaction: payment.dataValues.payment_id,
					state: payment.dataValues.payment_state,
				},
			});
		} catch (error) {
			res.error.cantDoOperation(res);
		}
	}

	static async CheckTransaction(req, res) {
		/**
         * If you want to send error about invalid transaction id 
		    res.error.transactionNotFound(res);
         */

		const payment = await req.db.payments.findOne({
			where: {
				payment_id: req.body.params.id,
			},
		});

		if (!payment) {
			res.error.transactionNotFound(res);
			return;
		}

		res.send({
			result: {
				create_time: new Date(payment.dataValues.createdAt).getTime(),
				perform_time: payment.dataValues.payment_perform_time
					? new Date(
							payment.dataValues.payment_perform_time
					  ).getTime()
					: 0,
				cancel_time: payment.dataValues.payment_cancel_time
					? new Date(payment.dataValues.payment_cancel_time).getTime()
					: 0,
				transaction: payment.dataValues.payment_id,
				state: payment.dataValues.payment_state,
				reason: payment.dataValues.payment_reason,
			},
		});
	}

	static async PerformTransaction(req, res) {
		const payment = await req.db.payments.findOne({
			where: {
				payment_id: req.body.params.id,
			},
			include: req.db.users,
		});

		if (!payment) {
			res.error.transactionNotFound(res);
			return;
		}

		if (payment.dataValues.payment_state == 2) {
			res.json({
				result: {
					transaction: payment.dataValues.payment_id,
					perform_time: new Date(
						payment.dataValues.payment_perform_time
					).getTime(),
					state: payment.dataValues.payment_state,
				},
			});
		}

		if (payment.dataValues.payment_state == 1) {
			let x = await req.db.users.increment("user_balance", {
				by: payment.dataValues.payment_amount,
				where: {
					user_id: payment.dataValues.user.dataValues.user_id,
				},
			});
			const date = Date.now();

			await req.db.payments.update(
				{
					payment_state: 2,
					payment_perform_time: date,
				},
				{
					where: {
						payment_id: payment.dataValues.payment_id,
					},
				}
			);
			res.json({
				result: {
					transaction: payment.dataValues.payment_id,
					perform_time: date,
					state: 2,
				},
			});
		}
	}

	static async CancelTransaction(req, res) {
		const payment = await req.db.payments.findOne({
			where: {
				payment_id: req.body.params.id,
			},
			include: req.db.users,
		});

		if (!payment) {
			res.error.transactionNotFound(res);
			return;
		}

		if (payment.dataValues.payment_state == 1) {
			const time = Date.now();

			await req.db.payments.update(
				{
					payment_state: -1,
					payment_cancel_time: time,
					payment_reason: req.body.params.reason,
				},
				{
					where: {
						payment_id: payment.dataValues.payment_id,
					},
				}
			);

			res.json({
				result: {
					state: -1,
					cancel_time: time,
					transaction: payment.dataValues.payment_id,
				},
			});

			return;
		} else if (payment.dataValues.payment_state == 2) {
			if (
				payment.dataValues.user.dataValues.user_balance >
				payment.dataValues.payment_amount
			) {
				await req.db.users.update(
					{
						user_balance: -payment.dataValues.payment_amount,
					},
					{
						where: {
							user_id: payment.dataValues.user.dataValues.user_id,
						},
					}
				);

				await req.db.payments.update(
					{
						payment_state: -2,
						payment_cancel_time: Date.now(),
						payment_reason: req.body.reason,
					},
					{
						where: {
							payment_id: payment.dataValues.payment_id,
						},
					}
				);

				res.json({
					result: {
						state: -2,
						cancel_time: Date.now(),
						transaction: payment.dataValues.payment_id,
					},
				});

				return;
			} else {
				res.error.alreadyDone(res);
				return;
			}
		} else {
			res.json({
				result: {
					state: payment.dataValues.payment_state,
					cancel_time: new Date(
						payment.dataValues.payment_cancel_time
					).getTime(),
					transaction: payment.dataValues.payment_id,
				},
			});
		}
	}
};
