import { memo, useEffect, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ROUTES } from "../utils/Routes";

import useGoals from "../hooks/useGoals";
import useExpenses from "../hooks/useExpenses";
import useCurrency from "../hooks/useCurrency";

import { daysToGo, convertDate } from "../utils/fn";

import Table from "../components/Table";
import DynamicIcon from "../components/DynamicIcon";
import Hero from "../components/Hero";

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

	const columns = useMemo(
		() => [
			{
				accessorKey: "name",
				header: "Name",
				size: 25,
			},
			{
				accessorKey: "date",
				header: "Date",
				size: 25,
			},
			{
				accessorKey: "price",
				header: "Price",
				size: 25,
			},
		],
		[]
	);

	return (
		goal && (
			<div className="page goal">
				<Hero
					title={goal?.name}
					description={goal?.description}
					style={style}
					actions={
						<NavLink to={ROUTES.EDITGOAL.replace(":id", goal.id.toString())}>
							<DynamicIcon size={18} name="CiPen" />
							Edit my goal
						</NavLink>
					}
				/>

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
								<div className="sidebar-actions">
									<NavLink
										to={
											ROUTES.ADDEXPENSE +
											`?categories=${categories.map((c) => c.id)}&goals=${id}`
										}
										className={"btn add"}
									>
										<span>Add an expense</span>
									</NavLink>
								</div>
							</div>
						</div>
					</div>
					<section className="page-content-container">
						<div className="page-content-contributions">
							{Boolean(savings?.length) && (
								<div className="contributions">
									<h3>Lastest contributions to the goal</h3>

									<Table columns={columns} expenses={savings} />
								</div>
							)}

							{Boolean(payment?.length) && (
								<div className="contributions">
									<h3>Lastest payment to the goal</h3>

									<Table columns={columns} expenses={payment} />
								</div>
							)}

							{Boolean(goods?.length) && (
								<div className="contributions">
									<h3>Lastest goods purchased for the goal</h3>

									<Table columns={columns} expenses={goods} />
								</div>
							)}

							{Boolean(stocks?.length) && (
								<div className="contributions">
									<h3>Lastest stocks purchased for the goal</h3>

									<Table columns={columns} expenses={stocks} />
								</div>
							)}
						</div>
					</section>
				</div>
			</div>
		)
	);
}

export default memo(PageGoal);
