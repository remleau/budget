import { useMemo, useCallback, useState, useEffect } from "react";
import { useGlobalContext } from "../utils/GlobalProvider";

function useCurrency() {
	const { currency } = useGlobalContext();

	const convertPrice = useCallback(
		(price) => {
			return (price * currency).toFixed(2);
		},
		[currency]
	);

	return {
		convertPrice,
	};
}

export default useCurrency;
