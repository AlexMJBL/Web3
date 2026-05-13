# Brouillon du Rapport - TP III Web3

*(Vous pouvez copier-coller ces sections directement dans votre document Word)*

## Choix de la technologie

Pour cette expérimentation, la technologie sélectionnée est le **Web3**, plus spécifiquement le développement de **Smart Contracts (Contrats Intelligents)** sur une blockchain compatible Ethereum en utilisant le langage de programmation **Solidity**. 

Ce qui rend cette technologie particulièrement intéressante, c'est son changement de paradigme architectural : elle permet de passer d'une application centralisée (gérée par un serveur unique et une entité de confiance) à une application décentralisée (DApp) où le code backend s'exécute sur un réseau public d'ordinateurs. Les contrats intelligents garantissent que les règles d'une application sont immuables (elles ne peuvent pas être modifiées secrètement) et s'exécutent de manière autonome, ce qui supprime le besoin de faire confiance à un intermédiaire (comme une banque ou une plateforme d'hébergement).

## Hypothèse de départ

La technologie des Smart Contracts est reconnue pour sa transparence absolue et son exécution déterministe basée sur le code déployé. Sachant que dans les plateformes de financement participatif traditionnelles (comme Kickstarter ou GoFundMe), les utilisateurs doivent faire confiance à la plateforme et au créateur du projet quant à la gestion des fonds et aux éventuels remboursements.

Je formule donc l'hypothèse suivante :
**« La technologie des Smart Contracts (Web3) permet d'éliminer le risque de fraude ou de mauvaise gestion des fonds dans un processus de financement participatif (crowdfunding), en automatisant le remboursement complet, sécurisé et sans intermédiaire des contributeurs dans l'éventualité où l'objectif financier fixé n'est pas atteint à une date d'échéance précise. »**

## Proposition d'une exploration concrète et observable

Afin de vérifier cette hypothèse, je propose de développer et de déployer une DApp (Decentralized Application) de financement participatif. 

L'exploration se fera en deux volets concrets :
1. **L'implémentation du contrat intelligent (`Crowdfunding.sol`) :** Ce code définira un projet avec un objectif financier à atteindre en Ethereum (ETH) et une date limite. Il contiendra la logique stricte acceptant les dons, bloquant les retraits pour le créateur si l'objectif n'est pas atteint, et débloquant une fonction de remboursement exclusif pour chaque contributeur si la campagne échoue.
2. **L'implémentation d'une interface utilisateur (React / Vite) :** Une interface web moderne permettant à un utilisateur de lier son portefeuille numérique (ex: MetaMask) et d'interagir facilement avec le contrat intelligent pour simuler une contribution et observer le mécanisme de remboursement automatique.

L'observation concrète consistera à simuler une campagne qui n'atteint pas son objectif et à démontrer que le contrat refuse l'accès aux fonds au créateur, tout en permettant aux contributeurs de récupérer leur investissement de manière autonome.

## Médiagraphie

*Voici une proposition de 5 références de départ. Vous pourrez en ajouter d'autres au fil de l'expérimentation.*

1. **Documentation Officielle Solidity**
   - *Lien :* https://docs.soliditylang.org/
   - *Description :* La documentation officielle du langage Solidity. Elle m'a permis de comprendre la syntaxe de base pour la création du contrat intelligent, la gestion des variables d'état (comme les balances des utilisateurs) et les modificateurs de fonctions cruciaux pour la sécurité.

2. **Documentation Hardhat**
   - *Lien :* https://hardhat.org/docs
   - *Description :* Hardhat est l'environnement de développement Ethereum choisi pour compiler, déployer et tester le contrat intelligent localement. Cette ressource a été essentielle pour configurer l'environnement de test (blockchain locale).

3. **Ethers.js Documentation**
   - *Lien :* https://docs.ethers.org/v6/
   - *Description :* Bibliothèque JavaScript utilisée dans l'interface frontend (React) pour interagir avec la blockchain. Ce lien m'a aidé à comprendre comment lire l'état du contrat et envoyer des transactions depuis le navigateur web de l'utilisateur.

4. **"Smart Contract Security Best Practices" par Consensys**
   - *Lien :* https://consensys.github.io/smart-contract-best-practices/
   - *Description :* Un guide de référence sur la sécurité dans le développement Web3. Il a été consulté pour s'assurer que les fonctions de retrait et de remboursement de la DApp ne soient pas vulnérables à des attaques courantes comme la réentrance (Reentrancy attack).

5. **Documentation React & Vite**
   - *Lien :* https://react.dev/ et https://vitejs.dev/
   - *Description :* Documentations officielles pour la création de l'interface utilisateur. Elles m'ont permis de structurer les composants de l'application web de manière modulaire et de configurer un environnement de développement frontend rapide.
