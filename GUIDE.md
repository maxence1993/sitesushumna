# Guide : modifier mon site Sushumna

Ce guide explique comment changer vous-même les prix, les textes, le planning et les photos, puis comment mettre le site en ligne.
Tout se fait **depuis le site GitHub, dans votre navigateur** (ordinateur ou téléphone). Vous n'avez rien à installer.

---

## 0. Utiliser GitHub, pas à pas

GitHub est le site qui garde tous les fichiers de votre site internet. Quand vous changez un fichier sur GitHub, votre site se met à jour tout seul.
GitHub est en anglais : ce guide vous indique le nom exact de chaque bouton.

### Étape 1 – Vous connecter

1. Allez sur **https://github.com** (sur ordinateur ou sur le navigateur de votre téléphone : Chrome ou Safari).
2. En haut à droite, cliquez sur **« Sign in »** (Se connecter).
3. Entrez votre identifiant (**maxence1993**) ou votre e-mail, puis votre mot de passe, puis cliquez sur **« Sign in »**.
4. Si GitHub vous envoie un code par e-mail ou par SMS, recopiez-le.

💡 Astuce : ajoutez cette adresse à vos favoris : **https://github.com/maxence1993/sitesushumna**. Vous arriverez directement sur votre site.

### Étape 2 – Ouvrir le dossier de votre site

1. Ouvrez **https://github.com/maxence1993/sitesushumna**.
2. Vous voyez la liste des fichiers du site : `mes-contenus`, `photos`, `index.html`, etc.

⚠️ **Tant que la maquette n'est pas validée**, elle est rangée dans une « branche » à part (une sorte de brouillon). Si vous ne voyez que le fichier `README.md` :
1. Au-dessus de la liste des fichiers, à gauche, cliquez sur le bouton gris **« main »** (avec une petite flèche).
2. Choisissez **« claude/sushumna-massage-website-5fpf2h »**.
3. Vous voyez maintenant tous les fichiers.

Une fois le site validé et mis en ligne, tout sera dans **main** et vous n'aurez plus besoin de faire ça.

### Étape 3 – Ouvrir le fichier à modifier

1. Cliquez sur le nom du **dossier** (par exemple `mes-contenus`).
2. Cliquez sur le nom du **fichier** (par exemple `planning.js`).
3. Le contenu du fichier s'affiche.

### Étape 4 – Passer en mode modification

1. En haut à droite du contenu du fichier, cliquez sur le **crayon** ✏️ (quand vous passez la souris dessus, il est écrit « Edit this file »).
2. **Sur téléphone** : si vous ne voyez pas le crayon, touchez les **trois petits points « … »** en haut du fichier, puis **« Edit file »**.
3. Le texte devient modifiable, comme dans un traitement de texte.

### Étape 5 – Faire votre modification

- Touchez ou cliquez à l'endroit voulu, puis effacez et écrivez comme d'habitude.
- Vous pouvez utiliser **copier** (Ctrl + C) et **coller** (Ctrl + V). Sur Mac, c'est Cmd + C et Cmd + V. Sur téléphone, faites un appui long.
- Pour retrouver un mot dans un long fichier : cliquez dans le texte, puis tapez **Ctrl + F** (Cmd + F sur Mac).
- L'onglet **« Preview »** en haut montre le fichier final ; l'onglet **« Edit »** permet de revenir à la modification.

### Étape 6 – Enregistrer (« Commit »)

Sur GitHub, « enregistrer » se dit **« Commit »**.

1. En haut à droite, cliquez sur le bouton vert **« Commit changes… »**.
2. Une petite fenêtre s'ouvre. Dans **« Commit message »**, vous pouvez écrire en quelques mots ce que vous avez fait (par exemple « Planning semaine du 2 novembre »). Ce n'est pas obligatoire.
3. Laissez cochée l'option **« Commit directly to the … branch »** (enregistrer directement).
4. Cliquez sur le bouton vert **« Commit changes »**.

C'est enregistré ! ✅

### Étape 7 – Vérifier sur votre site

1. Attendez **1 à 2 minutes**.
2. Ouvrez votre site et **rechargez la page** (la flèche en rond, ou tirez la page vers le bas sur téléphone).
3. Si l'ancienne version s'affiche encore, attendez une minute de plus et rechargez à nouveau.

Pour voir où en est la mise à jour : sur GitHub, cliquez sur l'onglet **« Actions »** en haut. Un rond orange 🟠 veut dire « en cours ». Une coche verte ✅ veut dire « terminé ».

### En cas d'erreur : revenir en arrière

Pas de panique : GitHub garde **toutes** les anciennes versions de chaque fichier.

**Si votre page est vide ou si le planning a disparu**, c'est presque toujours un guillemet `"` ou une virgule `,` oubliés.
1. Rouvrez le fichier avec le crayon ✏️.
2. Comparez avec les exemples de ce guide.
3. Corrigez, puis enregistrez.

**Pour remettre l'ancienne version d'un fichier :**
1. Ouvrez le fichier sur GitHub (étape 3).
2. En haut à droite, cliquez sur **« History »** (avec une petite horloge 🕘). Vous voyez la liste de toutes les modifications, de la plus récente à la plus ancienne.
3. Trouvez la dernière version qui marchait. À droite de cette ligne, cliquez sur le bouton **« <> »** (« View code at this point »).
4. Ouvrez le même fichier, puis cliquez sur le bouton **« Copy raw file »** (deux petits carrés, en haut à droite) : tout le contenu est copié.
5. Revenez sur la version actuelle du fichier (cliquez sur le nom du dépôt `sitesushumna` en haut, puis rouvrez le fichier). Cliquez sur le crayon ✏️.
6. Sélectionnez tout le texte (Ctrl + A, ou Cmd + A sur Mac), puis collez (Ctrl + V).
7. Enregistrez (étape 6).

Et si vous êtes bloqué, demandez-moi : je peux aussi corriger ou annuler pour vous.

### Les règles d'or

- ✏️ Ne changez que le **texte entre les guillemets** `"…"` et les **nombres**.
- 🔒 Ne supprimez jamais les guillemets `"`, les virgules `,`, ni les accolades `{ }` et les crochets `[ ]`.
- 🚫 Les lignes qui commencent par `/*` ou `//` sont des explications pour vous : elles n'apparaissent pas sur le site.
- 💾 Faites une seule modification à la fois, enregistrez, puis vérifiez sur le site.

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

**Quand quelqu'un réserve (ou annule) :**
1. Ouvrez `mes-contenus/planning.js` puis cliquez sur le crayon ✏️ (voir partie 0).
2. Trouvez le bon jour dans la bonne semaine.
3. Remplacez le mot `libre` par `pris` devant l'heure réservée (ou `pris` par `libre` en cas d'annulation).
4. Enregistrez avec « Commit changes ».

**Chaque semaine (par exemple le dimanche soir), pour ajouter la semaine suivante :**
1. Ouvrez `mes-contenus/planning.js` puis cliquez sur le crayon ✏️.
2. Sélectionnez le bloc de la dernière semaine : de l'accolade `{` jusqu'à `}` compris, puis copiez-le.
3. Juste après ce `}`, ajoutez une **virgule**, passez à la ligne et collez.
4. Dans le bloc collé, changez la date `semaine` (la date du lundi suivant) et les créneaux.
5. Vous pouvez supprimer le bloc de la semaine passée (sinon, le site le cache tout seul).
6. En haut du fichier, changez la date : `PLANNING_MIS_A_JOUR_LE = "25/10/2026";`
7. Enregistrez avec « Commit changes ».

Exemple de fin de fichier avec deux semaines (observez bien la virgule entre les deux blocs, et le `];` tout à la fin) :

```
  {
    semaine:  "02/11/2026",
    lundi:    "9h00 libre, 10h30 pris",
    ...
    dimanche: "fermé"
  },
  {
    semaine:  "09/11/2026",
    lundi:    "9h00 libre, 10h30 libre",
    ...
    dimanche: "fermé"
  }

];
```

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

**Étape A – Renommer la photo (avant de l'envoyer)**

Le nom doit être **exactement** celui du tableau : en minuscules, sans accent, sans espace, avec `.jpg` à la fin.

- **Sur ordinateur (Windows)** : clic droit sur la photo → **Renommer**.
- **Sur Mac** : cliquez une fois sur la photo, appuyez sur la touche **Entrée**, tapez le nouveau nom.
- **Sur Android** : ouvrez l'application **Fichiers**, faites un appui long sur la photo → **Renommer**.
- **Sur iPhone** : depuis Photos, touchez **Partager** → **Enregistrer dans Fichiers**. Ensuite, dans l'application **Fichiers**, faites un appui long sur la photo → **Renommer**.

⚠️ Si la photo s'appelle `.jpeg`, `.JPG` ou `.png`, renommez aussi la fin en `.jpg`. Si ça ne marche pas, demandez-moi.

**Étape B – Envoyer la photo sur GitHub**
1. Ouvrez votre dépôt sur GitHub, puis cliquez sur le dossier **`photos`**.
2. En haut à droite, cliquez sur **« Add file »**, puis sur **« Upload files »**. Sur téléphone, ce bouton peut s'appeler simplement **« + »** ou se trouver dans le menu **« … »**.
3. Glissez votre photo dans le cadre, ou cliquez sur **« choose your files »** pour la choisir. Vous pouvez en envoyer plusieurs d'un coup.
4. Attendez que la photo apparaisse dans la liste, sous le cadre.
5. En bas, cliquez sur le bouton vert **« Commit changes »**.
6. Après 1 à 2 minutes, la photo apparaît sur le site, à la place du cadre doré.

**Remplacer une photo** : envoyez simplement une nouvelle photo **avec le même nom**. Elle remplace l'ancienne.

**Supprimer une photo** : dans le dossier `photos`, cliquez sur la photo, puis sur les trois points **« … »** en haut à droite → **« Delete file »** → **« Commit changes »**.

**Astuce pour les massages** : au lieu de renommer la photo, vous pouvez aussi écrire son nom actuel dans `mes-contenus/massages-et-tarifs.js`, sur la ligne `photo: "…"` du massage. Exemple : `photo: "IMG_2041.jpg",`. Attention, le nom doit être recopié exactement, majuscules comprises.

**Taille et format des photos**
- Format **JPG** obligatoire (pas de HEIC, PNG ni PDF).
- Gardez-les **légères** : idéalement moins de 500 Ko, environ 1000 à 1400 pixels de large. Une photo directement sortie du téléphone pèse 10 à 18 Mo : elle ralentit beaucoup le site. Si vous n'arrivez pas à les réduire, envoyez-les-moi, je m'en occupe.
- Formats conseillés : photo d'accueil et portrait **verticaux** (4:5), photos d'ambiance **verticales** (3:4). Les photos des massages peuvent être verticales ou horizontales : le site les coupe automatiquement pour qu'elles tiennent dans leur cadre.

**Choisir la partie visible d'une photo de massage**
Quand une photo est coupée, le site garde par défaut le milieu. Pour garder une autre partie (par exemple les mains, qui sont plus bas), changez la ligne `cadrage` du massage dans `mes-contenus/massages-et-tarifs.js` : `cadrage: "50% 30%"` (le 2e nombre est la hauteur : 0% = le haut de la photo, 100% = le bas).

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
