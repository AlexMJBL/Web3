import { useState } from 'react';

export default function ControlMenu({ contract }) {
  const [loading, setLoading] = useState(false);

  // Fonction pour simuler le temps (avance de 7 jours)
  const advanceTime = async () => {
    try {
      setLoading(true);
      // Avancer le temps en contactant directement le noeud local (contourne MetaMask)
      await fetch("http://127.0.0.1:8545", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", method: "evm_increaseTime", params: [7 * 24 * 60 * 60], id: 1 })
      });
      
      // Miner un bloc
      await fetch("http://127.0.0.1:8545", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", method: "evm_mine", params: [], id: 2 })
      });
      alert("Le temps a été avancé de 7 jours avec succès ! Rechargez la page pour voir les changements.");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'avancement du temps : " + (error.message || "Vérifiez la console"));
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

      alert("Remboursement effectué avec succès.");
      window.location.reload(); // Pour mettre à jour l'interface
    } catch (error) {
      console.error(error);
      alert("Erreur lors du remboursement : " + (error.reason || "Non autorisé ou campagne non terminée."));
    } finally {
      setLoading(false);
    }
  };

  // Logique de retrait des fonds (réservé au créateur)
  const handleWithdraw = async () => {
    if (!contract) return alert("Veuillez connecter votre portefeuille.");

    try {
      setLoading(true);
      const tx = await contract.withdrawFunds();
      await tx.wait();

      alert("Fonds retirés avec succès !");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Erreur lors du retrait : " + (error.reason || "Non autorisé ou objectif non atteint."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-indigo-500/30 p-4 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <div className="text-slate-400 font-mono text-sm hidden sm:block">
          <span className="text-indigo-400 font-bold mr-2">SIMULATION</span> 
          Contrôles administrateur et de test
        </div>
        
        <div className="flex flex-wrap gap-3 w-full sm:w-auto justify-center">
          <button
            onClick={advanceTime}
            disabled={loading}
            className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500 hover:text-white rounded-lg transition-colors font-medium text-sm flex items-center gap-2"
          >
            ⏱️ Avancer de 7 jours
          </button>
          
          <button
            onClick={handleRefund}
            disabled={loading}
            className="px-4 py-2 bg-amber-500/20 text-amber-400 border border-amber-500/50 hover:bg-amber-500 hover:text-white rounded-lg transition-colors font-medium text-sm flex items-center gap-2"
          >
            💸 Remboursement
          </button>
          
          <button
            onClick={handleWithdraw}
            disabled={loading}
            className="px-4 py-2 bg-indigo-500/20 text-indigo-400 border border-indigo-500/50 hover:bg-indigo-500 hover:text-white rounded-lg transition-colors font-medium text-sm flex items-center gap-2"
          >
            🏦 Retirer les fonds
          </button>
        </div>
      </div>
    </div>
  );
}
