import { memo } from "react";
import { Outlet } from "react-router-dom";

import { useGlobalContext } from "../utils/GlobalProvider";

import Header from "./Header";
import Footer from "./Footer";
import Reminders from "./Reminders";

function Layout() {
	const { user } = useGlobalContext();

	const style = {
		"--header-width": "0%",
	};

	return (
		<main className="main-wrapper">
			{user && <Header />}
			<div className="main-content" style={!user ? style : null}>
				{user && <Reminders />}
				<Outlet />
				<Footer />
			</div>
		</main>
	);
}

export default memo(Layout);
