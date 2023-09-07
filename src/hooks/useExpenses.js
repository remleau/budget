import { useCallback, useState, useEffect } from "react";
import { useGlobalContext } from "../utils/GlobalProvider";

function useExpenses(props = { expenseId: 0, orderBy: "date" }) {
	const { pb } = useGlobalContext();

	const [expense, setExpense] = useState(null);
	const [expenses, setExpenses] = useState(null);

	const addExpense = useCallback(
		async (values) => {
			try {
				const result = await pb.collection("expenses").create({
					...values,
				});

				// update state of expenses

				return result;
			} catch (error) {
				console.log("Error:", error);
			}
		},
		[pb]
	);

	const deleteExpense = useCallback(
		async (id) => {
			try {
				const result = await pb.collection("expenses").delete(id);

				// update state of categories

				return result;
			} catch (error) {
				console.log("Error:", error);
			}
		},
		[pb]
	);

	const updateExpense = useCallback(
		async (id, values) => {
			try {
				const result = await pb
					.collection("expenses")
					.update(id, { ...values });

				// update state of categories

				return result;
			} catch (error) {
				console.log("Error:", error);
			}
		},
		[pb]
	);

	const getExpenses = useCallback(async () => {
		try {
			const result = await pb.collection("expenses").getFullList(
				{
					sort: "-created",
					expand: "categories",
				},
				{ $autoCancel: false }
			);

			if (result) {
				if (props.sortBy == "date") {
					result.sort(function (a, b) {
						// Turn your strings into dates, and then subtract them
						// to get a value that is either negative, positive, or zero.
						return new Date(b.created) - new Date(a.created);
					});
				}

				setExpenses(result.reverse());
			}
		} catch (error) {
			console.log("Error:", error);
		}
	}, [pb]);

	const getExpense = useCallback(
		async (expenseId) => {
			try {
				const result = await pb.collection("expenses").getFullList(
					{
						filter: `id ?~ "${expenseId}"`,
						expand: "categories",
						sort: "-created",
					},
					{ $autoCancel: false }
				);

				if (result) setExpense(result.at(0));
			} catch (error) {
				console.log("Error:", error);
			}
		},
		[pb]
	);

	const getExpensesByCategories = useCallback(
		async (categories) => {
			try {
				const result = await pb.collection("expenses").getFullList({
					filter: `categories ?~ "${categories}"`,
				});

				if (result) {
					setExpenses(result);
				}
			} catch (error) {
				console.log("Error:", error);
			}
		},
		[pb]
	);

	const getExpensesByGoals = useCallback(
		async (goals) => {
			try {
				const result = await pb.collection("expenses").getFullList({
					filter: `goals ?~ "${goals}"`,
				});

				if (result) {
					setExpenses(result);
				}
			} catch (error) {
				console.log("Error:", error);
			}
		},
		[pb]
	);

	useEffect(() => {
		if (props.expenseId) getExpense(props.expenseId);
	}, [getExpenses]);

	return {
		addExpense,
		updateExpense,
		getExpenses,
		deleteExpense,
		getExpensesByCategories,
		getExpensesByGoals,
		expenses,
		expense,
		getExpense,
	};
}

export default useExpenses;
