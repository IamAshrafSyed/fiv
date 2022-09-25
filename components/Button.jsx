import React from "react";
import axios from "axios";
import abi from "./abi.js";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";

export const injected = new InjectedConnector();

export default function Button() {
	const {
		active,
		activate,
		chainId,
		deactivate,
		account,
		library: provider,
	} = useWeb3React();

	// withdraw function
	const handleSubmitWithdraw = (e) => {
		e.preventDefault();
		// console.log(event.target.value.value);
		const value = e.target.value.value;

		submitWithDraw(value);
		// axios
		// 	.post("http://localhost:3000/api/withdrawtokens", {
		// 		address: { account },
		// 		value,
		// 	})
		// 	.then((response) => {
		// 		console.log(response);
		// 		e.target.reset();
		// 	});
	};
	async function submitWithDraw(j) {
		if (active) {
			const signer = provider.getSigner();
			const contractAddress = "0x15696b4483836c23883aa2B8A96E6D6b9E6ef5Fb";
			const contract = new ethers.Contract(contractAddress, abi, signer);
			try {
				await contract.WithDraw(j);
			} catch (error) {
				console.log(error);
			}
		}
	}

	//transfer function
	const handleSubmitTransfer = (e) => {
		e.preventDefault();
		const address = e.target.address.value;
		// console.log(e.target.address.value);
		axios
			.post("http://localhost:3000/api/sendtokens", {
				address,
			})
			.then((response) => {
				e.target.reset();
				//console.log(response.data.value);
				const val = response.data.value;
				submitTransfer(address, val);
			});
	};

	async function submitTransfer(a, r) {
		console.log(a);
		console.log(r);
		if (active) {
			const signer = provider.getSigner();
			const contractAddress = "0x15696b4483836c23883aa2B8A96E6D6b9E6ef5Fb";
			const contract = new ethers.Contract(contractAddress, abi, signer);
			try {
				await contract.SendTokenToothers(a, r);
			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<>
			<div className="flex justify-center justify-evenly pt-48">
				<div>
					<form onSubmit={handleSubmitWithdraw}>
						<div>
							<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								Withdraw Tokens
							</label>
							<input
								type="text"
								id="value"
								name="value"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="100000000"
								required
							/>
						</div>
						<button
							type="submit"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Withdraw
						</button>
					</form>
				</div>
				<div>
					<form onSubmit={handleSubmitTransfer}>
						<div>
							<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								Transfer to
							</label>
							<input
								type="text"
								id="address"
								name="address"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="0x000000000000000000000000"
								required
							/>
						</div>
						<button
							type="submit"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Transfer
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
