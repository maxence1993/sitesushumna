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

## 1. Le planning et les réservations

Fichier : **`mes-contenus/planning.js`**

> 💡 Si la **réservation en ligne** est activée (section 11), les créneaux viennent de votre Google Agenda et ce fichier ne sert plus.

Sur la page « Disponibilités », le client choisit d'abord **la durée** (1h, 1h30 ou 2h), puis le site lui montre **toutes les heures de début possibles**, de 15 minutes en 15 minutes, sur la semaine en cours et la suivante. Le site calcule tout seul :
- que le massage se termine avant la fin de vos horaires ;
- qu'il ne chevauche pas un massage déjà réservé ;
- qu'il reste **15 minutes de pause après chaque massage** ;
- qu'on ne réserve pas un horaire déjà passé (la réservation de dernière minute est possible).

Quand un client touche une heure, il arrive sur le formulaire (ou peut passer par WhatsApp ou le téléphone). **Le rendez-vous n'est confirmé que par vous.** Le site ne bloque pas le créneau tout seul : c'est vous qui l'ajoutez dans la liste des massages réservés (voir plus bas).

Vous n'avez **plus besoin de recopier les semaines** : il suffit de tenir à jour 3 choses.

**a) Vos horaires habituels** (à changer rarement)

```
var HORAIRES_HABITUELS = {
  lundi:    "fermé",
  mardi:    "13h45-17h30",
  mercredi: "12h30-18h00, 21h00",
  ...
};
```
- Une plage : `"13h45-17h30"` (le massage doit être fini avant 17h30).
- Plusieurs plages : `"11h00-13h00, 15h00-21h00"`.
- Une heure de début seule : `"21h00"` (le massage commence à 21h, quelle que soit sa durée).

**b) Les jours particuliers** (vacances, horaires différents un jour précis)

```
var JOURS_PARTICULIERS = [
  "15/12/2026 : fermé",
  "17/12/2026 : 10h00-14h00",
];
```

**c) Les massages réservés** : à chaque nouveau rendez-vous, ajoutez une ligne avec la date, l'heure de début et la durée :

```
var MASSAGES_RESERVES = [
  "27/10/2026 14h00 1h30",
  "30/10/2026 11h00 1h",
];
```
Le site bloque ce créneau et les 15 minutes qui suivent. Vous pouvez supprimer les lignes des jours passés de temps en temps.

**Annulation** : supprimez simplement la ligne du rendez-vous.

⚠️ Chaque ligne est entre guillemets `" "` et se termine par une virgule.

**Réglages** (en bas du fichier) : la pause après chaque massage (15 min), la précision des créneaux (15 min), le délai minimum avant un rendez-vous (0 h : dernière minute possible) et le nombre de semaines affichées (2).

---

## 2. Changer les prix

Fichier : **`mes-contenus/massages-et-tarifs.js`**, en haut :

```
var TARIFS = [
  { duree: "1h",   minutes: 60,  prix: 70  },
  { duree: "1h30", minutes: 90,  prix: 100 },
  { duree: "2h",   minutes: 120, prix: 130 }
];
```

Changez seulement les prix (sans le signe €). Le nombre `minutes` est la durée du massage utilisée par le planning : ne le changez que si la durée change. Juste en dessous, la partie `FORMULES` contient les formules 4 massages (4 × 1h, et 4 × 2h), avec pour chacune sa description, sa règle de règlement (`reglement`) et la durée de chaque massage (`minutes`, utilisée pour proposer les horaires du premier rendez-vous). Les formules apparaissent aussi dans le choix de l'étape 1 de la réservation.
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
- Formats conseillés : photo d'accueil et portrait **verticaux** (4:5), photos d'ambiance **verticales** (3:4). Les photos des massages peuvent être verticales ou horizontales : le site les affiche dans leur format d'origine, sans les couper.

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

Le client doit obligatoirement remplir son **prénom**, son **nom** et son **numéro de téléphone** : le formulaire refuse l'envoi sans eux. L'e-mail que vous recevez contient ces 3 informations, plus le créneau choisi, la durée, le massage souhaité, son e-mail (s'il l'a donné) et son message. L'objet de l'e-mail affiche directement le prénom, le nom, le téléphone et le créneau, par exemple :
« Demande de rendez-vous – Julie Martin – 06 12 34 56 78 – mardi 27 octobre à 17h15 (1h) ».

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
6. Attendez quelques heures (parfois jusqu'à 24h), puis cochez **Enforce HTTPS** (le petit cadenas).

Pour `m-sushumna.fr` : chez votre fournisseur, demandez une **redirection** vers `https://sushumna.fr`.

### c) Dernière étape
Dans `mentions-legales.html`, l'hébergeur indiqué est GitHub. Si un jour vous changez d'hébergeur, pensez à le modifier.

---

## 9. Les avis Google sur le site

Le site peut afficher vos meilleurs avis Google sur la page d'accueil, avec deux boutons : « Voir tous les avis Google » et « Laisser un avis ». Tant que rien n'est rempli, cette partie reste cachée.

Fichier : **`mes-contenus/avis.js`**

1. **Les liens** : dans Google Business Profile, trouvez le lien « Demander des avis » (pour laisser un avis) et le lien de votre fiche (pour voir les avis). Collez-les entre les guillemets de `LIEN_DEPOSER_AVIS` et `LIEN_VOIR_AVIS`.
2. **Les avis** : recopiez vos plus beaux avis, **mot pour mot**, avec le prénom seulement. Un exemple est donné dans le fichier : retirez les `/*` et `*/` autour, et remplacez la ligne `var AVIS = [];` par le bloc.

Les avis ne se mettent pas à jour tout seuls : c'est vous qui choisissez ceux que vous montrez.

---

## 10. Être visible sur Google (« massage Orléans »)

Le site est déjà préparé : titres et descriptions des pages, texte sur Orléans, fiche d'entreprise cachée pour Google, plan du site (`sitemap.xml`). Personne ne peut garantir une place sur Google, mais voici ce qui aide vraiment, par ordre d'importance :

1. **Créer votre fiche Google Business Profile** (gratuit) sur **google.com/business** : nom « Sushumna », catégorie « Masseur » ou « Centre de massage », adresse 4 cours Victor Hugo, téléphone, horaires, photos, lien du site. Google vous envoie un code par courrier ou par téléphone pour confirmer. C'est ce qui fait apparaître votre cabinet sur la carte quand on cherche « massage Orléans ».
2. **Demander des avis** à vos clients satisfaits (avec le lien de votre fiche) : les avis comptent beaucoup.
3. **Déclarer le site à Google** : sur **search.google.com/search-console**, ajoutez `massage-sushumna.com`, puis envoyez le plan du site : `https://massage-sushumna.com/sitemap.xml`.
4. **Mettre le même nom, la même adresse et le même numéro** partout (Instagram, Google, annuaires) : « Sushumna – 4 cours Victor Hugo, 45100 Orléans – 07 50 46 01 10 ».
5. Garder le site **à jour** (planning, photos) : Google aime les sites vivants.

Il faut parfois **plusieurs semaines** avant de voir les premiers effets.

---

## 11. La réservation en ligne reliée à Google Agenda

Quand elle est activée, le planning du site affiche **les vrais créneaux libres de votre Google Agenda**, et chaque réservation crée directement un rendez-vous (en **lavande**) dans votre agenda principal. Vous n'avez plus besoin de remplir « LES MASSAGES RÉSERVÉS » dans `planning.js`.

Elle repose sur votre petite API privée **agenda-api** (dépôt privé, hébergé chez Cloudflare). Son fichier `README.md` explique pas à pas la configuration Google et Cloudflare.

### Activer ou couper la réservation en ligne

1. Ouvrez le fichier **`reservation-en-ligne.js`** (à la racine du site).
2. En haut, remplissez :
   - `API_URL` : l'adresse de votre API, par exemple `"https://agenda-api.mon-sous-domaine.workers.dev"` ;
   - `TURNSTILE_SITE_KEY` : la **clé de site** Turnstile (publique).
3. Enregistrez (« Commit »).

Pour revenir à l'ancien fonctionnement (planning de `planning.js` + demande à confirmer), remettez simplement `var API_URL = "";`.

⚠️ Ne mettez **jamais** de mot de passe, d'identifiant Google ou de clé **secrète** dans les fichiers du site : tout le monde peut les lire. Ils vont uniquement dans Cloudflare (voir le README d'agenda-api).

### Au quotidien

- **Fermer un jour, partir en vacances, bloquer un moment** : créez un événement dans Google Agenda. Le site le voit tout de suite.
- **Annuler un rendez-vous** : supprimez-le dans Google Agenda, le créneau redevient libre.
- **Changer vos horaires habituels ou un jour particulier** : fichier `wrangler.toml` du dépôt **agenda-api** (mêmes règles d'écriture que `planning.js`).
- **Rendez-vous à moins de 24h** : impossible en ligne, le site invite à vous appeler.
- **Un client choisit un horaire du planning** : son rendez-vous est enregistré immédiatement. Pensez à l'appeler si besoin (son numéro est dans la description du rendez-vous).
- **Un client remplit le formulaire sans choisir d'horaire** : c'est toujours une demande, que vous recevez par e-mail comme avant.
