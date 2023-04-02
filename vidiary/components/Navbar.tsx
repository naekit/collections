import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { GoogleLogin, googleLogout } from "@react-oauth/google"
import { AiOutlineLogout } from "react-icons/ai"
import { BiSearch } from "react-icons/bi"
import { IoMdAdd } from "react-icons/io"
import Logo from "@/utils/vidiarylogo.svg"
import { createOrGetUser } from "@/utils"
import useAuthStore from "@/store/authStore"

const Navbar = () => {
	const { userProfile, addUser, removeUser } = useAuthStore()

	return (
		<div className="w-full flex justify-between items-center bg-gray-950 py-2 px-4 shadow-2xl">
			<Link href="/">
				<div className="w-[100px] md:w-[130px]">
					<Image
						className="cursor-pointer"
						src={Logo}
						alt="Vidiary"
						priority
					/>
				</div>
			</Link>
			<div className="text-white">Search</div>
			<div>
				{userProfile ? (
					<div className="text-white font-semibold flex gap-5 md:gap-5 items-center">
						<Link href="/upload">
							<button className="border-2 p-2 md:px-4 text-md flex items-center gap-2">
								<IoMdAdd className="text-2xl cursor-pointer" />{" "}
								<span className="hidden md:block">Upload</span>
							</button>
						</Link>
						{userProfile?.image && (
							<Link href="/">
								<Image
									className="rounded-md cursor-pointer border-2"
									src={userProfile?.image}
									alt="Profile image"
									width={44}
									height={44}
								/>
							</Link>
						)}
						<button
							onClick={() => {
								googleLogout()
								removeUser()
							}}
						>
							<AiOutlineLogout
								className="text-3xl cursor-pointer hover:scale-105"
								color="red"
							/>
						</button>
					</div>
				) : (
					<GoogleLogin
						onSuccess={(res) => createOrGetUser(res, addUser)}
						onError={() => console.log("error")}
					/>
				)}
			</div>
		</div>
	)
}

export default Navbar
