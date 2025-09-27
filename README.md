# 🌺 Orchids App

Une application mobile/web élégante pour découvrir et explorer le monde des orchidées.

## ✨ Fonctionnalités

- **Galerie horizontale** : Parcourez les orchidées avec un défilement horizontal fluide
- **Recherche avancée** : Trouvez des orchidées par nom, nom scientifique ou origine
- **Filtres intelligents** : Filtrez par niveau de difficulté et période de floraison
- **Fiches détaillées** : Informations complètes sur chaque espèce d'orchidée
- **Design adaptatif** : Interface optimisée pour mobile et web

## 🚀 Technologies utilisées

- **React Native** avec Expo
- **TypeScript** pour un code robuste
- **React Navigation** pour la navigation
- **Expo Router** pour le routing basé sur les fichiers
- **Custom Fonts** (Inter & Playfair Display)

## 🌱 Installation

1. Clonez le repository :
```bash
git clone https://github.com/ayladne/orchids.git
cd orchids
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez l'application :
```bash
# Pour le web
npm run web

# Pour Android
npm run android

# Pour iOS
npm run ios
```

## 📱 Captures d'écran

L'application présente :
- Une galerie d'orchidées vedettes avec défilement horizontal
- Une barre de recherche intelligente
- Des filtres par chips
- Des cartes d'orchidées avec informations détaillées
- Un mode détail complet pour chaque orchidée

## 🎨 Design

L'application utilise une palette de couleurs inspirée des orchidées :
- **Violet orchidée** (#8B5A8C) comme couleur principale
- **Rose clair** (#D8A7D8) pour les accents
- **Design minimaliste** avec des cartes élégantes
- **Typographie soignée** avec Inter et Playfair Display

## 📂 Structure du projet

```
orchids_app/
├── app/                    # Pages de l'application (Expo Router)
│   ├── index.tsx          # Page d'accueil avec galerie
│   └── orchid/[id].tsx    # Page de détail d'une orchidée
├── components/            # Composants réutilisables
│   ├── OrchidCard.tsx     # Carte d'orchidée (format horizontal/vertical)
│   ├── SearchBar.tsx      # Barre de recherche
│   ├── FilterChips.tsx    # Filtres par chips
│   └── ...
├── data/                  # Données des orchidées
├── styles/                # Styles globaux
└── assets/                # Images et ressources
```

## 🌿 Données des orchidées

L'application contient des informations sur 6 espèces d'orchidées :
- **Phalaenopsis** (Orchidée papillon) - Facile
- **Cattleya** (Reine des orchidées) - Modéré  
- **Dendrobium** - Modéré
- **Cymbidium** - Facile
- **Vanda** - Difficile
- **Oncidium** (Orchidées danseuses) - Modéré

## 📄 Licence

Ce projet est sous licence MIT.

## 👤 Auteur

**Ayladne** - [GitHub](https://github.com/ayladne)

---

*Développé avec ❤️ pour les amoureux des orchidées*