import React from "react"
import { BiCommentX } from "react-icons/bi"
import { MdOutlineVideocamOff } from "react-icons/md"

interface Props {
	text: string
}

const NoResults = ({ text }: Props) => {
	return (
		<div className="flex flex-col justify-center items-center h-full w-full">
			<p className="text-8xl">
				{text === "No comments yet" ? (
					<BiCommentX />
				) : (
					<MdOutlineVideocamOff />
				)}
			</p>
			<p className="text-2xl text-gray-400">{text}</p>
		</div>
	)
}

export default NoResults
