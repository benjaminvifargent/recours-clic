# RECOURS-CLIC ⚖️

**RECOURS-CLIC** est une plateforme web moderne conçue pour permettre aux particuliers de formaliser rapidement des réclamations juridiques simples, de trouver le bon destinataire, et de générer un courrier structuré prêt à l'envoi.

## 🚀 Fonctionnalités principales

- **Tunnel de Réclamation Dynamique** : Un parcours guidé en 4 étapes pour 4 cas critiques :
    - 📦 Colis non reçu
    - 🛒 Remboursement non effectué
    - 🚄 Transport annulé ou retardé
    - 📄 Résiliation d'abonnement / Prélèvements abusifs
- **Intelligence Métier** : Génération de courriers personnalisés incluant les articles de loi pertinents (Code de la consommation).
- **Génération PDF** : Export instantané de la réclamation au format PDF officiel.
- **Espace Utilisateur** : Dashboard pour suivre l'historique des démarches et télécharger les documents.
- **Administration complète** : Back-office pour gérer les dossiers reçus et configurer le répertoire des enseignes commerciales (Amazon, Fnac, SNCF, etc.).
- **Modèle Économique** : Prix unique de 2€ par litige, sans abonnement.

## 🛠️ Stack Technique

- **Framework** : [Next.js 15](https://nextjs.org/) (App Router)
- **Styling** : Vanilla CSS avec **CSS Modules** pour une isolation parfaite des styles.
- **Génération PDF** : [jsPDF](https://github.com/parallax/jsPDF)
- **État & Auth** : Context API avec persistance locale (`localStorage`).
- **Design** : Approche premium, responsive et institutionnelle.

## 📦 Installation et Lancement

### 1. Cloner le projet
```bash
git clone https://github.com/benjaminvifargent/recours-clic.git
cd recours-clic
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir l'application.

## 📂 Structure du projet

- `src/app/` : Routes et pages de l'application (Next.js App Router).
- `src/lib/` : Logique métier, templates de lettres (`data.ts`) et utilitaires PDF.
- `public/` : Assets statiques et images générées.

## ⚖️ Licence

Ce projet est la propriété de RECOURS-CLIC. Tous droits réservés.
