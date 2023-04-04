import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import { GoVerified } from "react-icons/go"
import { MdOutlineCancel } from "react-icons/md"
import { BsFillPlayFill } from "react-icons/bs"
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi"
import axios from "axios"
import { BASE_URL } from "@/utils"
import { Video } from "@/types"

const Details = ({ postDetails }: { postDetails: Video }) => {
	return (
		<div>
			<h1>Details</h1>
		</div>
	)
}

export const getServerSideProps = async ({
	params,
}: {
	params: { id: string }
}) => {
	const { id } = params
	const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

	console.log(data)
	return {
		props: {
			data,
		},
	}
}

export default Details
