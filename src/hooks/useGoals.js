import { useCallback, useState, useEffect } from "react";
import { useGlobalContext } from "../utils/GlobalProvider";

function useGoals() {
	const { pb } = useGlobalContext();

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

			if (result) setGoals(result);
		} catch (error) {
			console.log("Error:", error);
		}
	}, [pb]);

	const getGoalsByCategories = useCallback(
		async (categories) => {
			try {
				const result = await pb.collection("goals").getFullList({
					filter: `categories ?~ "${categories}"`,
				});

				if (result.length) {
					return result;
				}
			} catch (error) {
				console.log("Error:", error);
			}
		},
		[pb]
	);

	useEffect(() => {
		getGoals();
	}, [getGoals]);

	return {
		addGoal,
		updateGoal,
		getGoals,
		deleteGoal,
		getGoalsByCategories,
		goals,
	};
}

export default useGoals;
