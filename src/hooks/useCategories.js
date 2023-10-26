import { useCallback, useState, useEffect } from "react";
import { useGlobalContext } from "../utils/GlobalProvider";

function useCategories(catId) {
	const { pb } = useGlobalContext();

	const [categorie, setCategorie] = useState(null);
	const [categories, setCategories] = useState(null);

	const [categoriesTotal, setCategoriesTotal] = useState(null);

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

	const getMostUsedCategories = useCallback(async () => {
		const categories = await pb
			.collection("categories")
			.getFullList({ $autoCancel: false });

		const promises = categories?.map(async (c) => {
			const expenses = await pb.collection("expenses").getFullList(
				{
					filter: `categories ?~ "${c.id}"`,
				},
				{ $autoCancel: false }
			);

			let total = expenses?.map((e) => e.price).reduce((a, b) => a + b, 0);

			return { total: total, categorie: c.name };
		});

		Promise.all(promises).then((results) => {
			setCategoriesTotal(results.sort((a, b) => b.total - a.total));
		});
	}, [pb]);

	useEffect(() => {
		getMostUsedCategories();
	}, []);

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
		getMostUsedCategories,
		categoriesTotal,
	};
}

export default useCategories;
