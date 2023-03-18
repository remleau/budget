import React, { memo } from "react";
import { useGlobalContext } from "../utils/GlobalProvider";
import useCurrency from "../hooks/useCurrency";

function Avatar() {
	const { user } = useGlobalContext();
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
						Total cash: {convertPrice(user.monthly_income)}
						<sup> {user.prefered_currency}</sup>
					</p>
				</div>
			</div>
		</div>
	);
}

export default memo(Avatar);
