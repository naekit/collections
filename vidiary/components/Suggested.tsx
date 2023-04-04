import useAuthStore from "@/store/authStore"
import { IUser } from "@/types"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect } from "react"
import { GoVerified } from "react-icons/go"

const Suggested = () => {
	const { fetchAllUsers, allUsers } = useAuthStore()

	useEffect(() => {
		fetchAllUsers()
	}, [fetchAllUsers])

	return (
		<div className="xl:border-b-2 border-gray-200 pb-4">
			<p className="text-gray-400 font-semibold m-3 mt-4 hidden xl:block">
				Suggested Accounts
			</p>
			<div>
				{allUsers.slice(0, 6).map((user: IUser) => (
					<Link href={`/profile/${user._id}`} key={user._id}>
						<div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded items-center">
							<div className="w-8 h-8">
								<Image
									src={user.image}
									alt="user image"
									width={40}
									height={40}
									className="rounded-sm"
								/>
							</div>
							<div className="hidden xl:block ">
								<p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
									{user.username.replaceAll(" ", "")}
									<GoVerified className="text-blue-800" />
								</p>
								<p className="text-gray-400 text-xs">
									{user.username}
								</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Suggested
