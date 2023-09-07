import React, { memo } from "react";
import { NavLink, useMatch } from "react-router-dom";

import { ROUTES } from "../utils/Routes";
import { useGlobalContext } from "../utils/GlobalProvider";

import Avatar from "./Avatar";
import {
	CiBank,
	CiVault,
	CiFolderOn,
	CiUser,
	CiPlug1,
	CiMedal,
} from "react-icons/ci";

function Header() {
	const { logout, user } = useGlobalContext();

	const isAddCategoriePage = useMatch(ROUTES.ADDCATEGORIE);
	const isEditCategoriePage = useMatch(ROUTES.EDITCATEGORIE);
	const isSingleCategoriePage = useMatch(ROUTES.CATEGORIE);

	const isAddGoalPage = useMatch(ROUTES.ADDGOAL);
	const isEditGoalPage = useMatch(ROUTES.EDITGOAL);
	const isSingleGoalPage = useMatch(ROUTES.GOAL);

	const isAddExpensePage = useMatch(ROUTES.ADDEXPENSE);
	const isEditExpensePage = useMatch(ROUTES.EDITEXPENSE);
	const isSingleExpensePage = useMatch(ROUTES.EXPENSE);

	return (
		<header>
			<NavLink to={ROUTES.PROFILE} style={{ textDecoration: "none" }}>
				<Avatar />
			</NavLink>

			<div className="menu">
				<ul>
					<li>
						<NavLink to={ROUTES.ROOT}>
							<CiUser size={18} />
							<span>Home</span>
						</NavLink>
					</li>

					<li>
						<NavLink
							to={ROUTES.GOALS}
							className={
								isAddGoalPage || isSingleGoalPage || isEditGoalPage
									? "active"
									: null
							}
						>
							<CiMedal size={18} />
							<span>Goals</span>
						</NavLink>
					</li>

					<li>
						<NavLink to={ROUTES.STOCKS}>
							<CiBank size={18} />
							<span>Stocks</span>
						</NavLink>
					</li>

					<li>
						<NavLink
							to={ROUTES.EXPENSES}
							className={
								isAddExpensePage || isSingleExpensePage || isEditExpensePage
									? "active"
									: null
							}
						>
							<CiVault size={18} />
							<span>Expenses</span>
						</NavLink>
					</li>

					<li>
						<NavLink
							to={ROUTES.CATEGORIES}
							className={
								isAddCategoriePage ||
								isSingleCategoriePage ||
								isEditCategoriePage
									? "active"
									: null
							}
						>
							<CiFolderOn size={18} />
							<span>Categories</span>
						</NavLink>
					</li>
				</ul>
			</div>

			{user && (
				<div className="logout">
					<button onClick={() => logout()}>
						<CiPlug1 size={18} />
						<span>Logout</span>
					</button>
				</div>
			)}
		</header>
	);
}

export default memo(Header);
