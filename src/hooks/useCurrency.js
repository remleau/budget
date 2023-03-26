import { useCallback } from "react";
import { useGlobalContext } from "../utils/GlobalProvider";

function useCurrency() {
	const { currency, user } = useGlobalContext();

	const convertPrice = useCallback(
		(price) => {
			return (
				<>
					{(price * currency).toFixed(2)}
					<sup>{user.prefered_currency}</sup>
				</>
			);
		},
		[currency]
	);

	return {
		convertPrice,
	};
}

export default useCurrency;
