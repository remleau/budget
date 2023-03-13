import React, { useCallback, useRef, memo } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../utils/Routes";

import { useGlobalContext } from "../utils/GlobalProvider";

function Login() {
	const { login, user } = useGlobalContext();

	const emailRef = useRef();
	const passwordRef = useRef();
	const navigate = useNavigate();

	const handleOnSubmit = useCallback(
		async (evt) => {
			evt?.preventDefault();
			await login(emailRef.current.value, passwordRef.current.value);
			navigate("/");
		},
		[login]
	);

	if (user) return <Navigate to={ROUTES.ROOT} />;

	return (
		<div className="page login">
			<section>
				<h2>Sign Up to the game</h2>
				<form onSubmit={handleOnSubmit}>
					<input placeholder="Email" type="email" ref={emailRef} />
					<input placeholder="Password" type="password" ref={passwordRef} />
					<button type="submit">Connect</button>
				</form>
			</section>
		</div>
	);
}

export default memo(Login);
