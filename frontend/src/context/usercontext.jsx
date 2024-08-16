import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")));
	const [currentTheme, setCurrentTheme] = useState("light");

	const toggleTheme = () => {
		if (currentTheme === "light") {
			setCurrentTheme("dark");
			document.documentElement.classList.add("dark");
		} else {
			setCurrentTheme("light");
			document.documentElement.classList.remove("dark");
		}
	};

	const logout = () => {
		setCurrentUser(null);
	};

	const refresh = async (cb) => {
		await axios
			.post(`${import.meta.env.VITE_BACKEND_URL}/api/token/refresh/`, {
				refresh: currentUser.token,
			})
			.then((res) => {
				console.log("successfully refreshed token", res.data);
				setCurrentUser({ ...currentUser, refreshToken: res.data.access });
				cb();
			})
			.catch((error) => {
				console.error(error);
				alert("Can't refresh token");
				logout();
			});
	};

	useEffect(() => {
		if (!currentUser) {
			localStorage.removeItem("user");
			return;
		}
		localStorage.setItem("user", JSON.stringify(currentUser));
	}, [currentUser]);

	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser, toggleTheme, logout, refresh }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
