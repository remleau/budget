export function daysToGo(date) {
	return (
		<span>
			{Math.round(
				Math.abs((new Date(date) - new Date()) / (24 * 60 * 60 * 1000))
			)}
		</span>
	);
}
