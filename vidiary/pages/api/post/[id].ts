// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from "@/utils/client"
import { postDetailQuery } from "@/utils/queries"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const { id } = req.query as { id: string }
		const query = postDetailQuery(id)

		const data = await client.fetch(query)
		res.status(200).json(data[0])
	}
}
