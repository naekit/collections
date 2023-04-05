import NoResults from "@/components/NoResults"
import VideoCard from "@/components/VideoCard"
import axios from "axios"
import Image from "next/image"
import React, { useEffect, useState } from "react"

import { GoVerified } from "react-icons/go"
import { IUser, Video } from "@/types"
import useAuthStore from "@/store/authStore"
import { BASE_URL } from "@/utils"

interface ProfileProps {
	data: { user: IUser; userVideos: Video[]; userLikedVideos: Video[] }
}

const Profile = ({ data }: ProfileProps) => {
	const [userVideos, setUserVideos] = useState<boolean>(true)
	const [videoList, setVideoList] = useState<Video[]>([])
	const { user, userVideos: videos, userLikedVideos } = data

	const myVideos = userVideos ? `border-b-2 border-black` : `text-gray-400`
	const likedVideos = !userVideos
		? `border-b-2 border-black`
		: `text-gray-400`

	useEffect(() => {
		if (userVideos) {
			setVideoList(videos)
		} else {
			setVideoList(userLikedVideos)
		}
	}, [userVideos, videos, userLikedVideos])

	return (
		<div className="w-full">
			<div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
				<div className="flex gap-3 p-2 font-semibold">
					<div className="w-16 h-16 md:w-32 md:h-32">
						<Image
							src={user.image}
							alt="user image"
							width={120}
							height={120}
							className="rounded-md"
						/>
					</div>
					<div className="hidden xl:block ">
						<p className="flex gap-1 items-center text-md md:text-2xl tracking-wider font-bold text-primary lowercase">
							{user.username.replaceAll(" ", "")}
							<GoVerified className="text-blue-800" />
						</p>
						<p className="text-gray-400 text-xs md:text-xl">
							{user.username}
						</p>
					</div>
				</div>
			</div>
			<div>
				<div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
					<p
						className={`text-xl font-semibold cursor-pointer mt-2 ${myVideos}`}
						onClick={() => setUserVideos(true)}
					>
						Videos
					</p>
					<p
						className={`text-xl font-semibold cursor-pointer mt-2 ${likedVideos}`}
						onClick={() => setUserVideos(false)}
					>
						Liked
					</p>
				</div>
				<div className="flex gap-6 flex-wrap md:justify-start">
					{videoList?.length > 0 ? (
						videoList.map((video: Video) => (
							<VideoCard key={video._id} post={video} />
						))
					) : (
						<NoResults
							text={`No ${userVideos ? "" : "Liked"} Videos`}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps = async ({
	params,
}: {
	params: { id: string }
}) => {
	const { id } = params

	const { data } = await axios.get(`${BASE_URL}/api/profile/${id}`)

	return {
		props: {
			data,
		},
	}
}

export default Profile
