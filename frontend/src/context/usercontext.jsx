import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")));
	const navigate = useNavigate();

	const toggleTheme = () => {
		const theme = localStorage.getItem("theme") || "light";
		console.log(theme);
		if (theme === "light") {
			localStorage.setItem("theme", "dark");
			document.documentElement.classList.add("dark");
		} else {
			localStorage.setItem("theme", "light");
			document.documentElement.classList.remove("dark");
		}
	};

	const logout = () => {
		setCurrentUser(null);
		navigate("/login");
	};

	const refresh = async (refreshToken) => {
		await axios
			.post(`${import.meta.env.VITE_BACKEND_URL}/api/token/refresh/`, {
				refresh: refreshToken,
			})
			.then((res) => {
				console.log("successfully refreshed token", res.data);
				setCurrentUser({ ...currentUser, token: res.data.access });
			})
			.catch((error) => {
				console.error(error);
				alert("Can't refresh token");
				logout();
			});
	};

	useEffect(() => {
		const theme = localStorage.getItem("theme") || "dark";
		if (theme === "dark") {
			localStorage.setItem("theme", "dark");
			document.documentElement.classList.add("dark");
		}
	}, []);

	useEffect(() => {
		if (!currentUser) {
			localStorage.removeItem("user");
			return;
		}
		localStorage.setItem("user", JSON.stringify(currentUser));
	}, [currentUser, navigate]);

	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser, toggleTheme, logout, refresh }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
