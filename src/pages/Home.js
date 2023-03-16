import { memo, useEffect, useRef } from "react";
import { useGlobalContext } from "../utils/GlobalProvider";

import PageProfile from "./Profile";

function Home() {
	const { user } = useGlobalContext();

	return (
		<div className="page home">
			<PageProfile />
		</div>
	);
}

export default memo(Home);
