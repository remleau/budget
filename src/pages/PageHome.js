import { memo } from "react";

import Hero from "../components/Hero";

function Home() {
	const style = {
		backgroundImage:
			"url(https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)",
	};

	return (
		<div className="page home">
			<Hero title="Latest informations" style={style} />
		</div>
	);
}

export default memo(Home);
