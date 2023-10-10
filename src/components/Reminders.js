import { memo, useState } from "react";
import DynamicIcon from "./DynamicIcon";

import { ROUTES } from "../utils/Routes";

import useReminders from "../hooks/useReminders";
import { NavLink } from "react-router-dom";

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
				<div className="reminders-container">
					{reminders?.map((r) => (
						<div className="reminder" key={r.id}>
							<NavLink to={ROUTES.GOAL.replace(":id", r.goal_id.toString())}>
								{r.name}
							</NavLink>
							<div className="archive">
								<DynamicIcon name="CiBookmarkCheck" size="20" />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default memo(Reminders);
