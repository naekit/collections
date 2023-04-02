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

const Navbar = () => {
	const user = false

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
				{user ? (
					<div>Logged In</div>
				) : (
					<GoogleLogin
						onSuccess={(res) => createOrGetUser(res)}
						onError={() => console.log("error")}
					/>
				)}
			</div>
		</div>
	)
}

export default Navbar
