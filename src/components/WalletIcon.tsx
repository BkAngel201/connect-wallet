function WalletIcon({ size=12, icon='' }) {

    return (
        <div className={`rounded-md bg-white w-${size} h-${size} flex justify-center items-center` }>
            <img className="w-12" src={icon} alt="Wallet Connected Icon"/>
        </div>
        )
}
export default WalletIcon;