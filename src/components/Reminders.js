import { memo, useState } from "react";
import DynamicIcon from "./DynamicIcon";

function Reminders() {
	const [openReminders, setOpenReminders] = useState(false);

	return (
		<div className="reminders">
			<div
				className="reminders-menu"
				onClick={() => setOpenReminders((prevState) => !prevState)}
			>
				<span className="reminders-count">25</span>
				<DynamicIcon name="CiBellOn" size={20} />
			</div>
			<div
				className={`reminders-content ${openReminders ? "openReminders" : ""}`}
			>
				<div
					className={`overlay overlay-reminders ${openReminders ? "open" : ""}`}
				></div>
				<h3>Latest Reminders. (25)</h3>
			</div>
		</div>
	);
}

export default memo(Reminders);
