import axios from "axios"
import jwtDecode from "jwt-decode"

export const createOrGetUser = async (res: any) => {
	const decoded: { name: string; picture: string; sub: string } = jwtDecode(
		res.credential
	)

	const { name, picture, sub } = decoded

	const user = {
		_id: sub,
		_type: "user",
		username: name,
		image: picture,
	}

	await axios.post("http://localhost:3000/api/auth", user)
}
