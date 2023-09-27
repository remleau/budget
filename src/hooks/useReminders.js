import { useCallback, useState, useEffect } from "react";
import { useGlobalContext } from "../utils/GlobalProvider";

function useReminders() {
	const { pb } = useGlobalContext();

	const [reminders, setReminders] = useState(null);

	const getReminders = useCallback(async () => {
		try {
			const result = await pb.collection("reminders").getFullList(
				{
					sort: "-created",
				},
				{ $autoCancel: false }
			);

			if (result) setReminders(result);
		} catch (error) {
			console.log("Error:", error);
		}
	}, [pb]);

	useEffect(() => {
		getReminders();
	}, []);

	return {
		reminders,
		getReminders,
	};
}

export default useReminders;
