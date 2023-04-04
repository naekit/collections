import useAuthStore from "@/store/authStore"
import React, { useEffect, useState } from "react"
import { MdFavorite } from "react-icons/md"

interface Props {
	handleLike: () => void
	handleDislike: () => void
}

const LikeButton = ({ handleLike, handleDislike }: Props) => {
	const [alreadyLiked, setAlreadyLiked] = useState<boolean>(false)
	const { userProfile } = useAuthStore()

	return (
		<div className="gap-6">
			<div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
				<div className="bg-gray-300 rounded-full p-2 md:p-4 ">
					{alreadyLiked ? (
						<MdFavorite
							className="text-2xl lg:text-3xl text-red-400"
							onClick={handleLike}
						/>
					) : (
						<MdFavorite
							className="text-2xl lg:text-3xl text-white"
							onClick={handleDislike}
						/>
					)}
				</div>
				<p className="text-gray-400 text-sm md:text-base mt-2">
					{alreadyLiked ? "Liked" : "Like"}
				</p>
			</div>
		</div>
	)
}

export default LikeButton
