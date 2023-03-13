import { memo } from "react";
import { Navigate, Route, Routes, useMatch } from "react-router-dom";
import { ROUTES } from "../utils/Routes";

import "../styles/index.scss";

import Layout from "../components/Layout";
import Home from "./Home";
import Login from "./Login";

import { useGlobalContext } from "../utils/GlobalProvider";

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
				</Route>
			</Routes>
		</>
	);
}

export default memo(App);
