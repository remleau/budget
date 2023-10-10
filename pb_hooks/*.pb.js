onRecordAfterAuthWithPasswordRequest((e) => {
	console.log(e.identity);
	console.log(e.password);

	let goals = $http.send({
		url: "http://127.0.0.1:8090/api/collections/goals/records",
		method: "GET",
	});

	let expenses = $http.send({
		url: "http://127.0.0.1:8090/api/collections/expenses/records",
		method: "GET",
	});

	let expenses_id = [];

	expenses?.json?.items?.map((e) => {
		e.goals.length && expenses_id.push(e.goals.toString());
	});

	goals?.json?.items?.map((g) => {
		const formatDate = g.due_date.substring(0, g.due_date.indexOf("."));

		if (![...new Set(expenses_id)].includes(g.id)) {
			const reminder = $http.send({
				url: "http://127.0.0.1:8090/api/collections/reminders/records",
				method: "POST",
				body: JSON.stringify({
					name: g.name + " has no savings.",
					goal_id: g.id,
				}),
				headers: { "content-type": "application/json" },
			});
		}

		if (new Date(formatDate).getTime() < new Date().getTime()) {
			const reminder = $http.send({
				url: "http://127.0.0.1:8090/api/collections/reminders/records",
				method: "POST",
				body: JSON.stringify({
					name: g.name + " is now in the past.",
					goal_id: g.id,
				}),
				headers: { "content-type": "application/json" },
			});
		}
	});
});
