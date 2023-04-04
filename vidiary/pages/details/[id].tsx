import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import { GoVerified } from "react-icons/go"
import { MdOutlineCancel } from "react-icons/md"
import { BsFillPlayFill } from "react-icons/bs"
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi"
import axios from "axios"
import { BASE_URL } from "@/utils"
import { Video } from "@/types"
import useAuthStore from "@/store/authStore"

const Details = ({ postDetails }: { postDetails: Video }) => {
	const [post, setPost] = useState<Video>(postDetails)
	const videoRef = React.useRef<HTMLVideoElement>(null)
	const [isMuted, setIsMuted] = useState<boolean>(false)
	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const { userProfile } = useAuthStore()
	const router = useRouter()

	if (!post) return <h1>404</h1>

	const onVideoClick = () => {
		if (!videoRef.current) {
			return
		}
		if (videoRef.current.paused) {
			videoRef.current.play()
			setIsPlaying(true)
		} else {
			videoRef.current.pause()
			setIsPlaying(false)
		}
	}

	useEffect(() => {
		if (post && videoRef.current) {
			videoRef.current.muted = isMuted
		}
	}, [isMuted])

	return (
		<div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
			<div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blur">
				<div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
					<p className="pointer-cursor" onClick={() => router.back()}>
						<MdOutlineCancel className="text-2xl lg:text-3xl text-white" />
					</p>
				</div>
				<div className="relative">
					<div className="lg:h-[100vh] h-[60vh]">
						<video
							ref={videoRef}
							loop
							onClick={onVideoClick}
							src={post.video.asset.url}
							className="h-full"
						></video>
					</div>
					{!isPlaying && (
						<button onClick={onVideoClick}>
							<BsFillPlayFill className="text-4xl lg:text-6xl text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" />
						</button>
					)}
				</div>
				<div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
					{isMuted ? (
						<HiVolumeOff
							className="text-2xl lg:text-3xl text-white"
							onClick={() => setIsMuted(false)}
						/>
					) : (
						<HiVolumeUp
							className="text-2xl lg:text-3xl text-white"
							onClick={() => setIsMuted(true)}
						/>
					)}
				</div>
			</div>
			<div className="relative w-[1000px] md:w-[900px] lg:w-[700px] bg-primary">
				<div className="lg:mt-20 mt-10 items-center gap-4">
					<div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
						<div className="md:w-20 md:h-20 w-16 h-16 ml-4">
							<Link href={`/`}>
								<Image
									width={62}
									height={62}
									className="rounded-md"
									src={post.postedBy.image}
									alt="Profile image"
								/>
							</Link>
						</div>
						<div>
							<Link href={`/`}>
								<div className="flex flex-col gap-2 mt-1">
									<p className="flex gap-2 items-center md:text-md text-primary">
										{post.postedBy.username}
										<GoVerified className="text-blue-800" />
									</p>
									<p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
										{post.postedBy.username}
									</p>
								</div>
							</Link>
						</div>
					</div>
					<p className="px-8 text-md text-gray-600 text-lg">
						{post.caption}
					</p>
					<div className="mt-10 px-8">
						{userProfile && (
							// <LikeButton post={post} setPost={setPost} />
							<h1>Like Button here</h1>
						)}
					</div>
					{/* <Comments /> */}
					<h1>Comments here</h1>
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
	const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

	console.log(data)
	return {
		props: {
			postDetails: data,
		},
	}
}

export default Details
