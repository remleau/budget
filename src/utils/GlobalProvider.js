import {
	createContext,
	useContext,
	useEffect,
	useState,
	useMemo,
	useCallback,
} from "react";
import PocketBase from "pocketbase";
import { useInterval } from "usehooks-ts";
import jwtDecode from "jwt-decode";
import ms from "ms";

const BASE_URL = "http://127.0.0.1:8090";
const fiveMinutesInMs = ms("5 minutes");
const twoMinutesInMs = ms("1 minutes");

export const GlobalContext = createContext();

export const useGlobalContext = () => {
	return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
	const pb = useMemo(() => new PocketBase(BASE_URL), []);

	const [token, setToken] = useState(pb.authStore.token);
	const [user, setUser] = useState(pb.authStore.model);

	useEffect(() => {
		return pb.authStore.onChange((token, model) => {
			setToken(token);
			setUser(model);
		});
	}, []);

	const register = useCallback(async (email, password) => {
		return await pb
			.collection("users")
			.create({ email, password, passwordConfirm: password });
	}, []);

	const login = useCallback(async (email, password) => {
		return await pb.collection("users").authWithPassword(email, password);
	}, []);

	const logout = useCallback(() => {
		pb.authStore.clear();
	}, []);

	const update_user = useCallback(async (values) => {
		return await pb.collection("users").update(user.id, {
			...values,
		});
	}, []);

	const refreshSession = useCallback(async () => {
		if (!pb.authStore.isValid) return;
		const decoded = jwtDecode(token);
		const tokenExpiration = decoded.exp;
		const expirationWithBuffer = (decoded.exp + fiveMinutesInMs) / 1000;

		if (tokenExpiration < expirationWithBuffer) {
			await pb.collection("users").authRefresh();
		}
	}, [token]);

	useInterval(refreshSession, token ? twoMinutesInMs : null);

	const value = {
		register,
		login,
		logout,
		user,
		token,
		pb,
		update_user,
	};

	return (
		<GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
	);
};
