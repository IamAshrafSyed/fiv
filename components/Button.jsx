import React from "react";

export default function Button() {
	return (
		<>
			<div class="flex justify-center justify-evenly pt-48">
				<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
					Withdraw Funds
				</button>
				<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
					Transfers Funds
				</button>
			</div>
		</>
	);
}
