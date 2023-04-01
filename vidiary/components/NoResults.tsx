import React from "react"

interface Props {
	text: string
}

const NoResults = ({ text }: Props) => {
	return (
		<div>
			<h1>NoResults</h1>
		</div>
	)
}

export default NoResults
