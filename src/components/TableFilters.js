import { memo, useState, useEffect } from "react";

import { getMonths } from "../utils/fn";

import useExpenses from "../hooks/useExpenses";
import useCurrency from "../hooks/useCurrency";
import { useGlobalContext } from "../utils/GlobalProvider";

function TableFilters({ setExpenses }) {
	const { convertPrice } = useCurrency();
	const { expenses, getExpenses, getExpensesByMonths } = useExpenses();
	const { totalSavings, setTotalSavings, paged } = useGlobalContext();

	const currentDate = new Date();
	const months = getMonths();

	const [month, setMonth] = useState({
		start: new Date().getMonth(),
		end: new Date().getMonth() + 1,
	});

	const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

	const handleYearChange = (event) => {
		const selectedValue = event.target.value;
		setSelectedYear(parseInt(selectedValue));
	};

	const yearOptions = [];

	// Calculate and add the current year and 5 previous years
	for (let i = 5; i >= 0; i--) {
		const year = currentDate.getFullYear() - i;
		yearOptions.push(year);
	}

	// Add the current year and 5 future years
	for (let i = 1; i <= 5; i++) {
		const year = currentDate.getFullYear() + i;
		yearOptions.push(year);
	}

	useEffect(() => {
		if (month.start === 13 || month.end === 13) {
			getExpenses();
		}

		getExpensesByMonths({
			start: new Date(selectedYear, month.start, 1),
			end: new Date(selectedYear, month.end, 0),
			paged: { page: paged.page, nbPerPage: paged.nbPerPage },
		});
	}, [month, selectedYear, paged.page]);

	useEffect(() => {
		setExpenses && setExpenses(expenses);

		setTotalSavings(expenses?.map((e) => e.price).reduce((a, b) => a + b, 0));
	}, [expenses]);

	return (
		setExpenses && (
			<>
				<div>
					<select
						value={month.start + 1}
						onChange={(e) => {
							setMonth({ start: +e.target.value - 1, end: +e.target.value });

							if (e.target.value === "13") {
								setMonth({ start: 13, end: 13 });
							}
						}}
					>
						<option value="13">-- Select Month --</option>
						{months.map((month, index) => (
							<option key={index} value={month.number}>
								{month.name}
							</option>
						))}
					</select>
					<select value={selectedYear} onChange={handleYearChange}>
						{yearOptions.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
				</div>
				<h3>Total: {convertPrice(totalSavings)}</h3>
			</>
		)
	);
}
export default memo(TableFilters);
