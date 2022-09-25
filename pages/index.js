import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Button from "../components/Button";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";

export const injected = new InjectedConnector();

export default function Home() {
	const [hasMetamask, setHasMetamask] = useState(false);

	useEffect(() => {
		if (typeof window.ethereum !== "undefined") {
			setHasMetamask(true);
		}
	});
	const {
		active,
		activate,
		chainId,
		deactivate,
		account,
		library: provider,
	} = useWeb3React();

	async function connect() {
		if (typeof window.ethereum !== "undefined") {
			try {
				await activate(injected);
				setHasMetamask(true);
			} catch (e) {
				console.log(e);
			}
		}
		if (active) {
			deactivate();
			setHasMetamask(false);
		}
	}

	return (
		<>
			<div>
				<nav className="bg-white dark:bg-gray-800  shadow ">
					<div className="max-w-7xl mx-auto px-8">
						<div className="flex items-center justify-between h-16">
							<div className="w-full justify-between flex items-center">
								<a
									href="#"
									className="text-2xl font-extrabold text-gray-600 transition-colors duration-300 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
								>
									Brand
								</a>
								<div className="hidden md:block">
									{hasMetamask ? (
										active ? (
											<button
												onClick={() => connect()}
												className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
											>
												Connected To - {account}
											</button>
										) : (
											<button
												onClick={() => connect()}
												className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
											>
												Connect
											</button>
										)
									) : (
										"Please install metamask"
									)}
								</div>
							</div>
						</div>
					</div>
				</nav>
			</div>
			<Button />
		</>
	);
}
