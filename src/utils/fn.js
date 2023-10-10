export function daysToGo(date) {
	return (
		<>
			<span>
				{Math.round(
					Math.abs((new Date(date) - new Date()) / (24 * 60 * 60 * 1000))
				)}
			</span>
		</>
	);
}

export function convertDate(date) {
	let newDate = date
		? new Intl.DateTimeFormat("fr-ca", {
				month: "long",
				day: "numeric",
				year: "numeric",
		  }).format(new Date(date))
		: null;

	return <>{newDate}</>;
}

export function getMonths() {
	const monthData = [];
	for (let month = 0; month < 12; month++) {
		const monthName = new Date(0, month - 1).toLocaleString("default", {
			month: "long",
		});
		monthData.push({
			name: monthName.charAt(0).toUpperCase() + monthName.slice(1),
			number: month,
		});
	}
	return monthData;
}
