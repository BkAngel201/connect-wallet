import { useEffect, useRef, useState } from "react";
import React from "react";
import Utils from "../static/utils";
import WalletButton from "./WalletButton";
import WalletIcon from "./WalletIcon";


interface WalletConnected  {
    name: string,
    label: string,
    icon: string,
    backgroundColor?: string
}

function ConnectModal({ 
        cryptoWallets, 
        openConnectModal, 
        setOpenConnectModal, 
        connectToWallet, 
        connectionWaitingResponse, 
        connectionMessage, 
        setConnectionMessage, 
        walletConnected, 
        connectedAccount, 
        disconnectFromWallet, 
        verifyConnectionToWallet, 
        sendVerificationSignatureToWallet, 
        globalSignature, 
        connectionVerified, 
        providerConnected, 
        ethereumObj 
    } : { 
        cryptoWallets: Array<WalletConnected>, 
        openConnectModal: Boolean, 
        setOpenConnectModal: Function, 
        connectToWallet: Function, 
        connectionWaitingResponse: Boolean, 
        connectionMessage: string | null, 
        setConnectionMessage: Function, 
        walletConnected: Boolean | null, 
        connectedAccount: string | null, 
        disconnectFromWallet: Function, 
        verifyConnectionToWallet: Function, 
        sendVerificationSignatureToWallet: Function, 
        globalSignature: string | null, 
        connectionVerified: Boolean | null, 
        providerConnected: string | null, 
        ethereumObj: any 
    }) {
    //UseState
    const [walletSelected, setWalletSelected] = useState<WalletConnected | null>(null)

    //UseRef Variable
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (providerConnected) {
            let wallet = cryptoWallets.find((cW: any) => cW.name == providerConnected)
            setWalletSelected(wallet!)
        } else {
            setWalletSelected(null)
        }

    }, [providerConnected])

    useEffect(() => {
        if (openConnectModal) {
            if (containerRef.current!.classList.contains('open')) {
                containerRef.current!.classList.add('open')
            }
        } else {
            if (containerRef.current!.classList.contains('open')) {
                containerRef.current!.classList.remove('open')
            }
        }
    }, [openConnectModal])

    let cancelWalletSelected = () => {
        setConnectionMessage(null)
        setWalletSelected(null)
    }

    return (
        <div ref={containerRef} className="FooterNav fixed inset-x-0 bottom-0 flex justify-end z-20">
            <div className="reduced h-16 shadow-inner flex items-center shadow-md grow">
                <div className="flex justify-center px-2">
                    {
                        walletConnected ?
                            <WalletIcon size={10} icon={walletSelected!.icon} />
                            : ''
                    }
                </div>
                <div className="flex justify-end grow px-2">
                    {
                        walletConnected ?
                            <div className="pr-2 leading-5">
                                <div className="text-right text-orange-400">
                                    Account
                                </div>
                                <div className="text-white text-ellipsis overflow-hidden">
                                    {Utils.functions.formatWalletAccountShort(connectedAccount)}
                                </div>
                            </div>
                            :
                            ''
                    }
                </div>
                {
                    walletConnected ?
                        <div className="flex justify-center flex-col">
                            {
                                !globalSignature ?
                                    <button onClick={() => sendVerificationSignatureToWallet()} className="inline-flex justify-center rounded-md border border-transparent bg-orange-500 px-1.5 py-1.5 mr-2 text-sm font-medium text-white hover:bg-orange-400 sm:hidden">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                                            <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                                        </svg>

                                    </button>
                                    :
                                    connectionVerified == false ?
                                        <button onClick={() => verifyConnectionToWallet()} className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-1.5 py-1.5 mr-2 text-sm font-medium text-white hover:bg-red-400 sm:hidden">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        :
                                        connectionVerified == true ?
                                            <button onClick={() => verifyConnectionToWallet()} className="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-1.5 py-1.5 mr-2 text-sm font-medium text-white hover:bg-green-400 sm:hidden">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            :
                                            <button onClick={() => verifyConnectionToWallet()} className="inline-flex justify-center rounded-md border border-transparent bg-slate-500 px-1.5 py-1.5 mr-2 text-sm font-medium text-white hover:bg-slate-400 sm:hidden">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                            }


                        </div>
                        : ''
                }
                <div className="pr-2">
                    {
                        !walletConnected ?
                            <button onClick={() => setOpenConnectModal(true)} className="inline-flex justify-center rounded-md border border-transparent bg-orange-500 px-1 py-1 text-sm font-medium text-white hover:bg-orange-400 sm:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                    <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z" clipRule="evenodd" />
                                </svg>
                            </button> :
                            <button onClick={() =>disconnectFromWallet()} className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-1 py-1 text-sm font-medium text-white hover:bg-red-400 sm:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                    }
                </div>
            </div>
            <div className="expanded h-96 flex flex-col">
                {
                    !walletSelected ?
                        <div className="flex flex-col h-full">
                            <div className="flex justify-center items-center py-4">
                                <h3 className="text-3xl text-white">
                                    Available Wallets
                                </h3>
                            </div>
                            <div className="flex flex-col grow overflow-auto ml-3 mr-1 my-3">
                                <div className="flex flex-col flex-wrap gap-2 pl-2 pr-4 relative h-full">
                                    {
                                        ethereumObj ?
                                            cryptoWallets.map(cW => (
                                                <WalletButton key={cW.name} WalletInfo={cW} setWalletSelected={setWalletSelected} />
                                            ))
                                            :
                                            
                                            <div className="inset-x-0 bottom-0 text-red-500 leading-5">
                                                <div>Error Loading Providers: </div>
                                                <div>{connectionMessage}</div>
                                            </div>
                                    
                                    }

                                </div>
                            </div>
                            <div className="flex h-16 justify-center items-center">
                                <button onClick={() => setOpenConnectModal(false)} className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-400">Cancel</button>
                            </div>
                        </div>
                        :
                        <div className="flex flex-col justify-center items-center mt-4 relative h-full">
                            <div className="text-white text-3xl">
                                {walletSelected.label}
                            </div>
                            <div className="grow relative">
                                <img className="w-64 opacity-40" src={walletSelected.icon} />
                                {
                                    connectionMessage &&
                                    <div className="absolute inset-x-0 bottom-0 text-red-500 leading-5">
                                        {connectionMessage}
                                    </div>
                                }

                            </div>

                            {
                                !connectionWaitingResponse ?
                                    <div className="flex h-16 justify-center w-full relative">
                                        <div className="w-full flex justify-end items-center pr-4">
                                            <button onClick={cancelWalletSelected} className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-400">
                                                Cancel
                                            </button>
                                        </div>
                                        <div className="w-full flex justify-start items-center pl-4">
                                            <button onClick={() => connectToWallet(walletSelected.name)} className="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-400">
                                                Connect
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    <div className="absolute inset-x-0 bottom-0 flex justify-center">
                                        <img className="animate-spin h-24" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZyBmaWxsPSIjZmZmIj4KICA8cGF0aCBkPSJtMjEyLjU3IDM1OC4xLTMyLjE5OS03LjcwN2MtMS44ODI4IDE0LjM3MS0yLjE3NTggMjguOTA2LTAuODk0NTMgNDMuMzU1bDMzLjcxOSA1LjA1MDhjLTEuODY3Mi0xMy40OTItMi4wODk4LTI3LjE2OC0wLjYyNS00MC42OTl6Ii8+CiAgPHBhdGggZD0ibTIyNS4xMSAzMTAuNTQtMjguOTUzLTE1Ljg5NWMtNS40MDIzIDExLjk4NC05LjU1NDcgMjQuMzkxLTEyLjQ1MyAzNy4wNTVsMzIuMDIgNy42NTYyYzIuMjMwNS05LjgwODYgNS4zNDM4LTE5LjQ2NSA5LjM4NjctMjguODE2eiIvPgogIDxwYXRoIGQ9Im0yNjEuODQgMjU3LjU2LTIyLjg1OS0yMy43MjdjLTIuMTY0MSAyLjA3ODEtNC4yMzgzIDQuMjE0OC02LjI4NTIgNi4zNzVsMjIuODkxIDIzLjc0MmMyLjAxMTctMi4xODM2IDQuMDk3Ny00LjMyMDMgNi4yNTM5LTYuMzkwNnoiLz4KICA8cGF0aCBkPSJtMjQzLjQzIDI3OC42NC0yMy4xNDEtMjQuMDA4Yy01Ljc5MyA3LjQwNjItMTAuOTUzIDE1LjE0MS0xNS41MjMgMjMuMTI1bDI4Ljg3NSAxNS44NjNjMi45NzY2LTUuMTEzMyA2LjIzMDUtMTAuMTI5IDkuNzg5MS0xNC45OHoiLz4KICA8cGF0aCBkPSJtNTY0LjQ5IDMxNy40NS0zMy42MTMgMy4yNDIyYzE1Ljc0MiA0NC4zNDggMTEuODk4IDk0LjAyNy0xMS4zNTIgMTM1LjYxbDE4LjM3NSAzMi42NzZjMzUuMzEyLTUwLjU1MSA0NC4yODEtMTE0LjIyIDI2LjU5LTE3MS41MnoiLz4KICA8cGF0aCBkPSJtMjU3LjU3IDQ5MC4xM2MtMS40NDUzLTEuNTA3OC0yLjc4OTEtMy4wNzAzLTQuMTY0MS00LjYxNzJsLTM3LjE4OCA2LjM3ODljNS4zMjgxIDcuMzMyIDExLjE2IDE0LjM5OCAxNy42MjUgMjEuMDk4IDEyLjMxMiAxMi43ODEgMjUuOTY5IDIzLjUwOCA0MC41MDggMzIuMjI3bDQxLjg4My0xNi4wNTFjLTIxLjUyMy04LjM1NTUtNDEuNjEzLTIxLjM0OC01OC42NjQtMzkuMDM1eiIvPgogIDxwYXRoIGQ9Im0zNjEuMTcgNTM5LjY4LTU0LjgyOCAyMS4wMTZjMjQuMzU5IDkuMTQwNiA1MC4xOCAxMy4zMjggNzUuOTA2IDEyLjUzNWwxMi42NDUtMzMuOTQ1Yy0xMS4yMDMgMS4yODEyLTIyLjUgMS40MDYyLTMzLjcyMyAwLjM5NDUzeiIvPgogIDxwYXRoIGQ9Im00OTAuMTQgNDk0LjQxYy0xOS4wNzggMTguMzk1LTQxLjUwOCAzMS4yMTEtNjUuMjYyIDM4LjU2MmwtMTMuODc1IDM3LjI0NmMzNy4xOC02LjY0NDUgNzIuODQ4LTIzLjk1NyAxMDIuMDItNTIuMDc4IDIuNTM1Mi0yLjQ0MTQgNC45ODQ0LTQuOTQ5MiA3LjM1OTQtNy40ODgzbC0xNy4xNTItMzAuNDk2Yy00LjA0NjkgNC45NDUzLTguMzgyOCA5LjcxNDgtMTMuMDk0IDE0LjI1NHoiLz4KICA8cGF0aCBkPSJtMjE3LjE4IDQxOC41Ny0zNC45MzgtNS4yMzA1YzMuNjA5NCAxOC45MTggMTAuMDYyIDM3LjM4NyAxOS4yMyA1NC44MTJsMzQuNTUxLTUuOTE4Yy04LjQ3NjYtMTMuNzctMTQuNzk3LTI4LjQ3My0xOC44NDQtNDMuNjY0eiIvPgogIDxwYXRoIGQ9Im00OTQuNDUgMjYxLjgyYzEwLjAzOSAxMC40MjIgMTguNDIyIDIxLjg1NSAyNS4xNjggMzMuOTQ1bDM1LjIwNy0zLjQwMjNjLTguOTY4OC0xOS4yMTEtMjEuMTM3LTM3LjMwMS0zNi42NjQtNTMuMzk1LTUyLjg4Ny01NC44ODctMTMwLjEzLTcyLjQyNi0xOTguNjEtNTIuMTA5bDI2LjQ1NyAyNy40NjljNTIuNDkyLTkuNjUyMyAxMDguNyA2LjI3NzMgMTQ4LjQ0IDQ3LjQ5MnoiLz4KIDwvZz4KPC9zdmc+Cg==" />
                                    </div>
                            }



                        </div>
                }


            </div>
        </div>
    )
}

export default ConnectModal;

