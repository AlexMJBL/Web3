import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import HeroInfo from './components/HeroInfo';
import ProjectCard from './components/ProjectCard';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './utils/constants';

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);

  // Connexion au portefeuille
  const connectWallet = async () => {
    // Vérification de la présence du fournisseur injecté (MetaMask)
    if (window.ethereum) {
      try {
        // Requête d'accès aux comptes
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);

        // Configuration du Provider et du Signer
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // Initialisation de l'instance du contrat
        const crowdfundingContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        setContract(crowdfundingContract);

      } catch (error) {
        console.error("Erreur de connexion:", error);
      }
    } else {
      alert("Veuillez installer MetaMask pour utiliser cette application.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500/30">
      <Navbar account={account} connectWallet={connectWallet} />

      <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <HeroInfo />
          <ProjectCard contract={contract} account={account} />
        </div>
      </main>
    </div>
  )
}

export default App;
