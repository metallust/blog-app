import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/usercontext";

export default function Comments({ id }) {
	const [comments, setComments] = useState([]);
	const [newcomment, setNewComment] = useState("");
	const { currentUser } = useContext(UserContext);

	useEffect(() => {
		const fetchComments = async () => {
			axios
				.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts/comments/${id}`, {
					headers: { Authorization: `Bearer ${currentUser.token}` },
				})
				.then((res) => {
					console.log(res.data);
					setComments(res.data);
				})
				.catch((error) => {
					console.error(error);
				});
		};
		fetchComments();
	}, [id]);

	const createComment = (e) => {
		e.preventDefault();
		axios
			.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/posts/comments/${id}`,
				{ content: newcomment },
				{
					headers: { Authorization: `Bearer ${currentUser.token}` },
				}
			)
			.then((res) => {
				console.log(res.data);
				setComments((prev) => {
					return [...prev, res.data];
				});
				setNewComment("");
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div className="mt-20">
			<h1 className="text-black mb-4 text-xl font-semibold dark:text-white">Comments</h1>
			<form>
				<div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
					<div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
						<label htmlFor="comment" className="sr-only">
							Your comment
						</label>
						<textarea
							id="comment"
							rows={4}
							className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
							placeholder="Write a comment..."
							required
							defaultValue={""}
							name="comment"
							onChange={(e) => setNewComment(e.target.value)}
							value={newcomment}
						/>
					</div>
					<div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
						<button
							type="submit"
							className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
							onClick={createComment}
						>
							Post comment
						</button>
					</div>
				</div>
			</form>

			{comments.map((comment) => (
				<div key={comment.id} className="mb-4 px-5 py-1">
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<img
								src="https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png"
								alt="avatar"
								className="w-8 h-8 rounded-full bg-white"
							/>
							<div className="ml-2 flex items-center gap-2">
								<h2 className="text-sm font-medium dark:text-white">
									{comment.user}
								</h2>
								<p className="text-xs text-gray-500 dark:text-gray-400">
									{new Date(comment.created_at).toDateString()}
								</p>
							</div>
						</div>
					</div>
					<p className="ml-10 text-sm text-gray-700 dark:text-gray-300">
						{comment.content}
					</p>
				</div>
			))}
		</div>
	);
}
