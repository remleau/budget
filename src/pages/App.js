import { memo } from "react";
import { Navigate, Route, Routes, useMatch } from "react-router-dom";
import { ROUTES } from "../utils/Routes";

import "../styles/index.scss";
import { useGlobalContext } from "../utils/GlobalProvider";

import Layout from "../components/Layout";
import Home from "./Home";
import Login from "./Login";
import Categories from "./PageCategories";
import Categorie from "./PageCategorie";
import AddCategorie from "./AddCategorie";
import EditCategorie from "./EditCategorie";
import Profile from "./PageProfile";
import Stocks from "./PageStocks";
import Expenses from "./PageStocks";
import Goals from "./PageGoals";
import Goal from "./PageGoal";
import AddGoal from "./PageAddGoal";
import EditGoal from "./PageEditGoal";

import ToastNotification from "../components/ToastNotification";

function App() {
	const { user } = useGlobalContext();
	const isLoginPage = useMatch(ROUTES.LOGIN);

	if (!user && !isLoginPage) return <Navigate to={ROUTES.LOGIN} />;

	return (
		<>
			<Routes>
				<Route path={ROUTES.ROOT} element={<Layout />}>
					<Route index element={<Home />} />
					<Route path={ROUTES.LOGIN} element={<Login />} />
					<Route path={ROUTES.PROFILE} element={<Profile />} />
					<Route path={ROUTES.STOCKS} element={<Stocks />} />
					<Route path={ROUTES.EXPENSES} element={<Expenses />} />

					<Route path={ROUTES.CATEGORIES} element={<Categories />} />
					<Route path={ROUTES.CATEGORIE} element={<Categorie />} />
					<Route path={ROUTES.ADDCATEGORIE} element={<AddCategorie />} />
					<Route path={ROUTES.EDITCATEGORIE} element={<EditCategorie />} />

					<Route path={ROUTES.GOALS} element={<Goals />} />
					<Route path={ROUTES.GOAL} element={<Goal />} />
					<Route path={ROUTES.ADDGOAL} element={<AddGoal />} />
					<Route path={ROUTES.EDITGOAL} element={<EditGoal />} />
				</Route>
			</Routes>
			<ToastNotification />
		</>
	);
}

export default memo(App);
