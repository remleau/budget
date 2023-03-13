import React, { memo } from 'react';
import { useGlobalContext } from '../utils/GlobalProvider';

function Avatar() {
	const { user } = useGlobalContext();

	return (
		<div className="avatar">
			<div className="avatar-picture"></div>
			<div className="avatar-content">
				<div className="avatar-name">
					<p>{user.name}</p>
				</div>
				<div className="avatar-cash">
					<p>
						Total cash: {user.monthly_income}$ <sup>{user.currency}</sup>
					</p>
				</div>
			</div>
		</div>
	);
}

export default memo(Avatar);
