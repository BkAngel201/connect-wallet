const Utils = {
    functions: {
        formatWalletAccountShort(accountNumber: string | null, sliceSize = 6) {
            if (accountNumber) {
                let front = accountNumber.slice(0, sliceSize)
                let back = accountNumber.slice(accountNumber.length - 1 - sliceSize, accountNumber.length - 1)
                return `${front}...${back}`

            } else {
                return ''
            }
        },
        generateRandomMessage(length: Number) {
            let  result = '';
            let characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        },
        generateEIP4361Signature(domain: string, address: string, statement: string, uri: string, chainId: string, nonce: string, issuedAt: string) {
            return `${domain} wants you to sign in with your Ethereum account:
${address}

${statement}

URI: ${uri}
Version: 1
Chain ID: ${chainId}
Nonce: ${nonce}
Issued At: ${issuedAt}`
        }
    }
}

export default Utils;
