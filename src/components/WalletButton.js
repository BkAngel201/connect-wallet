import WalletIcon from "./WalletIcon";

function WalletButton({ WalletInfo, setWalletSelected }) {


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