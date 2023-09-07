export function daysToGo(date) {
	return (
		<span>
			{Math.round(
				Math.abs((new Date(date) - new Date()) / (24 * 60 * 60 * 1000))
			)}
		</span>
	);
}

export function convertDate(date) {
	let newDate = new Intl.DateTimeFormat("fr-ca", {
		month: "long",
		day: "numeric",
		year: "numeric",
	}).format(new Date(date));

	return <>{newDate}</>;
}
