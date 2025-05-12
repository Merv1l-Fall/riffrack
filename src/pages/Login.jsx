import "./Login.css";
import { useState } from "react";
import {Navigate } from "react-router";
import useAdminStore from "../store/adminStore";
const Login = () => {
	const isLoggedIn = useAdminStore((state) => state.isLoggedIn);
	const toggleLogIn = useAdminStore((state) => state.toggleLogIn);

	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [touched, setTouched] = useState(false);

	const handleLogIn = () => {
		// Clear errors
		setUsernameError("");
		setPasswordError("");

		if (!username || !password) {
			if (!username) setUsernameError("Please enter a username");
			if (!password) setPasswordError("Please enter a password");
			return;
		}

		if (username !== "admin" || password !== "password") {
			if (username !== "admin") setUsernameError("Invalid username");
			if (password !== "password") setPasswordError("Invalid password");
			return;
		}

		toggleLogIn();
		console.log("Logged in successfully", isLoggedIn);
	};

	return (
		<section className="login-section">
			<div className="form-container">
				{isLoggedIn ? (
					<Navigate to="/admin" replace />
				) : (
					<form onSubmit={handleLogIn}>
						<div className="input-container">
							<label htmlFor="username-input">Username</label>
							<input 
							type="text" 
							id="username-input"
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
							}}
							onFocus={() => {
								setTouched(true);
							}}
							/>
							<p className="error">{usernameError}</p>
						</div>
						<div className="input-container">
							<label htmlFor="password-input">Password</label>
							<input 
							type="password" 
							id="password-input"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							onFocus={() => {
								setTouched(true);
							}}
							/>
							<p className="error">{passwordError}</p>
						</div>
							<button disabled={!touched} type="submit">Login</button>
					</form>
				)}
			</div>
		</section>
	);
};

export default Login;
