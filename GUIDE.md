# Guide : modifier mon site Sushumna

Ce guide explique comment changer vous-même les prix, les textes, le planning et les photos, puis comment mettre le site en ligne.
Tout se fait **depuis le site GitHub, dans votre navigateur** (ordinateur ou téléphone). Vous n'avez rien à installer.

---

## Le principe en 3 étapes

1. Vous ouvrez un fichier sur GitHub.
2. Vous cliquez sur le **crayon** ✏️ (« Edit this file ») et vous changez le texte.
3. Vous cliquez sur le bouton vert **« Commit changes… »**, puis encore **« Commit changes »**.

Le site se met à jour tout seul en 1 à 2 minutes.

> 💡 **Pas de panique** : GitHub garde toutes les anciennes versions. Si vous faites une erreur, elle peut toujours être annulée.

---

## 1. Mettre à jour le planning de la semaine

Fichier : **`mes-contenus/planning.js`**

Chaque semaine ressemble à ceci :

```
  {
    semaine:  "02/11/2026",
    lundi:    "9h00 libre, 10h30 pris, 14h00 libre",
    mardi:    "9h00 pris, 14h00 libre",
    ...
    dimanche: "fermé"
  },
```

- **semaine** : la date du **lundi**, sous la forme jour/mois/année.
- Pour chaque jour : les heures, séparées par des **virgules**, avec le mot **libre** ou **pris**.
- Un jour où vous ne travaillez pas : `"fermé"`.
- Quelqu'un réserve ? Remplacez simplement `libre` par `pris`.

**Chaque semaine :**
1. Copiez le bloc d'une semaine, de `{` jusqu'à `},` compris.
2. Collez-le à la fin de la liste, juste avant le `];` final.
3. Changez la date et les créneaux.
4. Vous pouvez supprimer les vieilles semaines (sinon, le site les cache tout seul).
5. Changez aussi la date en haut : `PLANNING_MIS_A_JOUR_LE = "25/10/2026";`

Le site affiche tout seul **la semaine en cours et la suivante**, et grise les créneaux déjà passés.

⚠️ À garder en place : les guillemets `" "`, la virgule à la fin de chaque ligne, et la virgule après `}` entre deux semaines.

---

## 2. Changer les prix

Fichier : **`mes-contenus/massages-et-tarifs.js`**, en haut :

```
var TARIFS = [
  { duree: "1 heure",    prix: 70  },
  { duree: "1 heure 30", prix: 100 },
  { duree: "2 heures",   prix: 130 }
];
```

Changez seulement les nombres (sans le signe €). Juste en dessous, la partie `FORMULES` contient la formule 4 massages.
Les nouveaux prix apparaissent partout : accueil, massages, tarifs et formulaire.

---

## 3. Changer la description d'un massage

Même fichier : **`mes-contenus/massages-et-tarifs.js`**, partie `MASSAGES`.
Chaque massage a : `nom`, `accroche`, `photo`, `consiste`, `pourQui`, `apporte` (la liste des bienfaits), `bonASavoir`.

- Changez le texte **entre les guillemets**.
- Si vous voulez des guillemets à l'intérieur d'un texte, utilisez « » (et pas " ").
- **Ajouter un massage** : copiez le bloc d'un massage, de `{` jusqu'à `},`, collez-le juste en dessous et changez les textes.
- **Retirer un massage** : supprimez son bloc entier.

---

## 4. Mettre vos photos

Toutes les photos vont dans le dossier **`photos`**. Le site a déjà prévu un emplacement pour chacune ; tant qu'une photo manque, un cadre doré avec le logo s'affiche à sa place, avec le nom du fichier attendu.

| Nom du fichier | Où elle apparaît |
|---|---|
| `accueil.jpg` | Grande photo en haut de l'accueil (format vertical idéal) |
| `portrait.jpg` | Votre photo, partie « Moi, c'est Maxence » |
| `ambiance-1.jpg`, `ambiance-2.jpg`, `ambiance-3.jpg` | Photos d'ambiance du cabinet (accueil) |
| `massage-sur-mesure.jpg` | Massage sur mesure |
| `massage-ayurvedique.jpg` | Massage ayurvédique |
| `massage-relaxant.jpg` | Massage relaxant |
| `massage-chong-mai.jpg` | Massage Chong Mai |
| `massage-bol-tibetain.jpg` | Massage au bol tibétain |
| `reflexologie-abdominale.jpg` | Réflexologie abdominale |

**Comment faire :**
1. Renommez votre photo **exactement** comme dans le tableau (en minuscules, sans accent, avec `.jpg`).
2. Sur GitHub, ouvrez le dossier `photos`, cliquez sur **« Add file » → « Upload files »**.
3. Glissez la photo (ou choisissez-la), puis cliquez sur **« Commit changes »**.
4. Pour **remplacer** une photo, envoyez simplement une nouvelle photo avec le même nom.

Conseils : photos au format JPG, de préférence pas trop lourdes (moins de 1 Mo, environ 1600 pixels de large). Sur téléphone, l'option « taille moyenne » au moment du partage suffit.

---

## 5. Votre logo

Le logo du site est dans le dossier `images` (`logo.png`). Une version grand format, avec « Sushumna » correctement écrit, est aussi disponible : `images/logo-sushumna-grand.jpg`. Vous pouvez l'utiliser pour Instagram, vos cartes de visite, etc.

## 6. Les autres textes

Les textes de présentation, les questions fréquentes et les horaires sont directement dans les pages :

- `index.html` : l'accueil (phrase d'accroche, « Moi, c'est Maxence »…)
- `questions.html` : les questions fréquentes
- `contact.html` : les horaires
- `mentions-legales.html` : vos informations légales (SIRET, hébergeur)

Modifiez seulement le texte visible entre les balises, par exemple `<p>Mon texte</p>` → changez « Mon texte ». Ne touchez pas à ce qui est entre `<` et `>`.

---

## 7. Le formulaire de rendez-vous

Les demandes envoyées depuis le formulaire arrivent sur **maxence.vaz@outlook.fr** (service gratuit FormSubmit).

**La toute première fois** que quelqu'un envoie le formulaire (faites un essai vous-même !), vous recevez un e-mail de FormSubmit qui demande de **confirmer votre adresse**. Cliquez sur le bouton de confirmation : ensuite, toutes les demandes arriveront directement dans votre boîte mail. Pensez à regarder dans les spams.

---

## 8. Mettre le site en ligne (gratuit, avec GitHub Pages)

### a) Activer le site
1. Sur GitHub, ouvrez votre dépôt `sitesushumna`.
2. Fusionnez d'abord la maquette dans la branche principale `main` (je peux le faire pour vous : il suffit de me le demander).
3. Allez dans **Settings** (Paramètres) → **Pages** (menu de gauche).
4. Dans « Branch », choisissez **main** et le dossier **/ (root)**, puis **Save**.
5. Après 1 à 2 minutes, le site est visible à l'adresse `https://maxence1993.github.io/sitesushumna/`.

> Le dépôt doit être **public** pour utiliser GitHub Pages gratuitement.

### b) Brancher votre nom de domaine (sushumna.fr)
1. Chez le site où vous avez acheté le nom de domaine (OVH, IONOS, Gandi…), ouvrez la **zone DNS** de `sushumna.fr`.
2. Ajoutez 4 lignes de type **A** pour `sushumna.fr` (champ « sous-domaine » vide) :
   `185.199.108.153` — `185.199.109.153` — `185.199.110.153` — `185.199.111.153`
3. Ajoutez une ligne de type **CNAME** : sous-domaine `www` → `maxence1993.github.io.`
4. Supprimez les anciennes lignes A ou CNAME qui existaient déjà pour `sushumna.fr` et `www`.
5. Sur GitHub, dans **Settings → Pages → Custom domain**, écrivez `sushumna.fr` puis **Save**.
6. Attendez quelques heures (parfois jusqu'à 24 h), puis cochez **Enforce HTTPS** (le petit cadenas).

Pour `m-sushumna.fr` : chez votre fournisseur, demandez une **redirection** vers `https://sushumna.fr`.

### c) Dernière étape
Dans `mentions-legales.html`, l'hébergeur indiqué est GitHub. Si un jour vous changez d'hébergeur, pensez à le modifier.
