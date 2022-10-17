import './App.css';
import { useEffect, useRef, useState } from 'react';
import Web3 from 'web3';
import Utils from './static/utils';
import ConnectModal from './components/ConnectModal';
import NavBar from './components/NavBar';

function App() {
    //UseState Hooks
    const [walletConnected, setWalletConnected] = useState<Boolean | null>(false)
    const [providerConnected, setProviderConnected] = useState<string | null>(null)
    const [ethereumObj, setEthereumObj] = useState<any | null>(null)
    const [connectionMessage, setConnectionMessage] = useState<string | null>(null)
    const [connectedAccount, setConnectedAccount] = useState<string | null>(null)
    const [Web3Provider, setWeb3Provider] = useState<any | null>(null)
    const [verificationMessageSigning, setVerificationMessageSigning] = useState<string | null>(null)
    const [globalSignature, setGlobalSignature] = useState<string | null>(null)
    const [connectionWaitingResponse, setConnectionWaitingResponse] = useState<Boolean | null>(false)
    const [connectionVerified, setConnectionVerified] = useState<Boolean | null>(null)

    //USeState Visuals
    const [openConnectModal, setOpenConnectModal] = useState(false)
    const [openSideMenu, setOpenSideMenu] = useState(false)

    //useRef
    const sideMenuRef = useRef<HTMLDivElement>(null)

    //Data
    const cryptoWallets = [
        {
            name: 'meta',
            label: 'Metamask',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png?20220831120339',
            backgroundColor: 'white'
        },
        {
            name: 'walletC',
            label: 'Wallet Connect',
            icon: 'https://www.pozzleplanet.com/img/wallet-connect.svg',

        }
    ]

    //Behavior UseEffect
    useEffect(() => {
        if (openSideMenu) {
            if (!sideMenuRef.current!.classList!.contains('open')) {
                sideMenuRef.current!.classList.add('open')
            }
        } else {
            if (sideMenuRef.current!.classList.contains('open')) {
                sideMenuRef.current!.classList.remove('open')
            }
        }
    }, [openSideMenu])

    //Functionality UseEffects
    useEffect(() => {
        try {
            let ethereum = window.ethereum;
            if (ethereum) {
                setEthereumObj(ethereum)
                setProviderConnected(localStorage.getItem('ProviderConnected')!)
                if (ethereum.isMetaMask) {
                    setWeb3Provider(new Web3(ethereum))
                } else {
                    setConnectionMessage('MetaMask is not Installed.')
                    console.log('MetaMask is not Installed.')
                }
            } else {
                setConnectionMessage('No Ethereum Compatible Provider Found.')
                console.log('No Ethereum Compatible Provider Found.')
            }
        } catch (err) {
            if (err instanceof Error) {
                setConnectionMessage(err.message)
              } else {
                console.log('Unexpected error', err);
              } 
        }
        
    }, [])

    useEffect(() => {
        if (Web3Provider) {
            if (localStorage.getItem('ProviderConnected') !== 'null') {
                Web3Provider.eth.net.isListening().then((response: any) => {
                    if (response) {
                        setWalletConnected(true)
                        Web3Provider.eth.requestAccounts().then((response: any) => {
                            setConnectedAccount(response[0]);
                        }).catch((err: Error) => {
                            setConnectionMessage(err.message)
                        })
                    }
                }).catch((err: Error) => {
                    setConnectionMessage(err.message)
                })
            }
        }

    }, [Web3Provider])

    let disconnectFromWallet = () => {
        localStorage.setItem('onLoadConnect', "false")
        setConnectionMessage(null)
        setWalletConnected(false)
        setConnectedAccount(null)
        localStorage.setItem('ProviderConnected', 'null')
        setProviderConnected(null)
        setConnectionVerified(null)
    }

    let connectToMetaMask = async (wallet: string) => {
        setConnectionWaitingResponse(true)
        setConnectionMessage(null)
        ethereumObj.request({ method: 'eth_requestAccounts' }).then((res_requestAccounts: any) => {
            ethereumObj!.request({ method: 'eth_accounts' }).then(async (res_accounts: any) => {
                const tempConnectedAccount = res_accounts[0]
                setConnectedAccount(tempConnectedAccount);
                sendMetaMaskVerificationSignature(tempConnectedAccount).then((response: any) => {
                    setProviderConnected(wallet)
                    localStorage.setItem('ProviderConnected', wallet)
                    localStorage.setItem('onLoadConnect', "true")
                    setGlobalSignature(response.signature)
                    setVerificationMessageSigning(response.verifyMessage)
                    setWalletConnected(true)
                    setConnectionWaitingResponse(false)
                    setConnectionMessage(null)
                    setOpenConnectModal(false)
                }).catch(err => {
                    console.log(err)
                    setConnectionMessage(err.message)
                    setConnectionWaitingResponse(false)
                })
            }).catch((err: Error) => {
                setConnectionMessage(err.message)
            })
        }).catch((err: Error)=> {
            setConnectionMessage(err.message)
        })
    }

    let verifyMetaMaskConnection = async () => {
        const recoveredAddress = Web3Provider.eth.accounts.recover(verificationMessageSigning, globalSignature);
        if (recoveredAddress.toLowerCase() === connectedAccount!.toLowerCase()) {
            setConnectionVerified(true)
        } else {
            setConnectionVerified(false)
        }
    }

    let sendMetaMaskVerificationSignature = async (account: string) => {
        return new Promise(async (resolve, reject) => {
            const randomMessage = Utils.functions.generateRandomMessage(20)
            const chainId = await Web3Provider.eth.getChainId()
            const verifyMessage = Utils.functions.generateEIP4361Signature(
                window.location.hostname,
                account,
                `I accept the ServiceOrg Terms of Service: ${window.location.hostname}`,
                window.location.toString(),
                chainId,
                randomMessage,
                new Date().toISOString()
            )
            try {
                const signature = await ethereumObj.request({
                    method: 'personal_sign',
                    params: [verifyMessage, account, randomMessage]
                })
                resolve({ signature, verifyMessage })
            } catch (err) {
                reject(err)
            }
        })

    }

    let connectToWallet = (wallet: string) => {
        switch (wallet) {
            case 'walletC': {
                //Use this case for walletConnect function
                break;
            }
            case 'meta': {
                connectToMetaMask(wallet)
                break;
            }
        }
    }

    let verifyConnectionToWallet = () => {
        switch (localStorage.getItem('ProviderConnected')) {
            case 'walletC': {
                //Use this case for walletConnect function
                break;
            }
            case 'meta': {
                verifyMetaMaskConnection()
                break;
            }
        }
    }

    let sendVerificationSignatureToWallet = () => {
        switch (localStorage.getItem('ProviderConnected')) {
            case 'walletC': {
                //Use this case for walletConnect function
                break;
            }
            case 'meta': {
                console.log('asd')
                sendMetaMaskVerificationSignature(connectedAccount!).then((response: any) => {
                    setGlobalSignature(response.signature)
                    setVerificationMessageSigning(response.verifyMessage)
                }).catch((err: any) => {
                    console.log(err)
                    setConnectionMessage(err.message)
                    setGlobalSignature(null)
                    setVerificationMessageSigning(null)
                })
                break;
            }
        }
    }

    return (
        <div className="App">
            <NavBar walletConnected={walletConnected}
                setOpenConnectModal={setOpenConnectModal}
                disconnectFromWallet={disconnectFromWallet}
                connectedAccount={connectedAccount}
                openSideMenu={openSideMenu}
                setOpenSideMenu={setOpenSideMenu}
                verifyConnectionToWallet={verifyConnectionToWallet}
                sendVerificationSignatureToWallet={sendVerificationSignatureToWallet}
                globalSignature={globalSignature}
                connectionVerified={connectionVerified}
            />
            <div ref={sideMenuRef} className='SideBar fixed inset-y-0 inset-x-0 flex flex-col pt-20 z-30 sm:left-0 sm:w-60'>
                <ul className="grow">
                    <li className="flex justify-center sm:px-5">
                        <button className="flex grow h-14 items-center justify-center sm:justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="hidden sm:inline-block sm:mr-3 sm:w-6 sm:h-6">
                                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                                <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                            </svg>
                            <span>Community</span>
                        </button>
                    </li>
                    <li className="flex justify-center sm:px-5">
                        <button className="flex grow h-14 items-center justify-center sm:justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="hidden sm:inline-block sm:mr-3 sm:w-6 sm:h-6">
                                <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
                            </svg>
                            <span>Dashboard</span>
                        </button>
                    </li>
                    <li className="flex justify-center sm:px-5">
                        <button className="flex grow h-14 items-center justify-center sm:justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="hidden sm:inline-block sm:mr-3 sm:w-6 sm:h-6">
                                <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                                <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd" />
                                <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                            </svg>

                            <span>Sales</span>
                        </button>
                    </li>
                    <li className="flex justify-center sm:px-5">
                        <button className="flex grow h-14 items-center justify-center sm:justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="hidden sm:inline-block sm:mr-3 sm:w-6 sm:h-6">
                                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                            </svg>

                            <span>My Profile</span>
                        </button>
                    </li>
                </ul>
                <div className="flex justify-center py-8">
                    &copy; 2022 Tokensoft, Inc.
                </div>
            </div>
            <ConnectModal
                connectionWaitingResponse={connectionWaitingResponse!}
                setConnectionMessage={setConnectionMessage}
                connectionMessage={connectionMessage}
                connectToWallet={connectToWallet}
                cryptoWallets={cryptoWallets}
                openConnectModal={openConnectModal}
                setOpenConnectModal={setOpenConnectModal}
                walletConnected={walletConnected}
                connectedAccount={connectedAccount}
                disconnectFromWallet={disconnectFromWallet}
                verifyConnectionToWallet={verifyConnectionToWallet}
                sendVerificationSignatureToWallet={sendVerificationSignatureToWallet}
                globalSignature={globalSignature}
                connectionVerified={connectionVerified}
                providerConnected={providerConnected}
                ethereumObj={ethereumObj}
            />
            <div className="MainSection pt-36 flex flex-col items-center sm:ml-60">
                <h1 className="text-white text-4xl font-bold">Welcome</h1>
                <div className="pt-4">
                    Welcome to Tokensoft. Connect a wallet to get started.
                </div>
            </div>
        </div>
    );
}

export default App;
