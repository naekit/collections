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

const Details = ({ postDetails }: { postDetails: Video }) => {
	const [post, setPost] = useState<Video>(postDetails)
	const videoRef = React.useRef<HTMLVideoElement>(null)
	const [isMuted, setIsMuted] = useState<boolean>(false)
	const [isPlaying, setIsPlaying] = useState<boolean>(false)
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
			<div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
				<div className="flex items-center gap-4">
					<Image
						src={post.postedBy.image}
						width={40}
						height={40}
						className="rounded-full"
						alt="user"
					/>
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
