import { createClient } from "@sanity/client"

export const client = createClient({
	projectId: "3fpk709c",
	dataset: "production",
	apiVersion: "2022-03-10",
	useCdn: false,
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})
