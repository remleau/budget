import { memo, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { ROUTES } from "../utils/Routes";
import useCategories from "../hooks/useCategories";

import DynamicIcon from "../components/DynamicIcon";
import useGoals from "../hooks/useGoals";

function PageCategorie() {
	const { id } = useParams();
	const [goals, setGoals] = useState(false);
	const { categorie } = useCategories(id);
	const { getGoalsByCategories } = useGoals();

	useEffect(() => {
		async function associated_goals() {
			const goals = await getGoalsByCategories(id);
			setGoals(goals);
		}

		if (!goals) associated_goals();
	}, [id]);

	const style = {
		backgroundImage: `url(${
			categorie?.background_image
				? categorie.background_image
				: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
		})`,
	};

	return (
		categorie && (
			<div className="page categories">
				<div className="hero" style={style}>
					<div className="hero-content">
						<h1>
							<DynamicIcon name={categorie.icon} size={40} />
							{categorie.name} categorie
						</h1>
					</div>
					<div className="hero-actions">
						<NavLink
							to={ROUTES.EDITCATEGORIE.replace(":id", categorie.id.toString())}
						>
							<DynamicIcon size={18} name="CiPen" />
							Edit {categorie.name} categrorie
						</NavLink>
					</div>
					<div className="overlay"></div>
				</div>

				<div className="page-content">
					{goals && (
						<div className="sidebar">
							<div className="sidebar-content">
								<div className="">
									<h3>Associated goals</h3>
									<div className="goals-associated">
										{goals?.map((goal) => {
											return (
												<div key={goal.id} className="">
													<NavLink
														to={ROUTES.GOAL.replace(":id", goal.id.toString())}
													>
														<span key={goal.id}>{goal.name}</span>
													</NavLink>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		)
	);
}

export default memo(PageCategorie);
