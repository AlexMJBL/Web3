import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  // Paramètres de déploiement
  const goal = ethers.parseEther("10");
  const durationInDays = 7;

  console.log("Deploiement du contrat Crowdfunding en cours...");

  // Récupération de la factory du contrat
  const Crowdfunding = await ethers.getContractFactory("Crowdfunding");

  // Déploiement du contrat avec les paramètres initiaux
  const crowdfunding = await Crowdfunding.deploy(goal, durationInDays);

  // Attente de la confirmation de la transaction
  await crowdfunding.waitForDeployment();

  // Affichage de l'adresse finale
  const address = await crowdfunding.getAddress();
  console.log(`Contrat Crowdfunding deploye a l'adresse: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
