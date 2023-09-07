import { useCallback, useState, useEffect } from "react";
import { useGlobalContext } from "../utils/GlobalProvider";

function useGoals(props = { goalId: 0, orderBy: "date" }) {
	const { pb } = useGlobalContext();

	const [goal, setGoal] = useState(null);
	const [goals, setGoals] = useState(null);

	const addGoal = useCallback(
		async (values) => {
			try {
				const result = await pb.collection("goals").create({
					...values,
				});

				// update state of categories

				return result;
			} catch (error) {
				console.log("Error:", error);
			}
		},
		[pb]
	);

	const deleteGoal = useCallback(
		async (id) => {
			try {
				const result = await pb.collection("goals").delete(id);

				// update state of categories

				return result;
			} catch (error) {
				console.log("Error:", error);
			}
		},
		[pb]
	);

	const updateGoal = useCallback(
		async (id, values) => {
			try {
				const result = await pb.collection("goals").update(id, { ...values });

				// update state of categories

				return result;
			} catch (error) {
				console.log("Error:", error);
			}
		},
		[pb]
	);

	const getGoals = useCallback(async () => {
		try {
			const result = await pb.collection("goals").getFullList(
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
						return new Date(b.due_date) - new Date(a.due_date);
					});
				}

				setGoals(result.reverse());
			}
		} catch (error) {
			console.log("Error:", error);
		}
	}, [pb]);

	const getGoal = useCallback(
		async (goalId) => {
			try {
				const result = await pb.collection("goals").getFullList(
					{
						filter: `id ?~ "${goalId}"`,
						expand: "categories",
						sort: "-created",
					},
					{ $autoCancel: false }
				);

				if (result) setGoal(result.at(0));
			} catch (error) {
				console.log("Error:", error);
			}
		},
		[pb]
	);

	const getGoalsByCategories = useCallback(
		async (categories) => {
			try {
				const result = await pb.collection("goals").getFullList({
					filter: `categories ?~ "${categories}"`,
				});

				if (result) {
					setGoals(result);
				}
			} catch (error) {
				console.log("Error:", error);
			}
		},
		[pb]
	);

	useEffect(() => {
		if (props.goalId) getGoal(props.goalId);
	}, []);

	return {
		addGoal,
		updateGoal,
		getGoals,
		deleteGoal,
		getGoalsByCategories,
		goals,
		goal,
		getGoal,
	};
}

export default useGoals;
