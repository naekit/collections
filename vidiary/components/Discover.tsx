import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { topics } from "@/utils/constants"

const Discover = () => {
	const router = useRouter()
	const { topic: active } = router.query

	const activeTopic =
		"xl:border-2 bg-gray-950 xl:border-gray-300 px-3 py-2 rounded xl:rounded-md flex items-center gap-2 cursor-pointer text-white"

	const topicStyle =
		"xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-md flex items-center gap-2 cursor-pointer text-black"

	return (
		<div className="xl:border-b-2 xl:border-gray-700">
			<p className="text-gray-600 font-semibold m-3 mt-4 hidden xl:block">
				Popular Topics
			</p>
			<div className="flex flex-wrap gap-3 m-3">
				{topics.map((topic) => (
					<Link href={`/?topic=${topic.name}`} key={topic.name}>
						<div
							className={
								active === topic.name ? activeTopic : topicStyle
							}
						>
							{topic.icon}
							<span className="m-2 font-medium text-base hidden xl:block capitalize">
								{topic.name}
							</span>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Discover
