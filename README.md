# 🌺 Orchids App

Une application mobile/web élégante pour découvrir et explorer le monde des orchidées avec un magnifique **mode sombre** et une **palette rose poudré** (#FFDEE3).

## ✨ Fonctionnalités

### 🎨 **Nouveau ! Système de Thème**
- **Mode clair** avec palette rose poudré (#FFDEE3)
- **Mode sombre** élégant et sophistiqué
- **Basculement instantané** entre les thèmes
- **Bouton de thème** intégré dans le header

### 📱 **Interface Moderne**
- **Galerie horizontale** : Parcourez les orchidées avec un défilement horizontal fluide
- **Recherche avancée** : Trouvez des orchidées par nom, nom scientifique ou origine
- **Filtres intelligents** : Filtrez par niveau de difficulté et période de floraison
- **Fiches détaillées** : Informations complètes sur chaque espèce d'orchidée
- **Design adaptatif** : Interface optimisée pour mobile et web
- **Cartes adaptatives** : Toutes les cartes s'adaptent au thème sélectionné

## 🚀 Technologies utilisées

- **React Native** avec Expo (~54.0.1)
- **TypeScript** pour un code robuste
- **Expo Router** (6.0.0) pour le routing basé sur les fichiers
- **React Hooks** personnalisés (useTheme)
- **Custom Fonts** (Inter & Playfair Display)
- **Système de thème** dynamique

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

### **📱 Pour Mobile (recommandé)**
```bash
# Expo Go
npx expo start

# Puis scannez le QR code avec Expo Go
```

### **🌐 Pour Web**
```bash
# Démarrage web sur port par défaut
npx expo start --web

# Ou sur un port spécifique si conflit
npx expo start --web --port 8085
```

### **🛠️ Autres Plateformes**
```bash
# Android (nécessite Android Studio)
npx expo start --android

# iOS (nécessite Xcode sur macOS)
npx expo start --ios
```

## 📱 Captures d'écran

L'application présente :
- Une galerie d'orchidées vedettes avec défilement horizontal
- Une barre de recherche intelligente
- Des filtres par chips
- Des cartes d'orchidées avec informations détaillées
- Un mode détail complet pour chaque orchidée

## 🎨 Design & Thèmes

### 🌸 **Mode Clair - Rose Poudré**
- **Couleur principale** : #FFDEE3 (rose poudré)
- **Primary** : #E8A2B0 (rose poudré principal)
- **Accent** : #F4C2C2 (rose accent doux)
- **Background** : Blanc pur avec touches roses
- **Ombres** : Rose poudrées subtiles

### 🌙 **Mode Sombre - Rose Mystique**
- **Background** : #1A1215 (sombre avec teinte rose)
- **Cards** : #2A1F25 (sombres élégantes)
- **Primary** : #D088A0 (rose adapté pour le sombre)
- **Text** : #F0E8F0 (clair optimisé)
- **Ombres** : Noires profondes pour contraste

### ✨ **Caractéristiques Design**
- **Design minimaliste** avec des cartes élégantes
- **Typographie soignée** avec Inter et Playfair Display
- **Transitions fluides** entre les thèmes
- **Cohérence visuelle** sur tous les composants

## 📂 Structure du projet

```
orchids/
├── app/                      # Pages de l'application (Expo Router)
│   ├── index.tsx            # Point d'entrée principal
│   ├── MainScreenNew.tsx    # Écran principal avec système de thème
│   └── orchid/[id].tsx      # Page de détail d'une orchidée
├── components/              # Composants réutilisables
│   ├── OrchidCard.tsx       # Carte d'orchidée adaptative (horizontal/vertical)
│   ├── SearchBar.tsx        # Barre de recherche thématique
│   ├── FilterChips.tsx      # Filtres par chips adaptatifs
│   ├── ThemeToggle.tsx      # 🆕 Bouton de basculement de thème
│   ├── Button.tsx           # Boutons adaptatifs
│   ├── BottomSheet.tsx      # Modal adaptative
│   └── Icon.tsx             # Icônes thématiques
├── hooks/                   # 🆕 Hooks React personnalisés
│   └── useTheme.ts          # Hook pour la gestion des thèmes
├── data/                    # Données des orchidées
├── styles/                  # 🔄 Système de couleurs et thèmes
│   └── commonStyles.ts      # Palettes clair/sombre + utilitaires
└── assets/                  # Images et ressources
```

## 🌿 Données des orchidées

L'application contient des informations sur 6 espèces d'orchidées :
- **Phalaenopsis** (Orchidée papillon) - Facile
- **Cattleya** (Reine des orchidées) - Modéré  
- **Dendrobium** - Modéré
- **Cymbidium** - Facile
- **Vanda** - Difficile
- **Oncidium** (Orchidées danseuses) - Modéré

## 🎯 Utilisation du Système de Thème

### **Basculer entre les thèmes**
1. Cliquez sur l'icône **soleil/lune** dans le header
2. L'application bascule instantanément entre mode clair et sombre
3. Tous les composants s'adaptent automatiquement

### **Composants adaptatifs**
- ✅ Cartes d'orchidées
- ✅ Barre de recherche
- ✅ Filtres
- ✅ Boutons
- ✅ Modal/BottomSheet
- ✅ Icônes

## 🔧 Troubleshooting

### **Problèmes de port**
Si vous obtenez une erreur de port occupé :
```bash
# Utilisez un port spécifique
npx expo start --web --port 8085
# ou
npx expo start --port 8085
```

### **Cache Metro**
Si l'application ne se met pas à jour :
```bash
# Redémarrez avec cache clear
npx expo start --clear
```

### **Dépendances**
Si des packages sont manquants :
```bash
# Réinstallez les dépendances
rm -rf node_modules
npm install
```

## � Accès rapide

- **Web** : http://localhost:8081 (ou port affiché)
- **Mobile** : Scannez le QR code avec Expo Go
- **Repository** : https://github.com/ayladne/orchids

## 🆕 Dernières mises à jour

### Version actuelle - Septembre 2025
- ✅ **Mode sombre** complet
- ✅ **Palette #FFDEE3** (rose poudré)
- ✅ **Système de thème** dynamique
- ✅ **Hook useTheme** personnalisé
- ✅ **Composants adaptatifs**
- ✅ **Performance optimisée**

## �👤 Auteur

**Ayladne** - [GitHub](https://github.com/ayladne)

---

*Développé avec ❤️ pour les amoureux des orchidées* 🌺✨
