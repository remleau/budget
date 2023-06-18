import { useCallback, useState, useEffect } from "react";
import { useGlobalContext } from "../utils/GlobalProvider";

function useCategories(catId) {
	const { pb } = useGlobalContext();

	const [categorie, setCategorie] = useState(null);
	const [categories, setCategories] = useState(null);

	const addCategorie = useCallback(
		async (values) => {
			try {
				const result = await pb.collection("categories").create({
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

	const deleteCategorie = useCallback(
		async (id) => {
			try {
				const result = await pb.collection("categories").delete(id);

				// update state of categories

				return result;
			} catch (error) {
				console.log("Error:", error);
			}
		},
		[pb]
	);

	const updateCategorie = useCallback(
		async (id, values) => {
			try {
				const result = await pb
					.collection("categories")
					.update(id, { ...values });

				// update state of categories

				return result;
			} catch (error) {
				console.log("Error:", error);
			}
		},
		[pb]
	);

	const getCategories = useCallback(async () => {
		try {
			const result = await pb.collection("categories").getFullList(
				{
					sort: "-created",
				},
				{ $autoCancel: false }
			);

			if (result) setCategories(result);
		} catch (error) {
			console.log("Error:", error);
		}
	}, [pb]);

	const getCategorie = useCallback(
		async (catId) => {
			try {
				const result = await pb.collection("categories").getFullList(
					{
						filter: `id ?~ "${catId}"`,
						sort: "-created",
					},
					{ $autoCancel: false }
				);

				if (result) setCategorie(result.at(0));
			} catch (error) {
				console.log("Error:", error);
			}
		},
		[pb]
	);

	useEffect(() => {
		getCategories();

		if (catId) getCategorie(catId);
	}, [getCategories]);

	return {
		addCategorie,
		updateCategorie,
		getCategories,
		deleteCategorie,
		categories,
		categorie,
		getCategorie,
	};
}

export default useCategories;
