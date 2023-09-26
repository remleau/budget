import { memo, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ROUTES } from "../utils/Routes";

import useGoals from "../hooks/useGoals";
import useExpenses from "../hooks/useExpenses";
import useCurrency from "../hooks/useCurrency";

import { daysToGo, convertDate } from "../utils/fn";

import DynamicIcon from "../components/DynamicIcon";

function PageGoal() {
	const { id } = useParams();
	const { goal } = useGoals({ goalId: id });
	const { expenses, getExpensesByGoals } = useExpenses();
	const { convertPrice } = useCurrency();

	let savings = expenses?.filter((e) => e.type == "savings");
	let stocks = expenses?.filter((e) => e.type == "stocks");
	let goods = expenses?.filter((e) => e.type == "goods");
	let payment = expenses?.filter((e) => e.type == "payment");

	let savings_amount = 0;
	let savings_price = savings?.map((s) => (savings_amount += s.price));

	const categories = goal?.expand?.categories;

	useEffect(() => {
		getExpensesByGoals(id);
	}, [id]);

	const style = {
		backgroundImage: `url(${
			goal?.background_image
				? goal.background_image
				: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
		})`,
	};

	return (
		goal && (
			<div className="page goal">
				<div className="hero" style={style}>
					<div className="hero-content">
						<h1>{goal?.name}</h1>
						<p>{goal?.description}</p>
					</div>
					<div className="hero-actions">
						<NavLink to={ROUTES.EDITGOAL.replace(":id", goal.id.toString())}>
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
								<div className="">
									<p>Due:</p>
									<p>
										<span>
											{convertDate(goal.due_date)} ({daysToGo(goal.due_date)}{" "}
											days)
										</span>
									</p>
								</div>
								<div className="">
									<p>Money Goal:</p>
									<p>
										<span>
											{convertPrice(savings_amount)} /{" "}
											{convertPrice(goal?.money_goal)}
										</span>
									</p>
								</div>
								<div className="">
									<p>Categorie{categories?.length > 1 ? "(s): " : ": "}</p>
									<p>
										{categories?.map((cat, index) => {
											return (
												<NavLink
													to={ROUTES.CATEGORIE.replace(
														":id",
														cat.id.toString()
													)}
													key={cat.id}
												>
													<span>
														{index + 1 == categories.length
															? cat.name
															: cat.name + ","}
													</span>
												</NavLink>
											);
										})}
									</p>
								</div>
							</div>
						</div>
					</div>
					<section className="page-content-container">
						<div className="page-content-contributions">
							{Boolean(savings?.length) && (
								<>
									<h3>Lastest contributions to the goal</h3>

									<div className="contributions">
										{savings?.map((goal) => {
											return (
												<div key={goal.id} className="contribution">
													<NavLink
														to={ROUTES.GOAL.replace(":id", goal.id.toString())}
														key={goal.id}
													>
														<span>{goal.name}</span>
														<span>{convertDate(goal.date)}</span>
														<span>{convertPrice(goal.price)}</span>
													</NavLink>
												</div>
											);
										})}
									</div>
								</>
							)}

							{Boolean(payment?.length) && (
								<>
									<h3>Lastest payment to the goal</h3>

									<div className="contributions">
										{payment?.map((goal) => {
											return (
												<div key={goal.id} className="contribution">
													<NavLink
														to={ROUTES.GOAL.replace(":id", goal.id.toString())}
														key={goal.id}
													>
														<span>{goal.name}</span>
														<span>{convertDate(goal.date)}</span>
														<span>{convertPrice(goal.price)}</span>
													</NavLink>
												</div>
											);
										})}
									</div>
								</>
							)}
						</div>
					</section>
				</div>
			</div>
		)
	);
}

export default memo(PageGoal);
