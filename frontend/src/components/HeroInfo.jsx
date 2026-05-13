export default function HeroInfo() {
  return (
    <div className="space-y-8">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium border border-indigo-500/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        Campagne active
      </div>

      <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter">
        Financez le futur, <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          sans intermédiaire.
        </span>
      </h1>

      <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
        Plateforme de financement participatif décentralisée.
        Les fonds sont gérés par un contrat intelligent garantissant un remboursement 
        automatique et sécurisé en cas de non-atteinte de l'objectif à l'échéance.
      </p>
    </div>
  );
}
