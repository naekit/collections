import useAuthStore from "@/store/authStore"
import { BASE_URL } from "@/utils"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { GoVerified } from "react-icons/go"
import { IUser, Video } from "../../types"
import VideoCard from "@/components/VideoCard"
import NoResults from "@/components/NoResults"

const Search = ({ videos }: { videos: Video[] }) => {
	const [isAccounts, setIsAccounts] = useState<boolean>(false)

	const router = useRouter()

	const accounts = isAccounts ? `border-b-2 border-black` : `text-gray-400`
	const isVideos = !isAccounts ? `border-b-2 border-black` : `text-gray-400`

	return (
		<div className="w-full">
			<div>
				<div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
					<p
						className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
						onClick={() => setIsAccounts(true)}
					>
						Accounts
					</p>
					<p
						className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
						onClick={() => setIsAccounts(false)}
					>
						Videos
					</p>
				</div>
				{isAccounts ? (
					<div>
						<h1>Accounts</h1>
					</div>
				) : (
					<div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
						{videos?.length > 0 ? (
							videos.map((video: Video) => (
								<VideoCard key={video._id} post={video} />
							))
						) : (
							<NoResults
								text={`No results for "${router.query.searchTerm}"`}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export const getServerSideProps = async ({
	params,
}: {
	params: { searchTerm: string }
}) => {
	const { searchTerm } = params

	const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)
	return {
		props: {
			videos: data,
		},
	}
}

export default Search
