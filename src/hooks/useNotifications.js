import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { ROUTES } from "../utils/Routes";
import { useGlobalContext } from "../utils/GlobalProvider";

function useNotifications() {
	const { pb } = useGlobalContext();

	const [method, setMethod] = useState(null);
	const [notifications, setNotifications] = useState(null);

	useEffect(() => {
		pb.beforeSend = function (url, options) {
			setMethod(options.method);
			return { url, options };
		};

		pb.afterSend = function (response, data) {
			if (response.status !== 200 && 204) {
				setNotifications(() => <div>{data?.message}</div>);
			}

			if (response.status === 204) {
				setNotifications(() => <div>Record deleted</div>);
			}

			//console.log("notif", method);

			switch (data?.collectionName) {
				case "categories":
					if (method === "PATCH") {
						setNotifications(() => (
							<NavLink
								to={ROUTES.CATEGORIE.replace(":id", data?.id.toString())}
							>
								<div>Categorie {data?.name} updated</div>
							</NavLink>
						));
					} else {
						setNotifications(() => (
							<NavLink
								to={ROUTES.CATEGORIE.replace(":id", data?.id.toString())}
							>
								<div>Categorie {data?.name} added</div>
							</NavLink>
						));
					}
					break;
				case "users":
					if (method === "PATCH")
						setNotifications(() => <div>Updated account</div>);
					break;

				case "goals":
					if (method === "PATCH") {
						setNotifications(() => (
							<NavLink to={ROUTES.GOAL.replace(":id", data?.id.toString())}>
								<div>Goal {data?.name} updated</div>
							</NavLink>
						));
					} else {
						setNotifications(() => (
							<NavLink to={ROUTES.GOAL.replace(":id", data?.id.toString())}>
								<div>Goal {data?.name} added</div>
							</NavLink>
						));
					}
					break;

				case "expenses":
					if (method === "PATCH") {
						setNotifications(() => (
							<NavLink to={ROUTES.EXPENSE.replace(":id", data?.id.toString())}>
								<div>Expense {data?.name} updated</div>
							</NavLink>
						));
					} else {
						setNotifications(() => (
							<NavLink to={ROUTES.EXPENSE.replace(":id", data?.id.toString())}>
								<div>Expense {data?.name} added</div>
							</NavLink>
						));
					}
					break;

				default:
					break;
			}

			return data;
		};
	}, [method, notifications]);

	return notifications;
}

export default useNotifications;
