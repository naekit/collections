import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { useState, useEffect } from "react"
import Sidebar from "@/components/Sidebar"
import Navbar from "../components/Navbar"

export default function App({ Component, pageProps }: AppProps) {
	const [isSSR, setSSR] = useState(true)

	useEffect(() => {
		setSSR(false)
	}, [])

	if (isSSR) return null

	return (
		<div>
			<Navbar />
			<div className="flex gap-6 md:gap-20">
				<div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
					<Sidebar />
				</div>
				<div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
					<Component {...pageProps} />
				</div>
			</div>
		</div>
	)
}
