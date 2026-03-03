# TimeTravel Agency - Webapp Interactive 🕰️✨

Webapp pour une agence de voyage temporel de luxe fictive, développée dans le cadre de la Session 2 du Projet Supervisé IA.

## 🌍 Liens du Projet
- **Site en Ligne (Vercel)** : [https://ia-ynov-rho.vercel.app/](https://ia-ynov-rho.vercel.app/)
- **Repository GitHub** : [https://github.com/Giovanni-Gozzo/IA_Ynov](https://github.com/Giovanni-Gozzo/IA_Ynov)

## 👥 L'Équipe
- César Lemaire
- Giovanni Gozzo

## 🛠️ Stack Technique
- **Frontend** : React.js (via Vite)
- **Styling** : Tailwind CSS v4 (thème sombre, "glassmorphism", mode luxe)
- **Animations** : Framer Motion
- **Icônes** : Lucide React
- **Déploiement cible** : GitHub Pages

## ✨ Features Implémentées (Objectif 20/20)
1. **Landing Page Immersive** : Hero section avec visuel généré et accroche premium.
2. **Galerie Interactive** : 3 Destinations (Paris 1889, Crétacé, Florence 1504) avec effets de survol élégants.
3. **Chatbot "Assistant Temporel"** : Widget flottant simulant un agent IA expert en histoire et rassurant.
4. **Automatisation (Le Quiz)** : Algorithme de recommandation en 4 questions pour définir l'époque idéale du client.

## 🤖 Outils IA Utilisés (Transparence)
- **Développement** : Antigravity (Vibe Coding) pour la génération complète de l'application React/Tailwind.
- **Visuels (Session 1)** : IA de génération d'images pour le portal temporel et les 3 cartes de destinations (Gemini NanoBanana).
- **Logique Conversationnelle** : Architecture de l'Assistant Temporel basée sur les prompts du brief ( Mistral ).

## 🚀 Instructions de Lancement

Pour lancer le projet en local :
```bash
npm install
npm run dev
```

Pour créer le build de production :
```bash
npm run build
```

### 🌐 Notes sur le Déploiement (GitHub Pages)
Vu que la Webapp utilise l'API Mistral protégée par une clé d'environnement, notez bien ceci lors du déploiement via GitHub actions / Pages :
- Créez les "Repository Secrets" dans votre dépôt GitHub (`Settings` > `Secrets and variables` > `Actions`).
- Ajoutez un secret nommé `VITE_MISTRAL_API_KEY` contenant votre clé ( je ne donne pas ma clé en public sur github pour des raisons de confidentialité ).
- Ce secret sera utilisé pour builder l'application sur GitHub Pages sans exposer votre clé publiquement dans le code source.

## 📄 Licence
Projet pédagogique - M1/M2 Digital & IA
