import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/usercontext";

const Login = () => {
	const [userData, setUserData] = useState({
		username: "",
		password: "",
	});
	const navigate = useNavigate();
	const { currentUser, setCurrentUser } = useContext(UserContext);

	useEffect(() => {
		if (currentUser) {
			navigate("/");
		}
	}, [currentUser, navigate]);

	const loginUser = async (e) => {
		console.log(import.meta.env.VITE_BACKEND_URL);
		e.preventDefault();
		axios
			.post(`${import.meta.env.VITE_BACKEND_URL}/api/token/`, userData)
			.then((res) => {
				const token = res.data.access;
				const refreshToken = res.data.refresh;
				if (!token && !refreshToken) return alert("Unable to login user", res.data);
				setCurrentUser({ token, refreshToken });
				navigate("/");
			})
			.catch((error) => {
				console.error(error);
				alert("Can't login", JSON.stringify(error.response.data));
			});
	};

	const changeInputHandler = (e) => {
		setUserData((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Log in to your account
						</h1>
						<form className="space-y-4 md:space-y-6" action="#">
							<div>
								<label
									htmlFor="username"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Your Username
								</label>
								<input
									type="text"
									name="username"
									id="username"
									className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="metal"
									required
									onChange={changeInputHandler}
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
									onChange={changeInputHandler}
								/>
							</div>
							<button
								type="submit"
								className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								onClick={loginUser}
							>
								Sign in
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Don’t have an account yet?
								<Link
									to="/register"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									Sign up
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
