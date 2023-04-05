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
	const { allUsers } = useAuthStore()

	const router = useRouter()

	const searchTerm = router.query.searchTerm as string

	const accounts = isAccounts ? `border-b-2 border-black` : `text-gray-400`
	const isVideos = !isAccounts ? `border-b-2 border-black` : `text-gray-400`

	const searchedAccounts: IUser[] = allUsers.filter(
		(user: IUser): user is IUser => {
			return user.username
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
		}
	)

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
					<div className="flex flex-wrap gap-6 md:justify-start">
						{searchedAccounts.length > 0 ? (
							searchedAccounts.map((user) => (
								<div className="w-full" key={user._id}>
									<Link
										href={`/profile/${user._id}`}
										key={user._id}
									>
										<div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded-md items-center">
											<div>
												<Image
													src={user.image}
													alt="user image"
													width={50}
													height={50}
													className="rounded-md"
												/>
											</div>
											<div className="hidden xl:block ">
												<p className="flex gap-1 items-center text-xl font-bold text-primary lowercase">
													{user.username.replaceAll(
														" ",
														""
													)}
													<GoVerified className="text-blue-800" />
												</p>
												<p className="text-gray-400 text-xs">
													{user.username}
												</p>
											</div>
										</div>
									</Link>
								</div>
							))
						) : (
							<NoResults
								text={`No results for "${searchTerm}"`}
							/>
						)}
					</div>
				) : (
					<div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
						{videos?.length > 0 ? (
							videos.map((video: Video) => (
								<VideoCard key={video._id} post={video} />
							))
						) : (
							<NoResults
								text={`No results for "${searchTerm}"`}
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
