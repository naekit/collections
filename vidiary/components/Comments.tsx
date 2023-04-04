import React from "react"
import Image from "next/image"
import Link from "next/link"
import { GoVerified } from "react-icons/go"

import useAuthStore from "@/store/authStore"
import NoResults from "./NoResults"

const Comments = () => {
	const comments = []
	const { userProfile } = useAuthStore()
	const isPostingComment = false

	return (
		<div className="border-t-2 border-gray-200 pt-2 px-8 mt-4 bg-gray-300 border-b-2 lg:pb-0 pb-[100px]">
			<div className="overflow-scroll lg:h-[475px]">
				{comments?.length > 0 ? (
					<div>Videos</div>
				) : (
					<NoResults text="No comments yet" />
				)}
			</div>
			{userProfile && (
				<div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
					<form
						onSubmit={() => {}}
						className="flex gap-4 mb-4 items-center"
					>
						<input
							type="text"
							value=""
							onChange={() => {}}
							placeholder="Add a comment..."
							className="flex-1 bg-gray-300 rounded-md text-md font-medium px-6 py-4 outline-none w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 border focus:outline-none focus:border-2 focus:border-gray-400"
						/>
						<button
							className="text-md text-gray-400"
							onClick={() => {}}
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
