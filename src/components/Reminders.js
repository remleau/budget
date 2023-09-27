import { memo, useState } from "react";
import DynamicIcon from "./DynamicIcon";

import useReminders from "../hooks/useReminders";

function Reminders() {
	const [openReminders, setOpenReminders] = useState(false);

	const { reminders } = useReminders();

	return (
		<div className="reminders">
			<div
				className="reminders-menu"
				onClick={() => setOpenReminders((prevState) => !prevState)}
			>
				<span className="reminders-count">{reminders?.length || 0}</span>
				<DynamicIcon name="CiBellOn" size={20} />
			</div>
			<div
				className={`reminders-content ${openReminders ? "openReminders" : ""}`}
			>
				<div
					className={`overlay overlay-reminders ${openReminders ? "open" : ""}`}
				></div>
				<h3>Latest Reminders. ({reminders?.length || 0})</h3>
				<div>{reminders?.map((r) => r.name)}</div>
			</div>
		</div>
	);
}

export default memo(Reminders);
