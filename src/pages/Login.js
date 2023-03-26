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
				<h2>Sign Up to your budget</h2>
				<form className="form" onSubmit={handleOnSubmit}>
					<div className="form-field-content">
						<input placeholder="Email" type="email" ref={emailRef} />
					</div>
					<div className="form-field-content">
						<input placeholder="Password" type="password" ref={passwordRef} />
					</div>

					<div className="form-actions">
						<button type="submit">Connect</button>
					</div>
				</form>
			</section>
		</div>
	);
}

export default memo(Login);
