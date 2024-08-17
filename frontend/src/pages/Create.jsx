import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/usercontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
	const navigate = useNavigate();
	const [post, setPost] = useState({ title: "", content: "" });
	const { currentUser } = useContext(UserContext);

	const createPost = (e) => {
		e.preventDefault();
		axios
			.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts/`, post, {
				headers: { Authorization: `Bearer ${currentUser.token}` },
			})
			.then((res) => {
				console.log(res.data);
				const id = res.data.id;
				navigate(`/posts/${id}`);
			})
			.catch((error) => {
				if (error.response.status === 401) {
					console.error(error.response.data);
				}
				alert("Can't create post", JSON.stringify(error.response.data));
			});
	};

	const changeInputHandler = (e) => {
		setPost((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
		}
	}, [currentUser, navigate]);

	return (
		<div className="bg-gray-50 dark:bg-gray-900 pt-10 min-h-screen p-4">
			<form className="max-w-4xl mx-auto pt-10">
				<div className="mb-5">
					<label
						htmlFor="title"
						className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
					>
						Title
					</label>
					<input
						type="text"
						id="title"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Why it does not matter if you use ..."
						required
						value={post.title}
						name="title"
						onChange={changeInputHandler}
					/>
				</div>
				<div className="mb-5">
					<label
						htmlFor="large-input"
						className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
					>
						Content
					</label>
					<textarea
						rows={10}
						id="large-input"
						className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptate ex non dolorem ducimus repellendus animi reprehenderit similique corporis soluta quae necessitatibus maxime temporibus reiciendis, sapiente nihil accusantium commodi dolore."
						required
						name="content"
						value={post.content}
						onChange={changeInputHandler}
					/>
				</div>

				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					onClick={createPost}
				>
					Submit
				</button>
			</form>
		</div>
	);
}

export default Create;
