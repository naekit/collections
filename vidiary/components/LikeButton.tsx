import useAuthStore from "@/store/authStore"
import React, { useEffect, useState } from "react"
import { MdFavorite } from "react-icons/md"

interface Props {
	handleLike: () => void
	handleDislike: () => void
	likes: any[]
}

const LikeButton = ({ handleLike, handleDislike, likes }: Props) => {
	const [alreadyLiked, setAlreadyLiked] = useState<boolean>(false)
	const { userProfile }: any = useAuthStore()
	const filterLikes = likes?.filter((item) => item._ref === userProfile?._id)

	useEffect(() => {
		if (filterLikes?.length > 0) {
			setAlreadyLiked(true)
		} else {
			setAlreadyLiked(false)
		}
	}, [filterLikes])

	return (
		<div className="flex gap-6">
			<div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
				<div className="bg-gray-300 rounded-full p-2 md:p-4 ">
					{alreadyLiked ? (
						<MdFavorite
							className="text-2xl lg:text-3xl text-red-400"
							onClick={handleDislike}
						/>
					) : (
						<MdFavorite
							className="text-2xl lg:text-3xl text-white"
							onClick={handleLike}
						/>
					)}
				</div>
				<p className="text-gray-400 text-sm md:text-base mt-2">
					{likes?.length | 0}
				</p>
			</div>
		</div>
	)
}

export default LikeButton
