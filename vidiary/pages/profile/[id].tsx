import NoResults from "@/components/NoResults"
import VideoCard from "@/components/VideoCard"
import axios from "axios"
import Image from "next/image"
import React, { useEffect, useState } from "react"

import { GoVerified } from "react-icons/go"
import { IUser, Video } from "@/types"
import useAuthStore from "@/store/authStore"
import { BASE_URL } from "@/utils"

interface ProfileProps {
	data: { user: IUser; videos: Video[]; userLikedVideos: Video[] }
}

const Profile = ({ data }: ProfileProps) => {
	return (
		<div>
			<h1>Profile</h1>
		</div>
	)
}

export const getServerSideProps = async ({
	params,
}: {
	params: { id: string }
}) => {
	const { id } = params

	const { data } = await axios.get(`${BASE_URL}/api/profile/${id}`)

	return {
		props: {
			data,
		},
	}
}

export default Profile
