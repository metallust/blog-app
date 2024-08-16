import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/usercontext";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function Dashboard() {
	const navigate = useNavigate();
	const { currentUser, refresh } = useContext(UserContext);
	const [me, setMe] = useState();

	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
		} else {
			const fetchblog = async () => {
				console.log(import.meta.env.VITE_BACKEND_URL);
				axios
					.get(`${import.meta.env.VITE_BACKEND_URL}/api/me/`, {
						headers: { Authorization: `Bearer ${currentUser.token}` },
					})
					.then((res) => {
						console.log(res.data);
						setMe(res.data);
					})
					.catch((error) => {
						console.log(error);
						alert("Can't fetch blogs", JSON.stringify(error.response.data));
					});
			};
			fetchblog();
		}
	}, [currentUser, navigate, refresh]);

	const deletePost = (id) => {
		axios
			.delete(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}/`, {
				headers: { Authorization: `Bearer ${currentUser.token}` },
			})
			.then((res) => {
				console.log(res.data);
				setMe((prev) => {
					return {
						...prev,
						posts: prev.posts.filter((e) => e.id !== id),
					};
				});
			})
			.catch((error) => {
				console.error(error);
				alert("Can't create post", JSON.stringify(error.response.data));
			});
	};

	const editPost = (id) => {
		navigate(`/dashboard/editpost/${id}`);
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900 pt-20 min-h-screen">
			<div className="px-6 py-8 mx-auto lg:py-0">
				{me && (
					<>
						<h1 className="text-3xl mb-5 font-semibold pl-10 dark:text-white">
							My Blogs
						</h1>
						<div className="flex gap-5 flex-wrap">
							{me.posts.map((e) => (
								<Card
									key={e.id}
									title={e.title}
									description={e.content}
									author={e.author}
									date={e.created_at}
									id={e.id}
									deletePostfunc={() => deletePost(e.id)}
									editPostfunc={() => editPost(e.id)}
								/>
							))}
						</div>
					</>
				)}
			</div>
		</section>
	);
}

const textShortner = (text, maxlen) => {
	if (text.length < maxlen) return text;
	return text.substr(0, maxlen) + "...";
};

const Card = ({ title, description, id, deletePostfunc, editPostfunc }) => {
	return (
		<div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<h5 className="flex justify-between mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{textShortner(title, 20)}
				<div className="flex items-center gap-5 pl-5">
					<button className="text-red-600 text-2xl" onClick={deletePostfunc}>
						<MdDelete />
					</button>
					<button className="font-bold text-2xl" onClick={editPostfunc}>
						<CiEdit />
					</button>
				</div>
			</h5>
			<p className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-words">
				{textShortner(description, 100)}
			</p>
			<div className="flex">
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
		</div>
	);
};

export default Dashboard;
