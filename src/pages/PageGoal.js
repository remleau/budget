import { memo } from "react";
import { NavLink, useParams } from "react-router-dom";

import { ROUTES } from "../utils/Routes";
import useGoals from "../hooks/useGoals";

import DynamicIcon from "../components/DynamicIcon";

function PageGoal() {
	const { id } = useParams();
	const { goals } = useGoals();

	const singleGoal = goals?.filter((cat) => cat.id === id).at(0);

	console.log(singleGoal);

	const style = {
		backgroundImage: `url(${
			singleGoal?.background_image
				? singleGoal.background_image
				: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
		})`,
	};

	return (
		singleGoal && (
			<div className="page categories">
				<section>
					<div className="hero" style={style}>
						<div className="hero-content">
							<h1>{singleGoal.name}</h1>
						</div>
						<div className="hero-actions">
							<NavLink
								to={ROUTES.EDITGOAL.replace(":id", singleGoal.id.toString())}
							>
								<DynamicIcon size={18} name="CiPen" />
								Edit my goal
							</NavLink>
						</div>
						<div className="overlay"></div>
					</div>
				</section>
			</div>
		)
	);
}

export default memo(PageGoal);
