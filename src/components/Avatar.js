import React, { memo } from "react";
import { useGlobalContext } from "../utils/GlobalProvider";
import useCurrency from "../hooks/useCurrency";

function Avatar() {
	const { user, totalSavings } = useGlobalContext();
	const { convertPrice } = useCurrency();

	return (
		<div className="avatar">
			<div className="avatar-picture"></div>
			<div className="avatar-content">
				<div className="avatar-name">
					<p>{user.name}</p>
				</div>
				<div className="avatar-cash">
					<p>
						Savings of this month:{" "}
						{convertPrice(user.monthly_income - totalSavings)}
					</p>
				</div>
			</div>
		</div>
	);
}

export default memo(Avatar);
