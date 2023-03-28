import { memo } from "react";
import { NavLink, useParams } from "react-router-dom";

import { ROUTES } from "../utils/Routes";
import useGoals from "../hooks/useGoals";
import useCurrency from "../hooks/useCurrency";

import DynamicIcon from "../components/DynamicIcon";

function PageGoal() {
	const { id } = useParams();
	const { goals } = useGoals();
	const { convertPrice } = useCurrency();

	const singleGoal = goals?.filter((cat) => cat.id === id).at(0);
	const categories = singleGoal?.expand?.categories;
	const dueDate = new Intl.DateTimeFormat("fr-ca", {
		month: "long",
		day: "numeric",
		year: "numeric",
	}).format(new Date(singleGoal?.due_date || null));

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
				<div className="hero" style={style}>
					<div className="hero-content">
						<h1>{singleGoal?.name}</h1>
						<p>{singleGoal?.description}</p>
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

				<div className="page-content">
					<div className="sidebar">
						<div className="sidebar-content">
							<div className="">
								<p>
									Due: <span>{dueDate}</span>
								</p>
							</div>
							<div className="">
								<p>
									Money Goal:{" "}
									<span>{convertPrice(singleGoal?.money_goal)}</span>
								</p>
							</div>
							<div className="">
								<p>
									Categorie{categories?.length > 1 ? "(s): " : ": "}
									{categories?.map((cat, index) => (
										<NavLink
											to={ROUTES.CATEGORIE.replace(":id", cat.id.toString())}
											key={cat.id}
										>
											<span>{cat.name}</span>
										</NavLink>
									))}
								</p>
							</div>
						</div>
					</div>
					<section className="page-content-container">
						<h3>Lastest contribution to the goal</h3>
					</section>
				</div>
			</div>
		)
	);
}

export default memo(PageGoal);
