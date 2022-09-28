import React from "react";
import axios from "axios";
import abi from "./abi.js";
import tokenAbi from "./tokenabi.js";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";

export const injected = new InjectedConnector();

export default function Button() {
	//address of the vault contract
	const contractAddress = "0x5FFB2a4c7B55e67Cc465734Aa642B29D6D252dA0";
	//address of the token contract
	const tokenAddress = "0x0179C0C4CF03636BA99E9427FcEA4654736647EB";
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
		if (active) {
			const value = ethers.utils.parseEther(e.target.value.value);
			console.log(value);
			e.target.reset();

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
		} else {
			console.log("User not connected metamask");
		}
	};
	async function submitWithDraw(j) {
		if (active) {
			const signer = provider.getSigner();
			//contract deployment address..
			//const contractAddress = "0xb70643AcA2315120426218590b47df2738643622";
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
				const val = response.data.value;

				submitTransfer(address, val);
			});
	};

	async function submitTransfer(a, r) {
		// console.log(a);
		const s = ethers.utils.parseEther(r.toString());
		if (active) {
			const signer = provider.getSigner();
			const contract = new ethers.Contract(contractAddress, abi, signer);
			try {
				await contract.SendTokenToothers(a, s);
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log("User not connected with metamask");
		}
	}
	//approve function
	async function handleApprove(e) {
		e.preventDefault();
		const amount = ethers.utils.parseEther(e.target.value.value);
		e.target.reset();

		if (active) {
			const signer = provider.getSigner();
			const contract1 = new ethers.Contract(tokenAddress, tokenAbi, signer);
			try {
				await contract1.approve(contractAddress, amount);
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log("User not connected with metamask");
		}
	}
	//deposit function
	async function handleDeposit(e) {
		e.preventDefault();
		const amo = ethers.utils.parseEther(e.target.value.value);
		e.target.reset();
		if (active) {
			const signer = provider.getSigner();
			const contract = new ethers.Contract(contractAddress, abi, signer);
			try {
				await contract.deposit(amo);
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log("User not connected with metamask");
		}
	}

	return (
		<>
			<div className="flex  justify-evenly pt-48">
				<div>
					<form onSubmit={handleApprove}>
						<div>
							<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								Approve amount
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
							Approve
						</button>
					</form>
				</div>
				<div>
					<form onSubmit={handleDeposit}>
						<div>
							<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								Deposit amount
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
							Deposit
						</button>
					</form>
				</div>
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
