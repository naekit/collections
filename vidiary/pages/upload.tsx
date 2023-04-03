import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { FaCloudUploadAlt } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import axios from "axios"

import useAuthStore from "@/store/authStore"
import { client } from "@/utils/client"
import { SanityAssetDocument } from "@sanity/client"
import { topics } from "@/utils/constants"

const Upload = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [videoAsset, setVideoAsset] = useState<SanityAssetDocument>()
	const [wrongType, setWrongType] = useState(false)

	const uploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return
		const file = e.target.files[0]
		const fileTypes = ["video/mp4", "video/webm", "video/ogg"]
		if (fileTypes.includes(file.type)) {
			client.assets
				.upload("file", file, {
					contentType: file.type,
					filename: file.name,
				})
				.then((data) => {
					setVideoAsset(data)
					setIsLoading(false)
				})
		} else {
			setIsLoading(false)
			setWrongType(true)
		}
	}

	return (
		<div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-gray-100 justify-center">
			<div className="bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6">
				<div>
					<div>
						<p className="text-2xl font-bold">Upload Video</p>
						<p className="text-md text-gray-400 mt-1">
							Post a video to your account
						</p>
					</div>
					<div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[800px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
						{isLoading ? (
							<p>Uploading...</p>
						) : (
							<div>
								{videoAsset ? (
									<div>
										<video
											src={videoAsset.url}
											controls
											loop
											className="rounded-xl h-full w-full bg-black"
										></video>
									</div>
								) : (
									<label className="cursor-pointer">
										<div className="flex flex-col items-center justify-center h-full">
											<div className="flex flex-col items-center justify-center">
												<p className="font-bold text-xl">
													<FaCloudUploadAlt className="text-6xl text-gray-400" />
												</p>
												<p className="text-xl font-semibold">
													Select a video to upload
												</p>
											</div>
											<p className="text-gray-400 text-center mt-5 text-sm leading-10">
												MP4 or WebM or ogg <br />
												720x1280 or higher <br />
												Up to 10 minutes <br />
												Less than 2GB <br />
											</p>
											<p className="bg-gray-950 text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
												Select File
											</p>
										</div>
										<input
											type="file"
											className="hidden"
											name="upload-video"
											onChange={uploadVideo}
										/>
									</label>
								)}
							</div>
						)}
						{wrongType && (
							<p className="text-red-500 text-center text-xl font-semibold mt-4 w-[250px]">
								Please select a video file
							</p>
						)}
					</div>
				</div>
				<div className="flex flex-col gap-3 pb-10">
					<label className="text-md font-medium">Caption</label>
					<input
						type="text"
						className="border-2 border-gray-200 rounded p-2 outline-none"
						value=""
						onChange={() => {}}
					/>
					<label className="text-md font-medium">
						Choose a category
					</label>
					<select
						className="border-2 border-gray-200 bg-white rounded p-2 lg:p-4 cursor-pointer outline-none text-md capitalize"
						value=""
						onChange={() => {}}
					>
						{topics.map((topic) => (
							<option
								key={topic.name}
								value={topic.name}
								className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
							>
								{topic.name}
							</option>
						))}
					</select>
					<div className="flex gap-6 mt-10">
						<button
							onClick={() => {}}
							className="bg-gray-50 border-2 text-gray-950 font-semibold p-2 rounded w-32 hover:bg-gray-200"
						>
							Cancel
						</button>
						<button
							onClick={() => {}}
							className="bg-gray-950 text-white font-semibold p-2 rounded w-32"
						>
							Post
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Upload