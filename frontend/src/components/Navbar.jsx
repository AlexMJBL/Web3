export default function Navbar({ account, connectWallet }) {
  // Petite fonction pour raccourcir l'adresse (ex: 0x123...456)
  const formatAddress = (addr) => `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;

  return (
    <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20">
            W3
          </div>
          <span className="font-bold text-xl tracking-tight">TrustFund</span>
        </div>
        
        {account ? (
          <div className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 font-mono text-sm text-indigo-400 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
            {formatAddress(account)}
          </div>
        ) : (
          <button 
            onClick={connectWallet}
            className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all font-medium flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            Connecter Portefeuille
          </button>
        )}
      </div>
    </nav>
  );
}
