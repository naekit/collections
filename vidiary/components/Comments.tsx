import React, { FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { GoVerified } from "react-icons/go"

import useAuthStore from "@/store/authStore"
import NoResults from "./NoResults"

interface CommentsProps {
	comments: Comment[]
	setComment: (comment: string) => void
	addComment: (e: FormEvent) => Promise<void>
	isPostingComment: boolean
	comment: string
}

interface Comment {
	comment: string
	length?: number
	_key: string
	postedBy: {
		_ref: string
		_id: string
	}
}

const Comments = ({
	comments,
	comment,
	setComment,
	addComment,
	isPostingComment,
}: CommentsProps) => {
	const { userProfile, allUsers }: any = useAuthStore()

	return (
		<div className="border-t-2 border-gray-200 pt-2 px-0 mt-4 bg-gray-300 border-b-2 lg:pb-0 pb-[100px]">
			<div className="overflow-scroll lg:h-[475px]">
				{comments?.length > 0 ? (
					comments.map((comment: Comment) => (
						<div
							key={comment._key}
							className="flex flex-col my-2 px-2 border-b border-gray-200 w-full"
						>
							<Link
								href={`/profile/${comment.postedBy._id}`}
								className="flex gap-3 items-center"
							>
								<div className="w-8 h-8">
									<Image
										src={
											allUsers.find(
												(user: any) =>
													user._id ===
													comment.postedBy._id
											)?.image
										}
										alt="user image"
										width={40}
										height={40}
										className="rounded-sm"
									/>
								</div>
								<div>
									<p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
										{allUsers
											.find(
												(user: any) =>
													user._id ===
													comment.postedBy._id
											)
											?.username.replaceAll(" ", "")}
										<GoVerified className="text-blue-800" />
									</p>
									<p className="text-gray-400 text-xs">
										{
											allUsers.find(
												(user: any) =>
													user._id ===
													comment.postedBy._id
											)?.username
										}
									</p>
								</div>
							</Link>
							<p className="text-primary">{comment.comment}</p>
						</div>
					))
				) : (
					<NoResults text="No comments yet" />
				)}
			</div>
			{userProfile && (
				<div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
					<form
						onSubmit={addComment}
						className="flex gap-4 mb-4 items-center"
					>
						<input
							type="text"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							placeholder="Add a comment..."
							className="flex-1 bg-gray-300 rounded-md text-md font-medium px-6 py-4 outline-none w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 border focus:outline-none focus:border-2 focus:border-gray-400"
						/>
						<button
							className="text-md text-gray-400"
							onClick={addComment}
						>
							{isPostingComment ? "Commenting" : "Comment"}
						</button>
					</form>
				</div>
			)}
		</div>
	)
}

export default Comments
