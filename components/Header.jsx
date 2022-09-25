import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
	return (
		<>
			<div>
				<nav class="bg-white dark:bg-gray-800  shadow ">
					<div class="max-w-7xl mx-auto px-8">
						<div class="flex items-center justify-between h-16">
							<div class="w-full justify-between flex items-center">
								<a
									href="#"
									class="text-2xl font-extrabold text-gray-600 transition-colors duration-300 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
								>
									Brand
								</a>
								<div class="hidden md:block">
									{/* <div class="ml-10 flex items-baseline space-x-4">
										<Link
											class="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
											href="/#"
										>
											Home
										</Link>
									<Link
											class="text-gray-800 dark:text-white  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
											href="/#"
										>
											Gallery
										</Link>
										<Link
											class="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
											href="/#"
										>
											Content
										</Link>
										<Link
											class="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
											href="/#"
										>
											Contact
										</Link>
									</div> */}

									<button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
										Connect Wallet
									</button>
								</div>
							</div>
							<div class="block">
								<div class="ml-4 flex items-center md:ml-6"></div>
							</div>
							<div class="-mr-2 flex md:hidden">
								<button class="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
									<svg
										width="20"
										height="20"
										fill="currentColor"
										class="h-8 w-8"
										viewBox="0 0 1792 1792"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
					<div class="md:hidden">
						<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
							<Link
								class="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
								href="/#"
							>
								Home
							</Link>
							<Link
								class="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
								href="/#"
							>
								Gallery
							</Link>
							<Link
								class="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
								href="/#"
							>
								Content
							</Link>
							<Link
								class="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
								href="/#"
							>
								Contact
							</Link>
						</div>
					</div>
				</nav>
			</div>
		</>
	);
}
