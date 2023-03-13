import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";

import App from "./pages/App";
import { GlobalProvider } from "./utils/GlobalProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<GlobalProvider>
			<Router basename={"/"}>
				<App />
			</Router>
		</GlobalProvider>
	</React.StrictMode>
);
