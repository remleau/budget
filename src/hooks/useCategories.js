import { useMemo, useCallback, useState, useEffect } from "react";
import { useGlobalContext } from "../utils/GlobalProvider";

function useCategories() {
	const { pb } = useGlobalContext();

	const [categories, setCategories] = useState(null);

	const addCategorie = useCallback(async (values) => {
		try {
			const result = await pb.collection("categories").create({
				...values,
			});

			// update state of categories

			return result;
		} catch (error) {
			console.log("Error:", error);
		}
	}, []);

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
	}, []);

	useEffect(() => {
		getCategories();
	}, []);

	return useMemo(() => {
		return { addCategorie, getCategories, categories };
	}, [categories]);
}

export default useCategories;
