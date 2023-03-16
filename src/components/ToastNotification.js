import React, { memo, useEffect, useState } from "react";

import DynamicIcon from "./DynamicIcon";
import useNotifications from "../hooks/useNotifications";

const stayOnScreen = 5 * 1000;

function ToastNotification() {
	const notifications = useNotifications();
	const [showNotification, setShowNotification] = useState(true);

	useEffect(() => {
		setShowNotification(true);

		if (notifications) {
			const to = setTimeout(() => {
				setShowNotification(false);
			}, stayOnScreen);

			return () => {
				clearTimeout(to);
			};
		}
	}, [notifications]);

	return (
		notifications && (
			<div
				className="toast-notification"
				style={showNotification ? { opacity: 1 } : { opacity: 0 }}
			>
				<div
					className="toast-notification-close"
					onClick={() => setShowNotification(false)}
				>
					<DynamicIcon name="CiCircleRemove" size={20} />
				</div>
				{notifications}
			</div>
		)
	);
}

export default memo(ToastNotification);
