import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/usercontext";
import axios from "axios";

const Home = () => {
	const navigate = useNavigate();
	const { currentUser, refresh } = useContext(UserContext);
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
		} else {
			const fetchblog = async () => {
				console.log(import.meta.env.VITE_BACKEND_URL);
				axios
					.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts/`, {
						headers: { Authorization: `Bearer ${currentUser.token}` },
					})
					.then((res) => {
						console.log(res.data);
						setBlogs(res.data);
					})
					.catch((error) => {
						console.error(error);
						alert("Can't get blogs", JSON.stringify(error.response.data));
					});
			};
			fetchblog();
		}
	}, [currentUser, navigate, refresh]);

	return (
		<section className="bg-gray-50 dark:bg-gray-900 pt-20 min-h-screen">
			<div className="px-6 py-8 mx-auto lg:py-0">
				<h1 className="text-3xl mb-5 font-semibold pl-10 dark:text-white">All Blogs</h1>
				<div className="flex gap-5 flex-wrap">
					{blogs.map((e) => (
						<Card
							key={e.id}
							title={e.title}
							description={e.content}
							author={e.author}
							date={e.created_at}
							id={e.id}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

const textShortner = (text, maxlen) => {
	if (text.length < maxlen) return text;
	return text.substr(0, maxlen) + "...";
};

const Card = ({ title, description, id }) => {
	return (
		<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{textShortner(title, 20)}
			</h5>
			<p className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-words">
				{textShortner(description, 100)}
			</p>
			<Link
				to={`/posts/${id}`}
				className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Read more
				<svg
					className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 10"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M1 5h12m0 0L9 1m4 4L9 9"
					/>
				</svg>
			</Link>
		</div>
	);
};

export default Home;
