import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function ProjectCard({ contract, account }) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalFunds, setTotalFunds] = useState("0.0");

  // Fonction pour lire les fonds récoltés
  const fetchTotalFunds = async () => {
    if (contract) {
      try {
        const total = await contract.totalFunds();
        setTotalFunds(ethers.formatEther(total));
      } catch (error) {
        console.error("Erreur de lecture:", error);
      }
    }
  }

  useEffect(() => {
    fetchTotalFunds();
  }, [contract]);

  // Logique de contribution
  const handleContribute = async () => {
    if (!contract) return alert("Veuillez connecter votre portefeuille.");
    if (!amount || amount <= 0) return alert("Veuillez entrer un montant valide.");

    try {
      setLoading(true);
      const tx = await contract.contribute({ value: ethers.parseEther(amount) });

      await tx.wait();

      alert("Contribution effectuée avec succès.");
      setAmount('');
      fetchTotalFunds();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la contribution : " + (error.reason || "Vérifiez la console"));
    } finally {
      setLoading(false);
    }
  };

  // Logique de remboursement
  const handleRefund = async () => {
    if (!contract) return alert("Veuillez connecter votre portefeuille.");

    try {
      setLoading(true);
      const tx = await contract.refund();
      await tx.wait();

      alert("Remboursement effectué.");
      fetchTotalFunds();
    } catch (error) {
      console.error(error);
      alert("Erreur lors du remboursement : " + (error.reason || "Non autorisé."));
    } finally {
      setLoading(false);
    }
  };

  // Calcul du pourcentage (objectif fixe à 10 pour l'exemple)
  const percentage = Math.min((Number(totalFunds) / 10) * 100, 100).toFixed(1);

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

      <div className="relative p-8 rounded-3xl bg-slate-800/80 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Projet X : Énergie Propre</h3>
            <p className="text-slate-400 font-mono text-sm">Contrat: 0x5Fb...0aa3</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400 mb-1">Objectif</p>
            <p className="text-xl font-bold text-indigo-400">10.0 ETH</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-slate-300">{totalFunds} ETH récoltés</span>
            <span className="text-slate-400">{percentage}%</span>
          </div>
          <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
          </div>
          <p className="text-sm text-slate-400 mt-3 text-right">Se termine dans 7 jours</p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Montant (ETH)"
              disabled={loading}
              className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
            />
            <button
              onClick={handleContribute}
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-600 text-white font-bold transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center min-w-[120px]"
            >
              {loading ? "..." : "Soutenir"}
            </button>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={handleRefund}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 disabled:bg-slate-800 text-slate-300 font-medium transition-all border border-white/5"
            >
              Demander un remboursement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
