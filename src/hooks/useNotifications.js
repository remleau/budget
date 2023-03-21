import { useMemo, useCallback, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { ROUTES } from "../utils/Routes";
import { useGlobalContext } from "../utils/GlobalProvider";

function useNotifications() {
	const { pb } = useGlobalContext();

	const [method, setMethod] = useState(null);
	const [notifications, setNotifications] = useState(null);

	useEffect(() => {
		pb.beforeSend = function (url, options) {
			//setNotifications(null);
			setMethod(options.method);
			return { url, options };
		};

		pb.afterSend = function (response, data) {
			if (response.status !== 200 && 204) {
				setNotifications(() => <div>{data?.message}</div>);
			}

			if (response.status == 204) {
				setNotifications(() => <div>Record deleted</div>);
			}

			console.log("notif", response, method, data);

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

				default:
					break;
			}

			return data;
		};
	}, [method, notifications]);

	return useMemo(() => {
		return notifications;
	});
}

export default useNotifications;
