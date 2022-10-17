import logo from '../logo.svg';
import Utils from '../static/utils';

function NavBar({ 
		setOpenConnectModal, 
		disconnectFromWallet, 
		connectedAccount, 
		walletConnected, 
		openSideMenu, 
		setOpenSideMenu, 
		verifyConnectionToWallet, 
		sendVerificationSignatureToWallet, 
		globalSignature, 
		connectionVerified 
	} : { 
		setOpenConnectModal: Function, 
		disconnectFromWallet: Function, 
		connectedAccount: string | null, 
		walletConnected: Boolean | null, 
		openSideMenu: Boolean | null, 
		setOpenSideMenu: Function, 
		verifyConnectionToWallet: Function, 
		sendVerificationSignatureToWallet: Function, 
		globalSignature: string | null, 
		connectionVerified: Boolean | null 
	}) {

	let openSideMenuHandler = () => {
		setOpenSideMenu(!openSideMenu)
	}

	return (
		<div className="NavBar fixed inset-x-0 top-0 h-20 z-40 shadow-md flex ">
			<div className="flex justify-center flex-col pl-3">
				<button onClick={openSideMenuHandler} className="inline-flex justify-center rounded-md border border-transparent bg-orange-500 px-1 py-1 text-sm font-medium text-white hover:bg-orange-400 sm:hidden">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
						<path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
					</svg>
				</button>
			</div>
			<div className="flex justify-center flex-col grow items-center sm:items-start sm:pl-6">
				<img src={logo} className="w-40 sm:w-52" alt="logo" />
			</div>
			{
				walletConnected ?
					<div className="hidden sm:pr-2 sm:leading-5 sm:flex sm:justify-center sm:flex-col relative">
						<div className="text-right text-orange-400">
							Account
						</div>
						<div className="text-white">
							{Utils.functions.formatWalletAccountShort(connectedAccount)}
						</div>

					</div>
					:
					''
			}
			{
				walletConnected ?
					<div className="flex justify-center flex-col">
						{
							!globalSignature ?
								<button onClick={() => sendVerificationSignatureToWallet} className="hidden sm:inline-flex sm:justify-center sm:rounded-md sm:border sm:border-transparent sm:bg-orange-500 sm:px-2 sm:py-1 sm:mr-2 sm:text-sm sm:font-medium sm:text-white sm:hover:bg-orange-400">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
										<path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
										<path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
									</svg>

								</button>
								:
								connectionVerified === false ?
									<button onClick={() => verifyConnectionToWallet()} className="hidden sm:inline-flex sm:justify-center sm:rounded-md sm:border sm:border-transparent sm:bg-red-500 sm:px-2 sm:py-1 sm:mr-2 sm:text-sm sm:font-medium sm:text-white sm:hover:bg-red-400">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
											<path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
										</svg>
									</button>
									:
									connectionVerified === true ?
										<button onClick={() => verifyConnectionToWallet()} className="hidden sm:inline-flex sm:justify-center sm:rounded-md sm:border sm:border-transparent sm:bg-green-500 sm:px-2 sm:py-1 sm:mr-2 sm:text-sm sm:font-medium sm:text-white sm:hover:bg-green-400">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
												<path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
											</svg>
										</button>
										:
										<button onClick={() => verifyConnectionToWallet()} className="hidden sm:inline-flex sm:justify-center sm:rounded-md sm:border sm:border-transparent sm:bg-slate-500 sm:px-2 sm:py-1 sm:mr-2 sm:text-sm sm:font-medium sm:text-white sm:hover:bg-slate-400">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
												<path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
											</svg>
										</button>
						}
					</div>
					: ''
			}
			<div className="flex justify-center flex-col pr-6">
				{
					!walletConnected ?

						<button onClick={() => setOpenConnectModal(true)} className="hidden sm:inline-flex sm:justify-center sm:rounded-md sm:border sm:border-transparent sm:bg-orange-500 sm:px-4 sm:py-1.5 sm:text-sm sm:font-medium sm:text-white sm:hover:bg-orange-400">Connect</button>
						:
						<button onClick={() => disconnectFromWallet()} className="hidden sm:inline-flex sm:justify-center sm:rounded-md sm:border sm:border-transparent sm:bg-red-500 sm:px-4 sm:py-1.5 sm:text-sm sm:font-medium sm:text-white sm:hover:bg-red-400">Disconnect</button>
				}
			</div>
		</div>
	)
}

export default NavBar;