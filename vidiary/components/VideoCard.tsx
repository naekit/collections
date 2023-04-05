import { Video } from "@/types"
import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi"
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from "react-icons/bs"
import { GoVerified } from "react-icons/go"
import { useEffect, useRef, useState } from "react"

interface Props {
	post: Video
}

const VideoCard: NextPage<Props> = ({ post }) => {
	const [isHover, setIsHover] = useState(false)
	const [isMuted, setIsMuted] = useState(false)
	const [isPlaying, setIsPlaying] = useState(false)
	const videoRef = useRef<HTMLVideoElement>(null)

	const onVideoPress = () => {
		if (isPlaying) {
			videoRef?.current?.pause()
			setIsPlaying(false)
		} else {
			videoRef?.current?.play()
			setIsPlaying(true)
		}
	}

	useEffect(() => {
		if (post && videoRef.current) {
			videoRef.current.muted = isMuted
		}
	}, [isMuted])

	return (
		<div className="flex flex-col border-b-2 border-gray-800 pb-6">
			<div>
				<div className="flex gap-3 p-0 cursor-pointer font-semibold rounded">
					<div className="md:w-16 md:h-16 w-10 h-10">
						<Link href={`/profile/${post.postedBy._id}`}>
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
						<Link href={`/profile/${post.postedBy._id}`}>
							<div className="flex items-center gap-1">
								<p>{post.postedBy.username}</p>
								<GoVerified className="text-blue-800" />
							</div>
						</Link>
					</div>
				</div>
			</div>
			<div className="lg:ml-20 flex gap-4 relative pr-4">
				<div
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
					className="rounded-md p-10 md:p-12 border-2 bg-gray-50 border-gray-950"
				>
					<Link href={`/details/${post._id}`}>
						<video
							src={post.video.asset.url}
							ref={videoRef}
							loop
							className="cursor-pointer border-4 border-gray-950 rounded-md"
						></video>
					</Link>
					{isHover && (
						<div className="flex justify-between">
							{isPlaying ? (
								<BsFillPauseFill
									onClick={onVideoPress}
									className="text-4xl text-black absolute bottom-0 left-8 object-none m-2 inline"
								/>
							) : (
								<BsFillPlayFill
									onClick={onVideoPress}
									className="text-4xl text-black absolute bottom-0 left-8 object-none m-2 inline"
								/>
							)}
							{isMuted ? (
								<HiVolumeOff
									onClick={() => setIsMuted(false)}
									className="text-4xl text-black absolute bottom-0 right-10 object-none m-2 inline"
								/>
							) : (
								<HiVolumeUp
									onClick={() => setIsMuted(true)}
									className="text-4xl text-black absolute bottom-0 right-10 object-none m-2 inline"
								/>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default VideoCard
