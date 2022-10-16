import WalletIcon from "./WalletIcon";

interface WalletConnected  {
    name: string,
    label: string,
    icon: string,
    backgroundColor?: string
}

function WalletButton({ WalletInfo, setWalletSelected }: { WalletInfo: WalletConnected, setWalletSelected: Function }) {


    return (
        <button onClick={() => { setWalletSelected(WalletInfo) } } className="WalletButton border flex p-2 text-white hover:text-slate-400 hover:border-slate-400">
            <WalletIcon size={10} icon={WalletInfo.icon} />
            <div className="flex justify-center grow items-center h-full text-xl ">
                {WalletInfo.label}
            </div>

        </button>
    )
}

export default WalletButton;