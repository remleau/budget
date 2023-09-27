onRecordAfterAuthWithPasswordRequest((e) => {
	console.log(e.identity);
	console.log(e.password);

	let goals = $http.send({
		url: "http://127.0.0.1:8090/api/collections/goals/records",
		method: "GET",
	});

	//let reminders = $http.send({
	//	url: "http://127.0.0.1:8090/api/collections/reminders/records",
	//	method: "GET",
	//});

	//console.log(JSON.stringify(goals?.json?.items));
	//console.log(JSON.stringify(reminders?.json?.items));

	goals?.json?.items?.map((g) => {
		const formatDate = g.due_date.substring(0, g.due_date.indexOf("."));

		if (new Date(formatDate).getTime() < new Date().getTime()) {
			const reminder = $http.send({
				url: "http://127.0.0.1:8090/api/collections/reminders/records",
				method: "POST",
				body: JSON.stringify({
					name: g.name + " is now past, archive it?",
					goal_id: g.id,
				}),
				headers: { "content-type": "application/json" },
			});
		}
	});
});
