import React, { useState } from "react"
import { NextPage } from "next"
import { useRouter } from "next/router"
import Link from "next/link"
import GoogleLogin from "react-google-login"
import { AiFillHome, AiOutlineMenu } from "react-icons/ai"
import { ImCancelCircle } from "react-icons/im"
import Discover from "./Discover"
import Suggested from "./Suggested"
import Footer from "./Footer"

const Sidebar = () => {
	const [showSidebar, setShowSidebar] = useState(true)

	const userProfile = false

	const normalLink = `flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded`

	return (
		<div>
			<div
				onClick={() => setShowSidebar((prev) => !prev)}
				className="block xl:hidden m-2 ml-4 mt-3 text-xl"
			>
				{showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
			</div>
			{showSidebar && (
				<div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-700 xl:border-0 p-3">
					<div className="xl:border-b-2 border-gray-700 xl:pb-4">
						<Link href="/">
							<div className={normalLink}>
								<p className="text-2xl">
									<AiFillHome />
								</p>
								<span className="text-xl hidden xl:block">
									For you
								</span>
							</div>
						</Link>
					</div>
					{!userProfile && (
						<div className="px-2 py-4 hidden xl:block">
							<p className="text-gray-400">
								Login to like and comment on videos
							</p>
							<div>
								<GoogleLogin
									clientId=""
									render={(renderProps) => (
										<button
											onClick={renderProps.onClick}
											disabled={renderProps.disabled}
											className="bg-black text-lg text-white font-semibold py-3 px-6 rounded mt-4 border outline-none w-full hover:bg-gray-800 transition-all delay-50 cursor-pointer border-gray-500"
										>
											Log in
										</button>
									)}
									onSuccess={() => {}}
									onFailure={() => {}}
									cookiePolicy="single_host_origin"
								/>
							</div>
						</div>
					)}
					<Discover />
					<Suggested />
					<Footer />
				</div>
			)}
		</div>
	)
}

export default Sidebar
