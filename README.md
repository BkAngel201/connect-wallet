# Connect Wallet

Implement a modal that allows users to connect their crypto wallet to your app using [Metamask](https://docs.metamask.io/guide/) or [WalletConnect](https://docs.walletconnect.com/) similar to [Block Native’s Web3-Onboard](https://onboard.blocknative.com/) modal:
![](https://lh6.googleusercontent.com/4YoJIphLq27z6ZoMK8tQwXrFbROufVv3ONlIHaupBIjfGHkjE2KuyLo0hgF4x4vPu5Iolb5Ufl5Nzmsk2qp-BY7lp-JJCtW0fmawQbq3DQncCasFP_6PiDP3uh7wr3curp0DMIWEtEaKVikhnGsnrFQVhj0OnPswP3YqHMaEBjU0ri1hTpPhbhmOXw)

## Technologies
- [Typescript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Tailwind](https://tailwindcss.com)
- [Web3 ](https://web3js.readthedocs.io/en/v1.8.0)

## Dependecies
- [NodeJs](https://nodejs.org/en/)
- [Metamask Extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)


# Installation

- Clone Repository to a local folder
- Use command `npm install` on directory to install all necessary packages

# Run Server
- Use command `npm start`
- Website address `http://localhost:3000`

## Features
-   Detect that a user is not currently authenticated
-   Provide a ‘Connect Wallet’ button that opens a modal similar to the screenshot above
-   Allow users to connect using ‘Metamask’
-   Once the user selects an option, the app should call out to the appropriate third-party API and establish a connection
-   If the connection is successful, show the current address of the connected wallet in the UI.
-   Style the modal consistent with the look/feel of the [Tokensoft app](https://app.tokensoft.io)

### Stretch goals:
-   Integrate Metamask so that once the user establishes a session, they can authenticate by signing a message per [EIP-4361](https://eips.ethereum.org/EIPS/eip-4361)
-   Add ability for the user to disconnect from Metamask
-   Style for mobile devices

## Pending Features
-   Allow users to use ‘WalletConnect’  (Trying to Use @walletconnect/web3-provider was triggering errors just importing library) [Discussion Link](https://stackoverflow.com/questions/70996225/wallet-connect-web3-provider-showing-a-lot-of-errors-just-by-imoprting)