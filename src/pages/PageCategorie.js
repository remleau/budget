import { memo, useEffect, useState, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ROUTES } from "../utils/Routes";

import useCategories from "../hooks/useCategories";
import useGoals from "../hooks/useGoals";
import useExpenses from "../hooks/useExpenses";

import Table from "../components/Table";
import DynamicIcon from "../components/DynamicIcon";
import Hero from "../components/Hero";

import useCurrency from "../hooks/useCurrency";

function PageCategorie() {
	const { id } = useParams();
	const { categorie } = useCategories(id);
	const { goals, getGoalsByCategories } = useGoals();
	const { expenses, getExpensesByCategories } = useExpenses();
	const { convertPrice } = useCurrency();

	useEffect(() => {
		getExpensesByCategories(id);
		getGoalsByCategories(id);
	}, [id, categorie]);

	const total = expenses?.map((e) => e.price).reduce((a, b) => a + b, 0);

	const style = {
		backgroundImage: `url(${
			categorie?.background_image
				? categorie.background_image
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
				accessorKey: "price",
				header: "Price",
				size: 25,
			},
			{
				accessorKey: "date",
				header: "Date",
				size: 25,
			},
			{
				accessorKey: "type",
				header: "Type",
				size: 25,
			},
		],
		[]
	);

	return (
		categorie && (
			<div className="page categories">
				<Hero
					title={`${categorie.name} categorie`}
					iconName={categorie.icon}
					style={style}
					actions={
						<NavLink
							to={ROUTES.EDITCATEGORIE.replace(":id", categorie.id.toString())}
						>
							<DynamicIcon size={18} name="CiPen" />
							Edit {categorie.name} categrorie
						</NavLink>
					}
				/>

				<div className="page-content">
					{goals != false && (
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
								<div className="sidebar-actions">
									<NavLink
										to={ROUTES.ADDGOAL + "?categories=" + id}
										className={"btn add"}
									>
										<span>Add a goal</span>
									</NavLink>
								</div>
							</div>
						</div>
					)}
					<section
						className={
							goals != false
								? "page-content-container"
								: "page-content-container full"
						}
					>
						<div className="page-content-container-title">
							<h3>Lastest expenses to the category</h3>
							<h3>Total: {convertPrice(total)}</h3>
						</div>

						<Table expenses={expenses} columns={columns} />
					</section>
				</div>
			</div>
		)
	);
}

export default memo(PageCategorie);
