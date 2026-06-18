# Cahier des Charges — FootQuest

**Version** : 0.0.1 (MVP)  
**Date** : 17 juin 2026  
**URL de production** : https://footquest.fr  
**Dépôt GitHub** : https://github.com/Ithan25/FootQuest

---

## 1. Présentation Générale

### 1.1 Concept

FootQuest est une plateforme web gratuite de mini-jeux de football conçue autour de la Coupe du Monde FIFA 2026. Elle propose 3 jeux originaux testant les connaissances des utilisateurs sur les 48 sélections nationales qualifiées, leurs joueurs et l'histoire du football mondial.

### 1.2 Proposition de valeur

- **Thématique** : Coupe du Monde 2026 (48 équipes, 3 pays hôtes : USA, Canada, Mexique)
- **Cible** : Fans de football francophones, tous âges
- **Modèle économique** : Freemium (publicités Google AdSense + abonnement premium « Golden Ball »)
- **Langue** : Français uniquement
- **Plateforme** : Web responsive (mobile-first) + PWA installable

### 1.3 Identité visuelle

La charte graphique s'inspire des couleurs officielles de la CDM 2026 :

- **Violet** (`#3B1F8E`) : Couleur primaire, accents, gradients
- **Rouge** (`#E2001A`) : Erreurs, accents secondaires, jeu The Missing Piece
- **Vert** (`#00A651`) : Succès, jeu Scout Master
- **Lime** (`#C5E86C`) : FootPoints, badges, highlights
- **Fond sombre** (`#0A0A0F`) : Background principal
- **Surface** (`#141420`) : Cards, panels

Typographies :

- **Montserrat** (700, 800, 900) — titres
- **Inter** — corps de texte
- **Geist Mono** — éléments monospace

---

## 2. Stack Technique

### 2.1 Frontend

- **Next.js** 16.1.7 — Framework React (App Router)
- **React** 19.2.4 — Bibliothèque UI
- **TypeScript** 5.9.3 — Typage statique
- **TailwindCSS** 4.2.1 — Utility-first CSS
- **shadcn/ui + Radix UI** (4.1.2 / 1.4.3) — Composants UI accessibles
- **Lucide React** 1.7.0 — Bibliothèque d'icônes
- **next-themes** 0.4.6 — Gestion du thème (dark mode)
- **next-pwa** 5.6.0 — Progressive Web App
- **Sonner** 2.0.7 — Notifications toast

### 2.2 Backend et Base de données

- **Supabase** — BaaS (PostgreSQL, Auth, Storage, Row Level Security)
- **@supabase/ssr** 0.10.0 — Intégration SSR avec Next.js
- **Server Actions** (Next.js) — Logique métier côté serveur

### 2.3 Outils de développement

- **ESLint** 9.39.4 — Linting (config next/core-web-vitals + next/typescript)
- **Prettier** 3.8.1 — Formatage du code (avec plugin TailwindCSS)
- **Vitest** 4.1.9 — Tests unitaires (84 tests, 8 suites)
- **Testing Library** 16.3.2 — Tests de composants React
- **GitHub Actions** — CI/CD (lint, typecheck, tests)

### 2.4 Hébergement et Déploiement

- **Vercel** — Hébergement et déploiement automatique depuis GitHub
- **Supabase Cloud** — Base de données PostgreSQL hébergée
- **Google AdSense** — Monétisation publicitaire (ID : ca-pub-9874141990888959)

---

## 3. Architecture du Projet

### 3.1 Structure des fichiers

```
FootQuest/
├── app/
│   ├── (auth)/                   # Pages d'authentification
│   │   ├── login/                  # Connexion
│   │   └── signup/                 # Inscription
│   ├── (dashboard)/              # Zone authentifiée (noindex)
│   │   ├── games/
│   │   │   ├── scout-master/       # Jeu 1
│   │   │   ├── missing-piece/      # Jeu 2
│   │   │   └── foot-trivia/        # Jeu 3
│   │   ├── hub/                    # Tableau de bord principal
│   │   ├── leaderboard/            # Classement des joueurs
│   │   ├── profile/                # Profil utilisateur
│   │   └── shop/                   # Boutique
│   ├── (legal)/                  # Pages légales
│   │   ├── cgu/
│   │   ├── mentions-legales/
│   │   └── politique-confidentialite/
│   ├── (public)/                 # Pages publiques (SEO)
│   │   ├── a-propos/
│   │   ├── blog/coupe-du-monde-2026/
│   │   ├── contact/
│   │   └── guide/
│   ├── auth/                     # Routes API Auth
│   │   ├── callback/               # OAuth callback
│   │   └── signout/                # Déconnexion
│   ├── layout.tsx                # Layout racine
│   ├── page.tsx                  # Landing page
│   └── sitemap.ts                # Sitemap dynamique
├── components/
│   ├── games/                    # Composants des 3 jeux
│   ├── layout/                   # Navigation et headers/footers
│   ├── ui/                       # Composants shadcn/ui réutilisables
│   └── *.tsx                     # Composants transversaux (cookie consent, adsense, etc.)
├── hooks/                        # Custom React hooks
├── lib/                          # Logique métier et données
│   ├── supabase/                   # Clients Supabase (server, client, middleware)
│   ├── types/                      # Types TypeScript du schéma BDD
│   ├── constants.ts                # Constantes (limites, points, timers)
│   ├── scout-data*.ts              # Données Scout Master (48+ équipes)
│   ├── missing-data*.ts            # Données Missing Piece
│   └── trivia-data.ts              # Banque de 100+ questions trivia
├── supabase/                     # Scripts SQL
│   ├── schema.sql                  # Schéma complet de la BDD
│   ├── profile-storage.sql         # Bucket Storage pour avatars
│   └── fix-trigger.sql
├── tests/                        # Tests Vitest
├── public/                       # Assets statiques (images, robots.txt, manifest, ads.txt)
├── middleware.ts                  # Middleware d'authentification Supabase
└── .github/workflows/ci.yml      # Pipeline CI GitHub Actions
```

### 3.2 Route Groups (App Router)

- **(public)** — Accès public, indexé par Google. Landing, à propos, blog, contact, guide.
- **(auth)** — Accès public, indexé. Login, signup.
- **(legal)** — Accès public, indexé. CGU, mentions légales, politique de confidentialité.
- **(dashboard)** — Accès authentifié uniquement, non indexé (`noindex`). Hub, jeux, profil, boutique, classement.
- **auth/** — Routes API (callback OAuth, signout). Non indexé.

### 3.3 Middleware d'authentification

Le middleware Next.js protège les routes authentifiées via Supabase SSR. Il ne s'applique qu'aux routes du dashboard pour ne pas bloquer le crawl Google :

Routes protégées : `/hub/*`, `/games/*`, `/leaderboard/*`, `/shop/*`, `/profile/*`

---

## 4. Fonctionnalités Détaillées

### 4.1 Authentification

- **Inscription par email** : Email + mot de passe + pseudo (3 à 20 caractères, unique)
- **Connexion par email** : Email + mot de passe
- **OAuth Google** : Connexion/inscription via Google (Supabase Auth)
- **Confirmation email** : Lien de vérification envoyé après inscription
- **Déconnexion** : Suppression de la session Supabase (POST `/auth/signout`)
- **Callback OAuth** : Route `/auth/callback` — échange du code d'autorisation et redirection vers `/hub`
- **Création automatique du profil** : Un trigger PostgreSQL (`handle_new_user`) crée automatiquement une entrée dans la table `utilisateur` après inscription, en utilisant le pseudo fourni dans les metadata ou le préfixe de l'email

---

### 4.2 Les 3 Mini-Jeux

Chaque jeu suit le même cycle de vie, géré par le hook `useGameSession` :

**idle** → sélection de la difficulté → **playing** → **result** → retour à **idle**

Les utilisateurs non-premium voient un interstitiel publicitaire entre la sélection de difficulté et le début de la partie.

#### 4.2.1 Scout Master

**Concept** : Deviner la sélection nationale à partir des clubs de ses joueurs.

- **Données** : 48+ équipes avec 11 joueurs chacune (nom, club, poste, position sur le terrain)
- **Mécanisme** : Les noms des clubs sont révélés progressivement sur un terrain de football. Le joueur tape le nom du pays dans un champ avec autocomplétion.
- **Difficulté** :
  - Facile : 90 secondes, 5 clubs révélés au départ
  - Moyen : 60 secondes, 3 clubs révélés
  - Difficile : 30 secondes, 1 seul club révélé
- **Scoring** : Points de base × multiplicateur de difficulté (×1 / ×1.5 / ×2)
- **Niveaux par partie** : 5 équipes à deviner
- **Persistance** : Server Action `submitScoutSession` → insertion dans la table `session_partie` via Supabase

#### 4.2.2 The Missing Piece

**Concept** : Une composition nationale est affichée sur un terrain, un joueur est masqué. Il faut deviner son nom.

- **Données** : 48+ équipes avec 11 joueurs (nom, prénom, poste, numéro de maillot, position X/Y sur le terrain)
- **Mécanisme** : Composition affichée sur un terrain de foot. Un joueur est remplacé par un point d'interrogation. Champ de saisie avec autocomplétion des noms de joueurs.
- **Difficulté** :
  - Facile : 60 secondes
  - Moyen : 40 secondes
  - Difficile : 20 secondes
- **Scoring** : Points × multiplicateur de difficulté
- **Niveaux par partie** : 5 équipes
- **Persistance** : Server Action `submitMissingSession`

#### 4.2.3 Foot Trivia

**Concept** : Quiz de 10 questions de culture football avec un timer par question.

- **Données** : Banque de 100+ questions stockées localement (fichier `trivia-data.ts`, environ 246 Ko)
- **Catégories** : histoire, records, finales, buteurs, pays hôtes
- **Mécanisme** : 4 réponses proposées (A, B, C, D). Timer circulaire animé. Avancement automatique après chaque réponse.
- **Difficulté** :
  - Facile : 30 secondes par question, 10 points par bonne réponse
  - Moyen : 20 secondes, 20 points
  - Difficile : 12 secondes, 30 points
- **Système de streak** : Bonus progressif à partir de 3 bonnes réponses consécutives (+20 % par réponse supplémentaire au-delà de 3)
- **Persistance** : Server Action `submitTriviaSession`

---

### 4.3 Système de Points (FootPoints)

- **Monnaie virtuelle** : FootPoints (FP)
- **Gain** : Automatique à chaque partie terminée, via un trigger SQL (`increment_foot_points`)
- **Multiplicateurs de difficulté** : ×1 (facile), ×1.5 (moyen), ×2 (difficile)
- **Bonus de temps** : Points supplémentaires si la partie est terminée rapidement
- **Bonus de streak** (Trivia) : Bonus cumulatif dès 3 bonnes réponses d'affilée
- **Usage prévu** : Échange contre des récompenses partenaires dans la boutique (à venir)

---

### 4.4 Interstitiel Publicitaire

Pour les utilisateurs non-premium, un interstitiel publicitaire est affiché entre le choix de difficulté et le début de chaque partie :

- Composant `AdInterstitial` avec un timer de 5 secondes
- Emplacement Google AdSense intégré
- Bouton « Passer » visible après expiration du timer
- Skippé automatiquement pour les utilisateurs Golden Ball

---

### 4.5 Hub (Tableau de bord)

Page principale après connexion, accessible à `/hub`. Sections :

- **En-tête personnalisé** : « Salut, {pseudo} » avec badge Golden Ball si premium
- **Statistiques rapides** : FootPoints, nombre de parties jouées aujourd'hui sur la limite quotidienne, rang
- **Alerte de limite** : Avertissement affiché si l'utilisateur basic a joué 8 parties ou plus (sur 10 autorisées)
- **Cards des 3 jeux** : Titre, description, icône SVG, gradient coloré, lien vers le jeu
- **Accès rapide** : Liens vers le classement et la boutique
- **Historique récent** : Les 3 dernières parties avec le nom du jeu, les points gagnés et la date

---

### 4.6 Profil Utilisateur

- **Bannière** : Image personnalisable par upload (Supabase Storage, max 1 Mo côté client)
- **Avatar** : Image personnalisable par upload (Supabase Storage, max 1 Mo côté client)
- **Pseudo** : Modifiable en ligne (3 à 20 caractères, unicité vérifiée côté serveur)
- **Statistiques** : FootPoints, nombre total de parties jouées, points totaux cumulés, meilleur score
- **Informations** : Email (lecture seule), rôle (Basic ou Golden Ball), date d'inscription
- **Toggle Premium** : Bouton pour activer ou désactiver le statut Golden Ball
- **Déconnexion** : Formulaire POST vers `/auth/signout`

---

### 4.7 Classement (Leaderboard)

- **Top 50** : Classement des joueurs par FootPoints décroissants
- **Podium visuel** : Les 3 premiers joueurs affichés avec avatars, effets visuels (couronne animée pour le 1er, effets néon sous chaque podium)
- **Liste détaillée** : Positions 4 à 50 avec rang, avatar, pseudo et FootPoints
- **Badge Golden Ball** : Affiché à côté du pseudo des membres premium
- **Position de l'utilisateur** : Si l'utilisateur n'est pas dans le top 50, sa position est affichée en barre fixe en bas de l'écran

---

### 4.8 Boutique

- **Golden Ball** (actif) : Activation/désactivation du premium. Gratuit pour le MVP, intégration Stripe prévue ultérieurement.
- **Avantages premium** : Zéro publicité, parties illimitées, badge exclusif
- **Récompenses partenaires** (à venir) : Section affichant « Bientôt disponible ». Les tables `partenaire`, `recompense` et `obtention_recompense` existent déjà en BDD.

---

### 4.9 Pages Publiques (SEO)

- **Landing page** (`/`) : Hero, présentation des 3 jeux, statistiques, appel à l'inscription
- **À propos** (`/a-propos`) : Présentation du projet et de l'équipe
- **Contact** (`/contact`) : Informations de contact, FAQ
- **Guide : Comment jouer** (`/guide/comment-jouer`) : Explication des règles de chaque jeu
- **Guide : Système de points** (`/guide/systeme-de-points`) : Explication du fonctionnement des FootPoints
- **Blog : CDM 2026** (`/blog/coupe-du-monde-2026`) : Article de contenu SEO sur la Coupe du Monde 2026 (format, stades, favoris, dates clés)
- **CGU** (`/cgu`) : Conditions générales d'utilisation
- **Mentions légales** (`/mentions-legales`)
- **Politique de confidentialité** (`/politique-confidentialite`) : RGPD et gestion des données

---

## 5. Modèle de Données (PostgreSQL / Supabase)

### 5.1 Tables principales

**utilisateur**  
Profil utilisateur lié à `auth.users` de Supabase.  
Colonnes : `id` (PK, FK auth.users), `email` (unique), `pseudo` (unique), `avatar_url`, `role` (enum : basic / golden_ball), `foot_points`, `parties_jouees_aujourd_hui`, `date_derniere_partie`, `created_at`, `updated_at`

**jeu**  
Définition des 3 mini-jeux.  
Colonnes : `id`, `nom`, `type` (enum unique : scout_master / missing_piece / foot_trivia), `description`, `icone`, `actif`  
Pré-remplie avec les 3 jeux à la création du schéma.

**session_partie**  
Historique de chaque partie jouée.  
Colonnes : `id`, `utilisateur_id` (FK utilisateur), `jeu_id` (FK jeu), `score`, `points_gagnes`, `duree_secondes`, `niveau_atteint`, `complete`, `created_at`

**partenaire**  
Marques et sponsors proposant des récompenses.  
Colonnes : `id`, `nom`, `logo_url`, `site_web`, `actif`, `created_at`

**recompense**  
Lots échangeables contre des FootPoints.  
Colonnes : `id`, `partenaire_id` (FK partenaire), `nom`, `description`, `image_url`, `cout_points`, `stock`, `actif`, `created_at`

**obtention_recompense**  
Historique des récompenses obtenues par les utilisateurs.  
Colonnes : `id`, `utilisateur_id` (FK utilisateur), `recompense_id` (FK recompense), `date_obtention`, `code_unique` (unique, hex aléatoire), `statut` (enum : actif / utilise / expire)

**equipe**  
Équipes de football (nationales et clubs).  
Colonnes : `id`, `nom`, `pays`, `logo_url`, `confederation`

**joueur**  
Joueurs de football liés à une équipe.  
Colonnes : `id`, `nom`, `prenom`, `nationalite`, `poste` (enum : GK / DEF / MID / FWD), `equipe_id` (FK equipe), `photo_url`, `numero_maillot`

**question_trivia**  
Banque de questions pour Foot Trivia.  
Colonnes : `id`, `question`, `categorie`, `difficulte` (enum : facile / moyen / difficile), `points`

**reponse_trivia**  
Réponses possibles pour chaque question (4 par question).  
Colonnes : `id`, `question_id` (FK question_trivia), `reponse`, `est_correcte`

**niveau_scout_master**  
Niveaux du jeu Scout Master.  
Colonnes : `id`, `niveau` (unique), `equipe_id` (FK equipe), `points`, `temps_limite_secondes`

**indice_scout_master**  
Indices révélés progressivement dans Scout Master.  
Colonnes : `id`, `niveau_id` (FK niveau_scout_master), `ordre`, `type` (enum : drapeau / indice_texte / silhouette), `contenu`

**niveau_missing_piece**  
Niveaux du jeu The Missing Piece.  
Colonnes : `id`, `niveau` (unique), `equipe_id` (FK equipe), `joueur_manquant_id` (FK joueur), `points`, `temps_limite_secondes`

**composition_missing_piece**  
Disposition des joueurs sur le terrain pour un niveau Missing Piece.  
Colonnes : `id`, `niveau_id` (FK niveau_missing_piece), `joueur_id` (FK joueur), `position_x`, `position_y`, `est_visible`

### 5.2 Types Enum

- `role_utilisateur` : basic, golden_ball
- `poste_joueur` : GK, DEF, MID, FWD
- `type_jeu` : scout_master, missing_piece, foot_trivia
- `difficulte_trivia` : facile, moyen, difficile
- `type_indice` : drapeau, indice_texte, silhouette
- `statut_recompense` : actif, utilise, expire

### 5.3 Triggers automatiques

- **on_auth_user_created** (sur `auth.users`) : Crée automatiquement une entrée `utilisateur` avec le pseudo extrait des metadata ou le préfixe de l'email.
- **tr_session_increment_points** (sur `session_partie`) : Après insertion d'une session avec `complete = true`, incrémente les `foot_points` de l'utilisateur et met à jour le compteur `parties_jouees_aujourd_hui`.
- **tr_utilisateur_updated_at** (sur `utilisateur`) : Met à jour le champ `updated_at` à chaque modification du profil.

### 5.4 Row Level Security (RLS)

Toutes les tables ont RLS activé.

- **utilisateur** : Lecture publique (nécessaire pour le classement). Modification limitée au propriétaire (`auth.uid() = id`).
- **session_partie** : Lecture publique (classement). Insertion limitée au propriétaire.
- **jeu, equipe, joueur** : Lecture publique. Écriture réservée à l'administrateur.
- **question_trivia, reponse_trivia** : Lecture publique. Écriture réservée à l'administrateur.
- **obtention_recompense** : Lecture et insertion limitées au propriétaire.
- **partenaire, recompense** : Lecture publique.

---

## 6. Données de Jeu (Côté Client)

Les données des jeux Scout Master et Missing Piece sont stockées côté client dans des fichiers TypeScript statiques. Seules les sessions de jeu sont persistées en base de données.

- `scout-data.ts` (environ 14 Ko) : Données de base des équipes Scout Master
- `scout-data-extra.ts` (environ 31 Ko) : Équipes supplémentaires
- `missing-data.ts` (environ 14 Ko) : Données de base Missing Piece
- `missing-expansion1.ts` (environ 17 Ko) : Extension 1
- `missing-expansion2.ts` (environ 11 Ko) : Extension 2
- `trivia-data.ts` (environ 246 Ko) : 100+ questions trivia avec réponses

### Structure d'une équipe Scout Master

Chaque équipe contient : le nom du pays, un emoji drapeau, la formation tactique (ex : 4-3-3), et un tableau de 11 joueurs avec pour chacun son nom, club, poste (GK/DEF/MID/FWD), et ses coordonnées X/Y sur le terrain.

### Structure d'une équipe Missing Piece

Chaque équipe contient : le nom du pays, un emoji drapeau, la formation, un tableau de 11 joueurs avec nom, prénom, poste, numéro de maillot et coordonnées X/Y, ainsi que l'index du joueur manquant dans le tableau.

### Structure d'une question Trivia

Chaque question contient : le texte de la question, la catégorie, la difficulté, le nombre de points, un tableau de 4 réponses textuelles, et l'index de la bonne réponse.

---

## 7. Hooks Personnalisés

### useGameSession(gameType)

Machine à états gérant le cycle de vie complet d'une partie. Gère la phase courante (idle, playing, result), le score, les points gagnés, le niveau actuel, le chronomètre de début et la durée totale. Expose les méthodes : `startGame`, `addScore`, `nextLevel`, `endGame`, `resetGame`.

### useTimer({ duration, onExpire, autoStart })

Timer de countdown avec valeur de progression (de 1 à 0). Expose les secondes restantes, la progression, l'état de fonctionnement, et les méthodes `start`, `pause`, `reset`. Utilisé dans les 3 jeux pour le timer principal.

### usePremium()

Requête Supabase pour vérifier si l'utilisateur connecté possède le rôle `golden_ball`. Retourne `isPremium` (booléen), `loading` et une fonction `refresh` pour forcer la re-vérification.

---

## 8. SEO et Indexation

### 8.1 Configuration

- **Metadata Next.js** : Chaque page publique exporte un objet `metadata` avec titre, description, OpenGraph et URL canonique.
- **Sitemap dynamique** : Fichier `app/sitemap.ts` générant un sitemap XML avec 11 URLs publiques, des priorités et des fréquences de mise à jour.
- **robots.txt** : Autorise tous les robots. Référence le sitemap.
- **Dashboard non indexé** : Le layout du dashboard définit `robots: { index: false, follow: false }`.
- **Middleware compatible SEO** : Le matcher du middleware exclut les pages publiques pour ne pas bloquer Googlebot.
- **URLs canoniques** : Définies sur chaque page publique via `alternates.canonical`.
- **Langue** : `<html lang="fr">`, OpenGraph locale `fr_FR`.
- **Base URL** : `metadataBase` configurée sur `https://footquest.fr`.

### 8.2 Pages indexées et priorités

- `/` — Priorité 1.0, fréquence hebdomadaire
- `/guide/comment-jouer` — Priorité 0.9, mensuelle
- `/a-propos` — Priorité 0.8, mensuelle
- `/guide/systeme-de-points` — Priorité 0.8, mensuelle
- `/blog/coupe-du-monde-2026` — Priorité 0.8, mensuelle
- `/contact` — Priorité 0.7, mensuelle
- `/login` et `/signup` — Priorité 0.5, mensuelle
- `/mentions-legales`, `/politique-confidentialite`, `/cgu` — Priorité 0.3, annuelle

---

## 9. Monétisation

### 9.1 Google AdSense

- **ID Publisher** : ca-pub-9874141990888959
- **Meta tag** : Balise `google-adsense-account` insérée dans le `<head>` via le layout racine
- **Script AdSense** : Composant `AdSenseScript` chargé conditionnellement selon le consentement cookies de l'utilisateur
- **Interstitiel** : Composant `AdInterstitial` affiché entre la sélection de difficulté et le début de chaque partie pour les utilisateurs non-premium
- **Cookie Consent** : Bannière RGPD avec stockage de la préférence dans le `localStorage`
- **ads.txt** : Fichier `public/ads.txt` pour la vérification Google
- **Vérification Google** : Fichier `public/google31ad35b3c46d6e07.html`

### 9.2 Premium Golden Ball

- **Rôle en BDD** : `role_utilisateur = 'golden_ball'`
- **Avantages** : Suppression de toutes les publicités, parties illimitées (au lieu de 10 par jour), badge exclusif affiché sur le profil et le classement
- **Activation** : Bouton toggle disponible dans le profil et la boutique (Server Action `togglePremium`)
- **Tarification actuelle** : Gratuit (MVP). Intégration Stripe prévue ultérieurement.
- **Limites compte Basic** : 10 parties par jour, publicités entre les parties
- **Limites compte Golden Ball** : Aucune limite de parties, aucune publicité

---

## 10. Progressive Web App (PWA)

- **Manifest** : `public/manifest.json`
- **Nom de l'application** : FootQuest
- **Mode d'affichage** : Standalone
- **Couleur du thème** : `#3B1F8E` (violet)
- **Couleur de fond** : `#0A0A0F` (noir)
- **Icônes** : PNG 192×192, PNG 512×512, SVG maskable
- **Service Worker** : Généré automatiquement par `next-pwa`, désactivé en environnement de développement

---

## 11. CI/CD et Qualité du Code

### 11.1 GitHub Actions

Pipeline définie dans `.github/workflows/ci.yml`, déclenchée sur chaque `push` et `pull_request` vers les branches `main` et `master` :

1. **Lint** (`npm run lint`) : Vérifie les règles ESLint
2. **Typecheck** (`npm run typecheck`) : Vérifie la compilation TypeScript sans émission
3. **Test** (`npm run test`) : Exécute les 84 tests Vitest

### 11.2 Suites de tests

- **Constantes** (`tests/lib/constants.test.ts`) : 14 tests — Limites de jeu, configuration des points, multiplicateurs, timers par difficulté
- **Scout Data** (`tests/lib/scout-data.test.ts`) : 14 tests — Structure des équipes, joueurs, difficulté, fonctions de sélection
- **Missing Data** (`tests/lib/missing-data.test.ts`) : 13 tests — Structure des équipes, joueur manquant, positions sur le terrain
- **Trivia Data** (`tests/lib/trivia-data.test.ts`) : 9 tests — Nombre de questions, catégories, difficultés, points, doublons
- **Timer Hook** (`tests/hooks/use-timer.test.ts`) : 6 tests — Countdown, pause, reset, expiration du timer
- **Game Session Hook** (`tests/hooks/use-game-session.test.ts`) : 10 tests — Cycle de vie idle → playing → result, scoring, niveaux
- **SEO** (`tests/seo/sitemap-and-seo.test.ts`) : 18 tests — Sitemap, robots.txt, metadata, URLs canoniques

### 11.3 Configuration ESLint

Règles activées :

- `next/core-web-vitals` — Règles Next.js essentielles pour les performances web
- `next/typescript` — Vérifications TypeScript strictes
- `react/no-unescaped-entities` : désactivée (application francophone avec de nombreuses apostrophes)

---

## 12. Composants UI

### 12.1 Composants shadcn/ui intégrés

Avatar, Badge, Button, Card, Dialog, Input, Label, Separator, Skeleton, Sonner (toast), Tabs

### 12.2 Composant Flag personnalisé

Composant `Flag` pour afficher les drapeaux des pays via flagcdn.com. Contient un mapping de 93 pays avec leurs noms en français vers les codes ISO 3166-1 alpha-2. Trois tailles disponibles : sm (16px), md (24px), lg (40px). Fallback textuel (2 premières lettres du pays) si le code n'est pas trouvé.

### 12.3 Composants de navigation

- **PublicHeader** : Header des pages publiques avec navigation et liens CTA
- **PublicFooter** : Footer des pages publiques avec liens, mentions légales
- **DashboardHeader** : Header du dashboard avec logo et lien profil
- **BottomNav** : Barre de navigation mobile fixée en bas (hub, jeux, classement, profil)

---

## 13. Variables d'Environnement

- `NEXT_PUBLIC_SUPABASE_URL` : URL du projet Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` : Clé anonyme Supabase (utilisée côté client)

---

## 14. Limites Connues et Axes d'Évolution

### 14.1 Limites actuelles

- **Langue unique** : Français uniquement, aucun système d'internationalisation
- **Paiement** : Le statut Golden Ball est gratuit, Stripe n'est pas encore intégré
- **Récompenses** : La section boutique des récompenses partenaires est vide (« Bientôt disponible »)
- **Analytics** : Aucun système d'analytics intégré (pas de Google Analytics, Plausible, etc.)
- **Application native** : PWA uniquement, pas d'application native iOS/Android
- **Données de jeu côté client** : Les compositions et questions sont stockées dans des fichiers TypeScript statiques (environ 350 Ko au total), sans CMS ni interface d'administration
- **Mise à jour des compositions** : Processus manuel nécessitant l'édition directe des fichiers TypeScript

### 14.2 Évolutions prévues

**Priorité haute :**

- Intégration de Stripe pour le paiement récurrent de l'abonnement Golden Ball
- Mise en place du système de récompenses partenaires échangeables contre des FootPoints

**Priorité moyenne :**

- Ajout de nouveaux mini-jeux pour enrichir la plateforme
- Création d'un panneau d'administration pour gérer les données de jeu, les partenaires et les récompenses

**Priorité basse :**

- Internationalisation (support de l'anglais et de l'espagnol)
- Statistiques avancées avec graphiques de progression et historique détaillé par jeu
- Système social : ajout d'amis, défis entre joueurs

---

*Ce cahier des charges a été rédigé par analyse de l'intégralité du code source du projet FootQuest. Il reflète l'état du code au 17 juin 2026.*
