import React from "react"
import { footerList1, footerList2, footerList3 } from "@/utils/constants"

const List = ({ list, mt }: { list: string[]; mt: boolean }) => {
	return (
		<div className={`flex flex-wrap gap-2 ${mt ? "mt-5" : ""}`}>
			{list.map((item: string) => (
				<p
					key={item}
					className="text-gray-400 text-sm hover:underline cursor-pointer"
				>
					{item}
				</p>
			))}
		</div>
	)
}

const Footer = () => {
	return (
		<div className="mt-6 hidden xl:block">
			<List list={footerList1} mt={false} />
			<List list={footerList2} mt />
			<List list={footerList3} mt />
			<p className="text-gray-400 text-sm">2023 Vidiary</p>
		</div>
	)
}

export default Footer
