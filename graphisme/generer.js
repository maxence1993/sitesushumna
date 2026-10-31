/* =====================================================================
   SUSHUMNA – génération des visuels (logo, cartes, stories, grille)
   ---------------------------------------------------------------------
   Chaque visuel est écrit en HTML dans « sources/ » (modifiable), puis
   converti en JPEG dans « jpeg/ ».
   Pour régénérer : node graphisme/generer.js
   ===================================================================== */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const DOSSIER = __dirname;
const SOURCES = path.join(DOSSIER, 'sources');
const JPEG = path.join(DOSSIER, 'jpeg');
const ICONES = fs.readFileSync(path.join(DOSSIER, '..', 'images', 'icones.svg'), 'utf8');
const SPRITE = ICONES.slice(ICONES.indexOf('>') + 1, ICONES.lastIndexOf('</svg>'));

/* Couleurs et polices reprises de style.css */
const CHARTE = `
:root{--sable:#fbf6ec;--sable-2:#f3e8d3;--creme:#fffdf8;--bordure:#e6d5b5;--or:#d9a73b;--or-clair:#f6e3b4;
--or-texte:#87601a;--brun:#3d2a1b;--brun-doux:#5c4330;--brun-logo:#9a712f;
--titres:"Lora",Georgia,serif;--texte:"Nunito","Segoe UI",Arial,sans-serif;--script:"Great Vibes",cursive}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{width:var(--w);height:var(--h);overflow:hidden;background:var(--creme);color:var(--brun);font-family:var(--texte)}
.page{position:relative;width:var(--w);height:var(--h);overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.ico{width:1em;height:1em;flex:none;color:var(--or-texte)}
.titre{font-family:var(--titres);font-weight:600;line-height:1.15;margin:0;color:var(--brun)}
.surtitre{margin:0;font-weight:800;text-transform:uppercase;letter-spacing:.22em;color:var(--or-texte)}
.etoiles{margin:0;color:#b9801a;letter-spacing:.14em}
.sous{margin:0;color:var(--brun-doux)}
`;

const LIEN_POLICES = 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;1,500&family=Nunito:wght@400;600;700;800&family=Great+Vibes&display=swap';

const ico = (nom) => `<svg class="ico" aria-hidden="true"><use href="#${nom}"/></svg>`;

function document_({ w, h, css = '', body }) {
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${LIEN_POLICES}" rel="stylesheet">
<style>${CHARTE}${css}</style>
</head>
<body style="--w:${w}px;--h:${h}px">
<svg width="0" height="0" style="position:absolute" aria-hidden="true">${SPRITE}</svg>
${body.startsWith('<div class="page"') ? body : `<div class="page">${body}</div>`}
</body>
</html>
`;
}

const CONTACT = {
  tel: '07 50 46 01 10',
  insta: '@massage_sushumna_orleans',
  adresse: '4 cours Victor Hugo, 45100 Orléans',
  site: 'massage-sushumna.com',
};

const MASSAGES = [
  ['Massage sur mesure', 'Construit avec vous, selon vos besoins du jour'],
  ['Massage sportif', 'Pour des muscles qui travaillent, et qui ont besoin de souffler'],
  ['Massage relaxant', 'Relâche et apaise'],
  ['Massage réconfort', 'Un moment de tendresse, comme un câlin'],
  ['Massage ayurvédique (indien)', 'Tonique et énergisant'],
  ['Massage Chong Mai (chinois)', 'Pour retrouver son axe et son élan'],
  ['Massage au bol tibétain', 'Se laisser porter par les vibrations du son'],
  ['Réflexologie abdominale', 'Libérer les maux… et les mots'],
];

/* Avis : extraits mot pour mot de mes-contenus/avis.js */
const AVIS = {
  jerome: { texte: 'Un vrai moment de détente, je suis ressorti complètement relaxé.', nom: 'Jérôme B.' },
  emilie: { texte: 'Il a su me mettre à l’aise afin de me détendre et de profiter de ce moment.', nom: 'Emilie F.' },
  francois: { texte: 'Un intense moment de déconnexion dans une ambiance déco/musique/parfum très sereine.', nom: 'François D.' },
  chahir: { texte: 'Un vrai moment de détente ! Le masseur était excellent, professionnel et sympa.', nom: 'Chahir Z.' },
};

const ETOILES = '★★★★★';

const PAGES = [];

/* ---------- 1. Logo : couleur sur crème ---------- */
PAGES.push({
  nom: '01-logo-principal', w: 1600, h: 1000, echelle: 2,
  html: document_({ w: 1600, h: 1000,
    css: `.page{background:radial-gradient(circle at 50% 42%,#fff 0,var(--creme) 55%,var(--sable-2) 100%)}`,
    body: `<div class="page">
  <img src="../assets/logo-hd.png" alt="Sushumna" style="width:1040px;height:auto">
  <p class="surtitre" style="margin-top:60px;font-size:30px">Massages bien-être · Orléans</p>
</div>` }),
});

/* ---------- 2. Logo : or sur brun ---------- */
PAGES.push({
  nom: '02-logo-fond-brun', w: 1600, h: 1000, echelle: 2,
  html: document_({ w: 1600, h: 1000,
    css: `.page{background:radial-gradient(circle at 50% 42%,#4a3422 0,var(--brun) 60%,#2e2014 100%)}
.surtitre{color:var(--or-clair)}`,
    body: `<div class="page">
  <img src="../assets/logo-hd-or.png" alt="Sushumna" style="width:1040px;height:auto">
  <p class="surtitre" style="margin-top:60px;font-size:30px">Massages bien-être · Orléans</p>
</div>` }),
});

/* ---------- 3. Emblème seul (avatar, sceau) ---------- */
PAGES.push({
  nom: '03-logo-embleme', w: 1080, h: 1080, echelle: 1,
  html: document_({ w: 1080, h: 1080,
    css: `.page{background:var(--creme)}`,
    body: `<div class="page">
  <img src="../assets/embleme-hd.png" alt="Sushumna" style="height:600px;width:auto">
</div>` }),
});

/* ---------- 4. Carte de visite : recto (85 × 55 mm, 300 dpi) ---------- */
PAGES.push({
  nom: '04-carte-visite-recto', w: 1004, h: 650, echelle: 1,
  html: document_({ w: 1004, h: 650,
    css: `.page{background:radial-gradient(circle at 50% 42%,#fff 0,var(--creme) 55%,var(--sable-2) 100%)}
.surtitre{color:var(--or-texte);font-size:20px}
.slogan{margin:26px 0 0;font-family:var(--titres);font-style:italic;font-size:26px;color:var(--brun-doux)}`,
    body: `<div class="page">
  <img src="../assets/logo-hd.png" alt="Sushumna" style="width:600px;height:auto">
</div>` }),
});

/* ---------- 5. Carte de visite : verso ---------- */
PAGES.push({
  nom: '05-carte-visite-verso', w: 1004, h: 650, echelle: 1,
  html: document_({ w: 1004, h: 650,
    css: `.page{justify-content:space-between;align-items:stretch;text-align:left;padding:70px 78px;background:var(--creme)}
.haut p{margin:0}
.nom{font-family:var(--titres);font-weight:600;font-size:66px;line-height:1.1;color:var(--brun)}
.role{font-family:var(--titres);font-style:italic;font-size:32px;color:var(--or-texte);margin-top:10px}
.contacts{display:flex;flex-direction:column;gap:14px;font-size:27px;font-weight:700;color:var(--brun)}
.contacts div{display:flex;align-items:center;gap:20px}
.contacts .ico{width:30px;height:30px}
.marque{position:absolute;right:70px;top:70px;width:200px;opacity:1}
.bas{display:flex;justify-content:space-between;align-items:flex-end;gap:40px;border-top:2px solid var(--bordure);padding-top:26px}
.qr{display:flex;flex-direction:column;align-items:center;gap:8px;flex:none}
.qr img{width:160px;height:auto}
.qr span{font-size:19px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--or-texte)}`,
    body: `<img class="marque" src="../assets/embleme-hd.png" alt="">
<div class="haut">
  <p class="nom">Maxence Vaz</p>
  <p class="role">Massages bien-être</p>
</div>
<div class="bas">
  <div class="contacts">
    <div>${ico('tel')}<span>${CONTACT.tel}</span></div>
    <div>${ico('instagram')}<span>${CONTACT.insta}</span></div>
    <div>${ico('lieu')}<span>${CONTACT.adresse}</span></div>
    <div><span style="width:30px"></span><span>${CONTACT.site}</span></div>
  </div>
  <div class="qr">
    <img src="../assets/qr-instagram.png" alt="QR code Instagram">
    <span>Suivez-nous</span>
  </div>
</div>` }),
});

/* ---------- 6. Carte cadeau (946 × 432 px, à 2× pour l'impression) ---------- */
PAGES.push({
  nom: '06-carte-cadeau', w: 946, h: 432, echelle: 2,
  html: document_({ w: 946, h: 432,
    css: `.page{flex-direction:row;justify-content:flex-start;align-items:stretch;text-align:left;background:var(--creme)}
.gauche{width:34%;background:#e8cb91 url("../../images/carte-fond.jpg") bottom / 100% auto no-repeat;display:flex;flex-direction:column;justify-content:space-between;align-items:center;padding:40px 26px}
.gauche img{width:250px;height:auto}
.qr{background:var(--creme);border-radius:14px;padding:10px;box-shadow:0 6px 16px rgba(61,42,27,.18)}
.qr img{width:124px;height:124px}
.tel{font-family:var(--script);font-size:50px;color:var(--brun);line-height:1}
.droite{position:relative;width:66%;display:flex;flex-direction:column;justify-content:space-between;padding:38px 48px;text-align:center}
.court{width:calc(100% - 170px)}
.insta{position:absolute;right:48px;bottom:34px;width:150px;display:flex;flex-direction:column;align-items:center;margin:0}
.insta span{font-family:var(--script);font-size:42px;line-height:1;color:var(--brun-logo);margin-bottom:-4px}
.insta img{width:150px;height:150px}
.droite h1{font-family:var(--script);font-weight:400;font-size:88px;line-height:1;margin:0;color:#111}
.ligne{font-family:var(--script);font-size:38px;color:#111;margin:0;padding-bottom:4px;border-bottom:3px solid #222;line-height:1.3;text-align:left}`,
    body: `<div class="gauche">
  <img src="../assets/logo-hd.png" alt="Sushumna">
  <span class="tel">${CONTACT.tel}</span>
</div>
<div class="droite">
  <h1>Carte cadeau</h1>
  <p class="ligne">Pour :</p>
  <p class="ligne court">De la part de :</p>
  <p class="ligne court">Pour un massage :</p>
  <p class="ligne court">Valable jusqu’à :</p>
  <div class="insta"><span>Instagram</span><img src="../assets/qr-instagram-or.png" alt="QR code Instagram"></div>
</div>` }),
});

/* ---------- 7 à 9. Couvertures des stories à la une ---------- */
const COUVERTURES = [
  ['07-une-tarifs', 'euro', 'Tarifs'],
  ['08-une-prestations', 'feuille', 'Prestations'],
  ['09-une-avis', 'coeur', 'Avis'],
  ['43-une-creneaux', 'calendrier', 'Créneaux'],
];
for (const [nom, icone, titre] of COUVERTURES) {
  PAGES.push({
    nom, w: 1080, h: 1080, echelle: 1,
    html: document_({ w: 1080, h: 1080,
      css: `.page{background:radial-gradient(circle at 50% 50%,var(--creme) 0,var(--sable-2) 100%)}
.rond{width:760px;height:760px;border-radius:50%;border:8px solid var(--or);background:var(--creme);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px}
.rond .ico{width:200px;height:200px;color:var(--brun-logo)}
.rond .titre{font-size:96px}`,
      body: `<div class="page"><div class="rond">${ico(icone)}<p class="titre">${titre}</p></div></div>` }),
  });
}

/* ---------- Pied commun des stories ---------- */
const PIED_STORY = `<p class="sous" style="font-size:32px;font-weight:700;color:var(--or-texte)">${CONTACT.site} · ${CONTACT.tel}</p>`;

/* ---------- 10. Story « Tarifs » (1080 × 1920) ----------
   Les prix sont lus directement dans mes-contenus/massages-et-tarifs.js. */
const { TARIFS: PRIX_SEANCES, FORMULES: PRIX_FORMULES } = require('vm').runInNewContext(
  fs.readFileSync(path.join(DOSSIER, '..', 'mes-contenus', 'massages-et-tarifs.js'), 'utf8') + ';({ TARIFS, FORMULES })',
  {}
);
const euros = (n) => `${n}\u00a0€`;
PAGES.push({
  nom: '10-story-tarifs', w: 1080, h: 1920, echelle: 1,
  html: document_({ w: 1080, h: 1920,
    css: `.page{justify-content:flex-start;padding:200px 90px 180px;background:linear-gradient(180deg,var(--creme) 0%,var(--sable-2) 100%)}
.logo{width:320px;height:auto}
.titre{font-size:104px;margin:32px 0 14px}
.sous{font-size:32px;max-width:860px;margin:0 0 40px}
.bloc{width:100%;margin-bottom:34px}
.bloc h2{font-family:var(--titres);font-weight:600;font-size:40px;margin:0 0 18px;color:var(--or-texte);text-transform:uppercase;letter-spacing:.12em}
.ligne{display:flex;justify-content:space-between;align-items:center;background:var(--creme);border:2px solid var(--bordure);border-radius:26px;padding:20px 40px;margin-bottom:16px;font-size:42px;font-weight:700;text-align:left}
.ligne small{display:block;font-size:26px;font-weight:700;color:var(--or-texte);margin-top:2px}
.ligne .prix{font-family:var(--titres);font-weight:600;font-size:52px;color:var(--or-texte)}
.ligne--special{background:#fff8e6;border-color:var(--or)}
.formule{display:flex;flex-direction:column;align-items:flex-start;background:#fff8e6;border:2px solid var(--or);border-radius:26px;padding:20px 40px;margin-bottom:16px;text-align:left}
.formule .haut{display:flex;justify-content:space-between;align-items:center;width:100%}
.formule strong{font-size:40px}
.formule .prix{font-family:var(--titres);font-weight:600;font-size:52px;color:var(--or-texte)}
.formule em{font-style:normal;font-weight:800;font-size:26px;color:var(--or-texte);margin-top:4px}`,
    body: `<img class="logo" src="../assets/logo-hd.png" alt="Sushumna">
<p class="surtitre" style="font-size:26px">Tarifs</p>
<h1 class="titre">Mes tarifs</h1>
<p class="sous">Tous les massages sont au même prix : seule la durée change.</p>
<div class="bloc">
  <h2>Séances</h2>
${PRIX_SEANCES.map((t) => `  <div class="ligne${t.massage ? ' ligne--special' : ''}"><span>${t.duree}${t.massage ? `<small>${t.massage} uniquement</small>` : ''}</span><span class="prix">${euros(t.prix)}</span></div>`).join('\n')}
</div>
<div class="bloc">
  <h2>Formules 4 massages</h2>
${PRIX_FORMULES.map((f) => `  <div class="formule"><div class="haut"><strong>${f.nom.replace(/^Formule /, '').replace("'", '’')}</strong><span class="prix">${euros(f.prix)}</span></div><em>${f.avantage.replace("'", '’')}</em></div>`).join('\n')}
</div>
${PIED_STORY}` }),
});

/* ---------- 11. Story « Prestations » (1080 × 1920) ---------- */
PAGES.push({
  nom: '11-story-prestations', w: 1080, h: 1920, echelle: 1,
  html: document_({ w: 1080, h: 1920,
    css: `.page{justify-content:flex-start;padding:250px 80px 260px;background:linear-gradient(180deg,var(--creme) 0%,var(--sable-2) 100%)}
.logo{width:340px;height:auto}
.titre{font-size:118px;margin:40px 0 50px}
.grille{display:grid;grid-template-columns:1fr 1fr;gap:26px;width:100%}
.carte{background:var(--creme);border:2px solid var(--bordure);border-left:10px solid var(--or);border-radius:24px;padding:30px 28px;text-align:left;min-height:210px}
.carte h2{font-family:var(--titres);font-weight:600;font-size:38px;line-height:1.2;margin:0 0 12px;color:var(--brun)}
.carte p{margin:0;font-size:27px;line-height:1.35;color:var(--brun-doux);font-style:italic}`,
    body: `<img class="logo" src="../assets/logo-hd.png" alt="Sushumna">
<p class="surtitre" style="font-size:28px">Prestations</p>
<h1 class="titre">Mes massages</h1>
<div class="grille">
${MASSAGES.map(([nom, accroche]) => `  <div class="carte"><h2>${nom}</h2><p>${accroche}</p></div>`).join('\n')}
</div>
<p class="sous" style="margin-top:auto;font-size:32px;font-weight:700;color:var(--or-texte)">${CONTACT.site} · ${CONTACT.tel}</p>` }),
});

/* ---------- 12. Story « Avis » (1080 × 1920) ---------- */
const citation = (a) => `<div class="avis"><p>« ${a.texte} »</p><span>${a.nom}</span></div>`;
PAGES.push({
  nom: '12-story-avis', w: 1080, h: 1920, echelle: 1,
  html: document_({ w: 1080, h: 1920,
    css: `.page{justify-content:flex-start;padding:250px 90px 260px;background:linear-gradient(180deg,var(--creme) 0%,var(--sable-2) 100%)}
.logo{width:380px;height:auto}
.titre{font-size:124px;margin:44px 0 18px}
.etoiles{font-size:76px;margin:10px 0 14px}
.note{font-size:36px;font-weight:700;color:var(--brun-doux);margin:0 0 60px}
.avis{background:var(--creme);border:2px solid var(--bordure);border-radius:32px;padding:44px 52px;margin-bottom:34px;width:100%;box-shadow:0 10px 30px rgba(92,67,48,.10)}
.avis p{font-family:var(--titres);font-style:italic;font-size:40px;line-height:1.4;margin:0 0 20px;color:var(--brun)}
.avis span{font-weight:800;font-size:30px;color:var(--or-texte);text-transform:uppercase;letter-spacing:.1em}`,
    body: `<img class="logo" src="../assets/logo-hd.png" alt="Sushumna">
<p class="surtitre" style="font-size:28px">Avis clients</p>
<h1 class="titre">Ce qu’ils disent</h1>
<p class="etoiles">${ETOILES}</p>
<p class="note">5 / 5 · avis Google</p>
${[AVIS.jerome, AVIS.emilie, AVIS.francois].map(citation).join('\n')}
${PIED_STORY}` }),
});

/* ---------- 13 à 18. Grille principale (1080 × 1350) ---------- */
const photo = (fichier, position = 'center') =>
  `<img class="fond" src="../../photos/${fichier}" alt="" style="object-position:${position}">`;

const voileBas = `.fond{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.voile{position:absolute;inset:0;background:linear-gradient(to top,rgba(46,32,22,.92) 0%,rgba(46,32,22,.0) 58%)}
.legende{position:absolute;left:70px;right:70px;bottom:90px;text-align:left;color:var(--creme)}
.legende .surtitre{color:var(--or-clair);font-size:26px}
.legende .titre{color:var(--creme);font-size:92px;margin:14px 0 14px}
.legende .sous{color:var(--creme);font-size:38px;margin:0}
.marque-haut{position:absolute;left:70px;top:70px;width:300px;height:auto}`;

const surPhoto = (fichier, { surtitre, titre, sous, position }) => ({
  css: voileBas,
  body: `${photo(fichier, position)}
<div class="voile"></div>
<img class="marque-haut" src="../assets/logo-hd-or.png" alt="Sushumna">
<div class="legende"><p class="surtitre">${surtitre}</p><h2 class="titre">${titre}</h2><p class="sous">${sous}</p></div>`,
});

const surCreme = (inner, extraCss = '') => ({
  css: `.page{background:var(--creme);padding:110px 90px}${extraCss}`,
  body: inner,
});

const grille = [
  ['13-grille-accueil', surPhoto('accueil.jpg', { surtitre: 'Sushumna · Orléans', titre: 'Un moment pour vous', sous: 'Massages bien-être personnalisés', position: 'center 30%' })],
  ['14-grille-bienvenue', surCreme(`<img src="../assets/embleme-hd.png" alt="" style="height:200px;width:auto;margin-bottom:30px">
<p class="surtitre" style="font-size:28px">Bienvenue</p>
<h2 class="titre" style="font-size:84px;margin:16px 0 26px">Le bonheur est en vous</h2>
<p class="sous" style="font-size:38px;max-width:780px">Des massages bien-être, à Orléans, adaptés à vos besoins du jour.</p>`)],
  ['15-grille-relaxant', surPhoto('massage-relaxant.jpg', { surtitre: 'Massage', titre: 'Relaxant', sous: 'Relâche et apaise', position: 'center' })],
  ['16-grille-reservation', surCreme(`<p class="surtitre" style="font-size:28px">Réserver</p>
<h2 class="titre" style="font-size:96px;margin:20px 0 60px">Votre massage</h2>
<div style="width:100%;display:flex;flex-direction:column;gap:24px;font-size:46px;font-weight:700">
  <div class="ligne-grille"><span>1h</span><span class="prix">70 €</span></div>
  <div class="ligne-grille"><span>1h30</span><span class="prix">100 €</span></div>
  <div class="ligne-grille"><span>2h</span><span class="prix">130 €</span></div>
</div>
<p class="sous" style="margin-top:auto;font-size:34px;font-weight:700;color:var(--or-texte)">Réservation en ligne sur ${CONTACT.site}</p>`,
    `.ligne-grille{display:flex;justify-content:space-between;align-items:center;background:var(--sable-2);border:2px solid var(--bordure);border-radius:28px;padding:26px 44px}
.ligne-grille .prix{font-family:var(--titres);font-weight:600;color:var(--or-texte);font-size:52px}`)],
  ['17-grille-bol-tibetain', surPhoto('massage-bol-tibetain.jpg', { surtitre: 'Massage', titre: 'Au bol tibétain', sous: 'Se laisser porter par les vibrations du son', position: 'center' })],
  ['18-grille-avis', surCreme(`<p class="surtitre" style="font-size:28px">Avis clients</p>
<p class="etoiles" style="font-size:80px;margin:30px 0 40px">${ETOILES}</p>
<p class="titre" style="font-size:54px;font-style:italic;font-weight:500;line-height:1.35">« ${AVIS.chahir.texte} »</p>
<p class="surtitre" style="margin-top:50px;font-size:28px;color:var(--brun-doux)">${AVIS.chahir.nom}</p>`)],
];
for (const [nom, contenu] of grille) {
  const hauteur = (contenu.body.includes('class="voile"') || nom === '14-grille-bienvenue') ? 1080 : 1350;
  PAGES.push({
    nom, w: 1080, h: hauteur, echelle: 1,
    html: document_({ w: 1080, h: hauteur, css: contenu.css, body: `<div class="page">${contenu.body}</div>` }),
  });
}

/* ---------- 19 à 26. Une story par prestation (1080 × 1920) ----------
   Les textes sont lus directement dans mes-contenus/massages-et-tarifs.js,
   pour rester identiques à ceux du site. */
const vm = require('vm');
const contenuMassages = vm.runInNewContext(
  fs.readFileSync(path.join(DOSSIER, '..', 'mes-contenus', 'massages-et-tarifs.js'), 'utf8') + ';MASSAGES',
  {}
);
const slug = (texte) => texte.toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/\(.*?\)/g, '').replace(/^massage /, '').trim()
  .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

contenuMassages.forEach((m, i) => {
  const numero = String(19 + i).padStart(2, '0');
  const apporte = m.apporte.map((a) => `<li>${a}</li>`).join('');
  PAGES.push({
    nom: `${numero}-story-prestation-${slug(m.nom)}`, w: 1080, h: 1920, echelle: 1,
    html: document_({ w: 1080, h: 1920,
      css: `.page{justify-content:flex-start;background:var(--creme)}
.entete-photo{position:relative;width:100%;height:520px;flex:none}
.entete-photo img{width:100%;height:100%;object-fit:cover}
.entete-photo::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,rgba(46,32,22,0) 55%,var(--creme) 100%)}
.corps{position:relative;width:100%;padding:0 84px;margin-top:-70px;text-align:left;display:flex;flex-direction:column;flex:1}
.titre{font-size:84px;line-height:1.1;margin:0}
.accroche{font-family:var(--titres);font-style:italic;font-size:36px;line-height:1.3;color:var(--or-texte);margin:18px 0 40px}
.bloc{margin-bottom:34px}
.bloc h3{font-family:var(--texte);font-size:22px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--or-texte);margin:0 0 10px}
.bloc p{font-size:29px;line-height:1.4;margin:0;color:var(--brun)}
.bloc ul{list-style:none;padding:0;margin:0}
.bloc li{position:relative;padding-left:40px;font-size:29px;line-height:1.4;margin-bottom:10px}
.bloc li::before{content:'✦';position:absolute;left:0;top:0;color:var(--or);font-size:24px;line-height:1.7}
.attention{background:#fff8e6;border:2px solid var(--or);border-radius:24px;padding:22px 28px;font-size:23px;line-height:1.38;margin:0 0 34px}
.pied-story{margin-top:auto;margin-bottom:70px;width:260px;height:auto;align-self:center}`,
      body: `<div class="entete-photo"><img src="../../photos/${m.photo}" alt=""></div>
<div class="corps">
  <h1 class="titre">${m.nom}</h1>
  <p class="accroche">${m.accroche}</p>
  <div class="bloc"><h3>En quoi ça consiste</h3><p>${m.consiste}</p></div>
  <div class="bloc"><h3>Pour qui</h3><p>${m.pourQui}</p></div>
  <div class="bloc"><h3>Ce qu’il apporte</h3><ul>${apporte}</ul></div>
  ${m.bonASavoir ? `<p class="attention"><strong>Bon à savoir :</strong> ${m.bonASavoir}</p>` : ''}
  <img class="pied-story" src="../assets/logo-hd.png" alt="Sushumna">
</div>` }),
  });
});

/* ---------- 27 à 34. Une publication par prestation (1080 × 1350) ---------- */
contenuMassages.forEach((m, i) => {
  const numero = String(27 + i).padStart(2, '0');
  const apporte = m.apporte.map((a) => `<li>${a}</li>`).join('');
  PAGES.push({
    nom: `${numero}-post-prestation-${slug(m.nom)}`, w: 1080, h: 1350, echelle: 1,
    html: document_({ w: 1080, h: 1350,
      css: `.page{justify-content:flex-start;background:var(--creme)}
.entete-photo{position:relative;width:100%;height:320px;flex:none}
.entete-photo img{width:100%;height:100%;object-fit:cover}
.entete-photo::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,rgba(46,32,22,0) 50%,var(--creme) 100%)}
.corps{position:relative;width:100%;padding:0 70px;margin-top:-50px;text-align:left;display:flex;flex-direction:column;flex:1}
.titre{font-size:66px;line-height:1.1;margin:0}
.accroche{font-family:var(--titres);font-style:italic;font-size:28px;line-height:1.3;color:var(--or-texte);margin:10px 0 22px}
.bloc{margin-bottom:18px}
.bloc h3{font-family:var(--texte);font-size:18px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--or-texte);margin:0 0 6px}
.bloc p{font-size:24px;line-height:1.36;margin:0;color:var(--brun)}
.bloc ul{list-style:none;padding:0;margin:0}
.bloc li{position:relative;padding-left:32px;font-size:24px;line-height:1.36;margin-bottom:6px}
.bloc li::before{content:'✦';position:absolute;left:0;top:0;color:var(--or);font-size:19px;line-height:1.6}
.attention{background:#fff8e6;border:2px solid var(--or);border-radius:20px;padding:14px 20px;font-size:20px;line-height:1.36;margin:0 0 18px}
.pied-story{margin-top:auto;margin-bottom:34px;width:200px;height:auto;align-self:center}`,
      body: `<div class="entete-photo"><img src="../../photos/${m.photo}" alt=""></div>
<div class="corps">
  <h1 class="titre">${m.nom}</h1>
  <p class="accroche">${m.accroche}</p>
  <div class="bloc"><h3>En quoi ça consiste</h3><p>${m.consiste}</p></div>
  <div class="bloc"><h3>Pour qui</h3><p>${m.pourQui}</p></div>
  <div class="bloc"><h3>Ce qu’il apporte</h3><ul>${apporte}</ul></div>
  ${m.bonASavoir ? `<p class="attention"><strong>Bon à savoir :</strong> ${m.bonASavoir}</p>` : ''}
  <img class="pied-story" src="../assets/logo-hd.png" alt="Sushumna">
</div>` }),
  });
});

/* ---------- 35 à 42. Une publication photo par prestation (1080 × 1350) ---------- */
contenuMassages.forEach((m, i) => {
  const numero = String(35 + i).padStart(2, '0');
  const reflexologie = m.nom.startsWith('Réflexologie');
  const titre = reflexologie
    ? m.nom
    : (() => { const t = m.nom.replace(/^Massage /, '').replace(/\s*\(.*?\)/, ''); return t.charAt(0).toUpperCase() + t.slice(1); })();
  const contenu = surPhoto(m.photo, {
    surtitre: reflexologie ? 'Bien-être' : 'Massage',
    titre,
    sous: m.accroche,
    position: 'center',
  });
  PAGES.push({
    nom: `${numero}-photo-${slug(m.nom)}`, w: 1080, h: 1080, echelle: 1,
    html: document_({ w: 1080, h: 1080, css: contenu.css, body: `<div class="page">${contenu.body}</div>` }),
  });
});

/* ---------- 44 à 49. Carrousel « Comment réserver » (1080 × 1350) ---------- */
const CARROUSEL_RESERVER = [
  { nom: 'couverture' },
  { titre: 'Sur le site', icone: 'calendrier', texte: 'Choisissez la durée (1h, 1h30 ou 2h), puis un horaire libre. Votre rendez-vous est réservé tout de suite, sans attendre ma réponse.', pied: CONTACT.site },
  { titre: 'Par WhatsApp', icone: 'whatsapp', texte: `Écrivez-moi au ${CONTACT.tel}. Nous choisissons ensemble le jour et l’heure qui vous conviennent.`, pied: CONTACT.tel },
  { titre: 'Par téléphone', icone: 'tel', texte: `Appelez-moi au ${CONTACT.tel}. C’est le plus rapide pour un rendez-vous dans les 24 h.`, pied: CONTACT.tel },
  { titre: 'Sur Instagram', icone: 'instagram', texte: `Envoyez-moi un message privé sur ${CONTACT.insta}.`, pied: CONTACT.insta },
  { nom: 'fin' },
];
const CSS_CARROUSEL = `.page{justify-content:center;background:radial-gradient(circle at 50% 42%,#fff 0,var(--creme) 55%,var(--sable-2) 100%);padding:0 90px}
.haut{position:absolute;top:70px;left:90px;right:90px;display:flex;justify-content:space-between;align-items:center}
.haut .surtitre{font-size:26px}
.compteur{font-size:26px;font-weight:700;color:var(--brun-doux)}
.rond{width:300px;height:300px;border-radius:50%;border:6px solid var(--or);background:var(--creme);display:flex;align-items:center;justify-content:center;margin-bottom:60px}
.rond .ico{width:130px;height:130px;color:var(--brun-logo)}
.titre{font-size:92px;margin:0 0 34px}
.texte{font-size:40px;line-height:1.4;color:var(--brun-doux);max-width:860px;margin:0}
.pied{position:absolute;bottom:70px;left:90px;right:90px;font-size:28px;font-weight:800;color:var(--or-texte);text-align:center}`;

/* Version carrée : éléments resserrés pour tenir dans 1080 × 1080 */
const CSS_CARROUSEL_CARRE = `.page{padding:0 90px}
.haut{top:60px}
.rond{width:230px;height:230px;margin-bottom:40px}
.rond .ico{width:100px;height:100px}
.titre{font-size:78px;margin:0 0 22px}
.texte{font-size:34px;line-height:1.35}
.pied{bottom:55px;font-size:26px}
.compteur{font-size:24px}`;

CARROUSEL_RESERVER.forEach((diapo, i) => {
  const numero = String(44 + i).padStart(2, '0');
  const compteur = `${i + 1} / ${CARROUSEL_RESERVER.length}`;
  let corps;
  let nom;
  if (diapo.nom === 'couverture') {
    nom = `${numero}-carrousel-reserver-couverture`;
    corps = `<div class="haut"><span class="surtitre">Réserver</span><span class="compteur">${compteur}</span></div>
<img src="../assets/logo-hd.png" alt="Sushumna" style="width:520px;height:auto;margin-bottom:50px">
<h1 class="titre">Comment réserver votre massage&nbsp;?</h1>
<p class="texte">4 façons simples de me joindre. Choisissez celle qui vous convient.</p>
<p class="pied">Glissez pour découvrir →</p>`;
  } else if (diapo.nom === 'fin') {
    nom = `${numero}-carrousel-reserver-fin`;
    corps = `<div class="haut"><span class="surtitre">Réserver</span><span class="compteur">${compteur}</span></div>
<h1 class="titre">Une question avant de réserver&nbsp;?</h1>
<p class="texte" style="margin-bottom:60px">Écrivez-moi ou appelez-moi, je vous réponds avec plaisir.</p>
<img src="../assets/logo-hd.png" alt="Sushumna" style="width:520px;height:auto">
<p class="pied">${CONTACT.site}</p>`;
  } else {
    nom = `${numero}-carrousel-reserver-${slug(diapo.titre)}`;
    corps = `<div class="haut"><span class="surtitre">Réserver</span><span class="compteur">${compteur}</span></div>
<div class="rond">${ico(diapo.icone)}</div>
<h1 class="titre">${diapo.titre}</h1>
<p class="texte">${diapo.texte}</p>
<p class="pied">${diapo.pied} ${i < CARROUSEL_RESERVER.length - 1 ? '→' : ''}</p>`;
  }
  PAGES.push({
    nom, w: 1080, h: 1080, echelle: 1,
    html: document_({ w: 1080, h: 1080, css: CSS_CARROUSEL + CSS_CARROUSEL_CARRE, body: corps }),
  });
});

/* ---------- 50 et suivants. Un visuel d'avis par avis (1080 × 1350) ----------
   Les avis sont lus directement dans mes-contenus/avis.js, mot pour mot. */
const contenuAvis = vm.runInNewContext(
  fs.readFileSync(path.join(DOSSIER, '..', 'mes-contenus', 'avis.js'), 'utf8') + ';AVIS',
  {}
);
contenuAvis.forEach((avis, i) => {
  const numero = String(50 + i).padStart(2, '0');
  const longueur = avis.texte.length;
  const taille = longueur > 420 ? 30 : longueur > 220 ? 38 : 50;
  PAGES.push({
    nom: `${numero}-avis-${slug(avis.nom)}`, w: 1080, h: 1350, echelle: 1,
    html: document_({ w: 1080, h: 1350,
      css: `.page{background:var(--creme);padding:110px 90px}
.texte-avis{font-family:var(--titres);font-style:italic;font-weight:500;font-size:${taille}px;line-height:1.4;white-space:pre-line;margin:0}`,
      body: `<p class="surtitre" style="font-size:28px">Avis clients</p>
<p class="etoiles" style="font-size:80px;margin:30px 0 40px">${'★'.repeat(avis.etoiles)}</p>
<p class="texte-avis">« ${avis.texte} »</p>
<p class="surtitre" style="margin-top:50px;font-size:28px;color:var(--brun-doux)">${avis.nom}</p>` }),
  });
});

/* ---------- 57 et suivants. Une story par avis (1080 × 1920) ---------- */
contenuAvis.forEach((avis, i) => {
  const numero = String(57 + i).padStart(2, '0');
  const longueur = avis.texte.length;
  const taille = longueur > 420 ? 34 : longueur > 220 ? 42 : 52;
  PAGES.push({
    nom: `${numero}-story-avis-${slug(avis.nom)}`, w: 1080, h: 1920, echelle: 1,
    html: document_({ w: 1080, h: 1920,
      css: `.page{justify-content:flex-start;padding:230px 90px 230px;background:linear-gradient(180deg,var(--creme) 0%,var(--sable-2) 100%)}
.texte-avis{font-family:var(--titres);font-style:italic;font-weight:500;font-size:${taille}px;line-height:1.4;white-space:pre-line;margin:0}
.pied-story{margin-top:auto;width:260px;height:auto;align-self:center}`,
      body: `<p class="surtitre" style="font-size:28px">Avis clients</p>
<p class="etoiles" style="font-size:80px;margin:30px 0 40px">${'★'.repeat(avis.etoiles)}</p>
<p class="texte-avis">« ${avis.texte} »</p>
<p class="surtitre" style="margin-top:50px;font-size:28px;color:var(--brun-doux)">${avis.nom}</p>
<img class="pied-story" src="../assets/logo-hd.png" alt="Sushumna">` }),
  });
});

/* ---------- Carrousels « questions fréquentes » (30 thèmes, 4 slides chacun) ----------
   Les textes sont dans carrousels-questions.js. Chaque carrousel va dans son dossier. */
const CARROUSELS_QUESTIONS = require('./carrousels-questions.js');
const LOGO_URL = 'file://' + path.join(DOSSIER, 'assets', 'logo-hd.png');
const CSS_QUESTIONS = `.page{justify-content:flex-start;background:radial-gradient(circle at 50% 42%,#fff 0,var(--creme) 55%,var(--sable-2) 100%);padding:230px 90px 230px}
.haut{position:absolute;top:70px;left:90px;right:90px;display:flex;justify-content:space-between;align-items:center}
.haut .surtitre{font-size:26px}
.compteur{font-size:26px;font-weight:700;color:var(--brun-doux)}
.couverture{justify-content:center;text-align:center}
.couverture .titre{font-size:92px;margin:0 0 40px}
.couverture .texte{font-size:40px;line-height:1.4;color:var(--brun-doux);max-width:880px;margin:0 auto}
.texte-slide{text-align:left;width:100%;display:flex;flex-direction:column;flex:1}
.texte-slide .titre{font-size:74px;margin:0 0 50px}
.points{list-style:none;padding:0;margin:0}
.points li{position:relative;padding-left:52px;font-size:38px;line-height:1.4;color:var(--brun);margin-bottom:34px}
.points li::before{content:'✦';position:absolute;left:0;top:2px;color:var(--or);font-size:32px}
.pied{position:absolute;bottom:70px;left:90px;right:90px;font-size:28px;font-weight:800;color:var(--or-texte);text-align:center}
.fin{justify-content:center;text-align:center}
.fin .titre{font-size:76px;margin:0 0 40px}
.fin .texte{font-size:36px;line-height:1.4;color:var(--brun-doux);margin:0 0 60px}`;

CARROUSELS_QUESTIONS.forEach((carrousel, c) => {
  const dossier = `carrousels/${String(c + 1).padStart(2, '0')}-${carrousel.slug}`;
  const total = carrousel.slides.length + 2;
  const compteur = (k) => `${k} / ${total}`;
  const entete = (k) => `<div class="haut"><span class="surtitre">Questions fréquentes</span><span class="compteur">${compteur(k)}</span></div>`;
  const pages = [];
  pages.push(`${entete(1)}
<div class="couverture" style="display:flex;flex-direction:column;justify-content:center;flex:1">
  <h1 class="titre">${carrousel.titre}</h1>
  <p class="texte">${carrousel.sous}</p>
  <p class="pied" style="position:absolute;bottom:70px;left:90px;right:90px">Glissez pour découvrir →</p>
</div>`);
  carrousel.slides.forEach((slide, i) => {
    const suite = i < carrousel.slides.length - 1 ? ' →' : '';
    pages.push(`${entete(i + 2)}
<div class="texte-slide" style="padding-bottom:110px">
  <h2 class="titre">${slide.titre}</h2>
  <ul class="points">${slide.points.map((p) => `<li>${p}</li>`).join('')}</ul>
</div>
<p class="pied">${i < carrousel.slides.length - 1 ? 'Glissez pour la suite →' : ''}</p>`);
  });
  pages.push(`${entete(total)}
<div class="fin" style="display:flex;flex-direction:column;justify-content:center;flex:1">
  <h2 class="titre">Une autre question&nbsp;?</h2>
  <p class="texte">Écrivez-moi ou appelez-moi, je vous réponds avec plaisir.</p>
  <img src="${LOGO_URL}" alt="Sushumna" style="width:520px;height:auto;margin:0 auto 50px">
  <p class="pied" style="position:absolute;bottom:70px;left:90px;right:90px">${CONTACT.tel} · ${CONTACT.site}</p>
</div>`);
  pages.forEach((corps, k) => {
    PAGES.push({
      nom: `${dossier}/${k + 1}`, w: 1080, h: 1350, echelle: 1,
      html: document_({ w: 1080, h: 1350, css: CSS_QUESTIONS, body: corps }),
    });
  });
});

/* ---------- 64 et suivants. Planning de la semaine en story (1080 × 1920) ----------
   Créneaux calculés à partir de mes-contenus/planning.js (horaires habituels,
   jours particuliers, massages réservés, pause de 15 min après chaque massage).
   À refaire à chaque nouvelle semaine. */
function pagePlanning({ nom, titre, sous, jours, ferme }) {
  const compact = jours.length > 2;
  return {
    nom, w: 1080, h: 1920, echelle: 1,
    html: document_({ w: 1080, h: 1920,
      css: `.page{justify-content:flex-start;padding:${compact ? 200 : 230}px 90px 200px;background:linear-gradient(180deg,var(--creme) 0%,var(--sable-2) 100%)}
.logo{width:${compact ? 260 : 340}px;height:auto;align-self:center}
.titre{font-size:${compact ? 96 : 120}px;margin:${compact ? 26 : 40}px 0 12px;text-align:center}
.sous{font-size:${compact ? 32 : 36}px;color:var(--brun-doux);margin:0 0 ${compact ? 40 : 70}px;text-align:center}
.jour{width:100%;background:var(--creme);border:2px solid var(--bordure);border-left:12px solid var(--or);border-radius:26px;padding:${compact ? 24 : 40}px 40px;margin-bottom:${compact ? 22 : 34}px;text-align:left;box-shadow:0 10px 30px rgba(92,67,48,.10)}
.jour h2{font-family:var(--titres);font-weight:600;font-size:${compact ? 38 : 48}px;margin:0 0 ${compact ? 6 : 14}px;color:var(--brun)}
.jour .horaires{font-size:${compact ? 52 : 64}px;font-weight:800;color:var(--or-texte);margin:0 0 ${compact ? 6 : 14}px;line-height:1.15}
.jour p{font-size:${compact ? 24 : 28}px;line-height:1.35;color:var(--brun-doux);margin:0}
.ferme{font-size:${compact ? 28 : 30}px;color:var(--brun-doux);text-align:center;margin:${compact ? 4 : 10}px 0 ${compact ? 26 : 40}px}`,
      body: `<img class="logo" src="../assets/logo-hd.png" alt="Sushumna">
<p class="surtitre" style="font-size:26px;text-align:center;margin-top:${compact ? 30 : 50}px">Disponibilités</p>
<h1 class="titre">${titre}</h1>
<p class="sous">${sous}</p>
${jours.map((j) => `<div class="jour"><h2>${j.jour}</h2><p class="horaires">${j.horaires}</p><p>${j.detail}</p></div>`).join('\n')}
<p class="ferme">${ferme}</p>
<p class="sous" style="margin:0 0 8px;font-weight:700;color:var(--or-texte)">Réservez sur massage-sushumna.com</p>
<p class="sous" style="margin:0;font-weight:700;color:var(--or-texte);white-space:nowrap">${CONTACT.tel}</p>` }),
  };
}

PAGES.push(pagePlanning({
  nom: '64-planning-semaine', titre: 'Cette semaine', sous: 'Jusqu’à dimanche, pour réserver votre massage',
  ferme: 'Jeudi et samedi : fermé',
  jours: [
    { jour: 'Vendredi 30 octobre', horaires: '12h45 – 21h00', detail: 'Massage à réserver entre 12h45 et 21h (fin du massage avant 21h).' },
    { jour: 'Dimanche 1er novembre', horaires: '14h00 – 17h00', detail: 'Massage à réserver entre 14h et 17h (fin du massage avant 17h).' },
  ],
}));

PAGES.push(pagePlanning({
  nom: '65-planning-semaine-prochaine', titre: 'Semaine prochaine', sous: 'Du 2 au 8 novembre, pour réserver votre massage',
  ferme: 'Lundi, jeudi et samedi : fermé',
  jours: [
    { jour: 'Mardi 3 novembre', horaires: '15h15 – 17h30', detail: 'Massage à réserver entre 15h15 et 17h30 (fin du massage avant 17h30).' },
    { jour: 'Mercredi 4 novembre', horaires: '12h30 – 18h00', detail: 'Massage à réserver entre 12h30 et 18h (fin avant 18h), ou à 21h00.' },
    { jour: 'Vendredi 6 novembre', horaires: '11h00 – 21h00', detail: 'Massage à réserver entre 11h et 21h (fin du massage avant 21h).' },
    { jour: 'Dimanche 8 novembre', horaires: '12h00 – 20h00', detail: 'Massage à réserver entre 12h et 20h (fin du massage avant 20h).' },
  ],
}));

/* ---------- Carrousels avec photos (4 thèmes) : une seule toile continue, découpée en carrés ----------
   Textes dans carrousels-photos.js, photos dans assets/photos-carrousels/. */
const CARROUSELS_PHOTOS = require('./carrousels-photos.js');
const PHOTO_POS = { 1: 'center', 2: 'center 62%', 3: 'center', 4: 'center 35%', 5: 'center 55%', 6: 'center 28%', 7: 'center 40%', 8: 'center 38%' };
const photoUrl = (n) => 'file://' + path.join(DOSSIER, 'assets', 'photos-carrousels', `photo-${n}.jpg`);
const CSS_PHOTOS = `.toile{position:relative;height:1080px;overflow:hidden;background:linear-gradient(180deg,var(--creme) 0%,var(--sable-2) 100%)}
.slide{position:absolute;top:0;width:1080px;height:1080px}
.rond-deco{position:absolute;border-radius:50%;background:#f6e3b4;opacity:.38}
.bulle{position:absolute;width:300px;height:300px;border-radius:50%;overflow:hidden;border:8px solid var(--or);box-shadow:0 14px 34px rgba(92,67,48,.22);background:var(--creme)}
.bulle img{width:100%;height:100%;object-fit:cover;display:block}
.vague{position:absolute;left:0;top:0}
.zone{position:absolute;top:130px;bottom:150px;display:flex;flex-direction:column;justify-content:center;text-align:left}
.puce-emoji{width:104px;height:104px;border-radius:50%;border:6px solid var(--or);background:var(--creme);display:flex;align-items:center;justify-content:center;font-size:54px;margin-bottom:26px;box-shadow:0 8px 20px rgba(92,67,48,.12)}
.surtitre{font-size:24px}
.q{font-family:var(--titres);font-weight:600;font-size:86px;line-height:1.12;margin:22px 0 26px;color:var(--brun)}
.sous{font-size:38px;line-height:1.35;color:var(--brun-doux);margin:0}
.titre-s{font-family:var(--titres);font-weight:600;font-size:68px;line-height:1.12;margin:0 0 16px;color:var(--brun)}
.intro-s{font-family:var(--titres);font-style:italic;font-size:38px;color:var(--or-texte);margin:0 0 22px}
.points{list-style:none;padding:0;margin:14px 0 0}
.points li{position:relative;padding-left:50px;line-height:1.36;color:var(--brun);margin-bottom:22px}
.points li::before{content:'✦';position:absolute;left:0;top:0;color:var(--or);font-size:.9em}
.dense .titre-s{font-size:56px;margin-bottom:10px}
.dense .puce-emoji{width:84px;height:84px;font-size:44px;margin-bottom:14px}
.dense .points{margin-top:8px}
.dense .points li{margin-bottom:15px}
.indice{position:absolute;bottom:92px;font-weight:800;font-size:26px;color:var(--or-texte)}
.pastilles{position:absolute;bottom:56px;display:flex;gap:12px}
.pastilles span{width:14px;height:14px;border-radius:50%;border:2px solid var(--or);background:transparent}
.pastilles span.on{background:var(--or)}
.fin-titre{font-family:var(--titres);font-weight:600;font-size:80px;line-height:1.12;margin:0 0 24px;color:var(--brun)}
.fin-texte{font-size:36px;line-height:1.4;color:var(--brun-doux);margin:0 0 44px}
.fin-contact{font-size:32px;font-weight:800;color:var(--or-texte);margin:26px 0 0}`;

CARROUSELS_PHOTOS.forEach((c) => {
  const L = 1080;
  const total = c.slides.length + 2;
  const largeur = total * L;
  const POSITIONS_BULLES = [300, 770];
  const cx = (k) => k * L;
  let vague = 'M0 1030';
  for (let x = 0; x < largeur; x += 270) vague += ' q67.5 -18 135 0 t135 0';
  const decor = Array.from({ length: total }, (_, i) => `<div class="rond-deco" style="width:${i % 2 ? 420 : 520}px;height:${i % 2 ? 420 : 520}px;left:${i * L + (i % 2 ? 560 : -120)}px;top:${i % 2 ? -150 : 640}px"></div>`).join('');
  const bulles = c.photos.map((n, k) => `<div class="bulle" style="left:${cx(k + 1) - 150}px;top:${POSITIONS_BULLES[k % 2] - 150}px"><img src="${photoUrl(n)}" alt="" style="object-position:${PHOTO_POS[n] || 'center'}"></div>`).join('');
  const etincelles = Array.from({ length: total - 1 }, (_, k) => `<svg style="position:absolute;left:${cx(k + 1) - 18}px;top:1012px" width="36" height="36" viewBox="0 0 36 36"><path d="M18 0 q2 14 18 18 q-16 4 -18 18 q-2 -14 -18 -18 q16 -4 18 -18z" fill="#d9a73b"/></svg>`).join('');
  const pastilles = (i) => `<div class="pastilles" style="left:${540 - (total * 26) / 2}px">${Array.from({ length: total }, (_, j) => `<span class="${j === i ? 'on' : ''}"></span>`).join('')}</div>`;

  const diapos = [];
  // 0. couverture
  diapos.push(`<section class="slide" style="left:0">
  <div class="zone" style="left:90px;width:810px">
    <div class="puce-emoji">${c.emoji}</div>
    <p class="surtitre">Questions fréquentes</p>
    <h1 class="q">${c.question}</h1>
    <p class="sous">${c.sous}</p>
  </div>
  <p class="indice" style="left:90px">Glissez pour découvrir →</p>
  ${pastilles(0)}
</section>`);
  // contenu
  c.slides.forEach((s, i) => {
    const signes = s.points.join('').length;
    const taille = signes > 270 || s.points.length >= 5 ? 32 : signes > 200 ? 38 : 42;
    diapos.push(`<section class="slide" style="left:${(i + 1) * L}px">
  <div class="zone ${signes > 270 || s.points.length >= 5 ? 'dense' : ''}" style="left:170px;width:740px">
    <div class="puce-emoji">${s.emoji}</div>
    <h2 class="titre-s">${s.titre}</h2>
    ${s.intro ? `<p class="intro-s">${s.intro}</p>` : ''}
    <ul class="points" style="font-size:${taille}px">${s.points.map((p) => `<li>${p}</li>`).join('')}</ul>
  </div>
  ${pastilles(i + 1)}
</section>`);
  });
  // fin
  diapos.push(`<section class="slide" style="left:${(total - 1) * L}px">
  <div class="zone" style="left:170px;width:760px;align-items:flex-start">
    <h2 class="fin-titre">Une question&nbsp;?</h2>
    <p class="fin-texte">Écrivez-moi ou appelez-moi : je vous réponds avec plaisir.</p>
    <img src="${LOGO_URL}" alt="Sushumna" style="width:480px;height:auto">
    <p class="fin-contact">${CONTACT.site} · ${CONTACT.tel}</p>
  </div>
  ${pastilles(total - 1)}
</section>`);

  const corps = `<div class="page" style="display:block;justify-content:flex-start;align-items:stretch;text-align:left"><div class="toile" style="width:${largeur}px">
${decor}
<svg class="vague" width="${largeur}" height="1080" viewBox="0 0 ${largeur} 1080"><path d="${vague}" fill="none" stroke="#d9a73b" stroke-width="5" stroke-linecap="round" opacity=".9"/></svg>
${etincelles}
${diapos.join('\n')}
${bulles}
</div></div>`;
  PAGES.push({
    nom: `carrousels-photos/${c.slug}`, w: largeur, h: 1080, echelle: 1, coupes: total,
    html: document_({ w: largeur, h: 1080, css: CSS_PHOTOS, body: corps }),
  });
});

/* ---------- Fiche de renseignements client (A4, 2 pages) : JPEG + PDF ----------
   Imprimable : cases à cocher, lignes à remplir, silhouettes pour marquer les zones. */
const cb = '<i class="cb"></i>';
const opt = (t) => `<span class="opt">${cb}${t}</span>`;
const champ = (label, extra = '') => `<div class="champ ${extra}"><label>${label}</label></div>`;
const sectionTitre = (emoji, titre) => `<div class="s-titre"><span class="ico">${emoji}</span><h2>${titre}</h2><span class="trait"></span></div>`;
const silhouette = (dos, h = 264) => `<svg viewBox="0 0 100 224" width="${Math.round((h * 100) / 224)}" height="${h}">
  <g fill="#d9a73b" stroke="#d9a73b" stroke-width="4" stroke-linejoin="round">
    <circle cx="50" cy="17" r="14"/><rect x="43" y="28" width="14" height="12" rx="4"/>
    <rect x="30" y="38" width="40" height="74" rx="16"/>
    <rect x="12" y="40" width="14" height="74" rx="7" transform="rotate(5 19 40)"/><rect x="74" y="40" width="14" height="74" rx="7" transform="rotate(-5 81 40)"/>
    <rect x="31" y="104" width="18" height="112" rx="9"/><rect x="51" y="104" width="18" height="112" rx="9"/>
  </g>
  <g fill="#fffdf8">
    <circle cx="50" cy="17" r="14"/><rect x="43" y="28" width="14" height="12" rx="4"/>
    <rect x="30" y="38" width="40" height="74" rx="16"/>
    <rect x="12" y="40" width="14" height="74" rx="7" transform="rotate(5 19 40)"/><rect x="74" y="40" width="14" height="74" rx="7" transform="rotate(-5 81 40)"/>
    <rect x="31" y="104" width="18" height="112" rx="9"/><rect x="51" y="104" width="18" height="112" rx="9"/>
  </g>
  ${dos ? '<path d="M50 32 L50 108" stroke="#e6d5b5" stroke-width="2" stroke-dasharray="3 4" fill="none"/><path d="M38 58 Q44 70 50 66 M62 58 Q56 70 50 66" stroke="#e6d5b5" stroke-width="2" fill="none"/>' : '<circle cx="50" cy="62" r="1.8" fill="#e6d5b5"/><circle cx="50" cy="84" r="1.8" fill="#e6d5b5"/>'}
</svg>`;

const SANTE = [
  'Fièvre, infection, maladie contagieuse',
  'Phlébite, thrombose',
  'Traitement anticoagulant',
  'Fracture, entorse, blessure ou opération récente',
  'Cancer en cours de traitement',
  'Problème cardiaque, hypertension',
  'Problème de peau (eczéma, mycose, plaie…)',
  'Ostéoporose, hernie discale',
  'Allergies (huiles, parfums, fruits à coque…)',
  'Traitement médical ou médicaments en cours',
];
const MASSAGES_FICHE = ['Sur mesure', 'Sportif', 'Relaxant', 'Réconfort', 'Ayurvédique', 'Chong Mai', 'Bol tibétain', 'Réflexologie abdominale'];

const CSS_FICHE = `@page{size:210mm 297mm;margin:0}
body{background:#fffdf8}
.feuille{position:relative;width:794px;height:1123px;overflow:hidden;padding:30px 40px 0;background:linear-gradient(180deg,var(--creme) 0%,#fbf3e2 100%);page-break-after:always;break-after:page;font-size:12px}
.feuille:last-child{page-break-after:auto;break-after:auto}
.deco{position:absolute;border-radius:50%;background:#f6e3b4;opacity:.4}
.entete{position:relative;display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
.entete img{width:196px;height:auto}
.entete .titres{text-align:right}
.entete h1{font-family:var(--titres);font-weight:600;font-size:24px;line-height:1.15;margin:0;color:var(--brun)}
.entete .sous{font-size:10.5px;color:var(--brun-doux);margin:3px 0 0}
.entete .meta{font-size:11px;font-weight:700;color:var(--or-texte);margin-top:5px}
.section{position:relative;margin-top:15px}
.s-titre{display:flex;align-items:center;gap:9px;margin:0 0 8px}
.s-titre .ico{width:28px;height:28px;border-radius:50%;border:2px solid var(--or);background:var(--creme);display:flex;align-items:center;justify-content:center;font-size:14px;flex:none}
.s-titre h2{font-family:var(--titres);font-weight:600;font-size:16px;margin:0;color:var(--brun)}
.s-titre .trait{flex:1;height:2px;background:linear-gradient(90deg,var(--or),rgba(217,167,59,0))}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:4px 24px}
.champ{display:flex;align-items:flex-end;min-height:24px;border-bottom:1.3px solid var(--bordure)}
.champ label{font-size:9.5px;font-weight:800;letter-spacing:.07em;text-transform:uppercase;color:var(--or-texte);white-space:nowrap;padding-bottom:2px}
.plein{grid-column:1 / -1}
.cb{display:inline-block;width:13px;height:13px;border:1.7px solid var(--or);border-radius:4px;background:#fff;flex:none}
.opt{display:inline-flex;align-items:center;gap:5px;margin:3px 12px 3px 0;white-space:nowrap}
.rang{display:flex;flex-wrap:wrap;align-items:center;margin-top:3px}
.rang .lib{font-size:9.5px;font-weight:800;letter-spacing:.07em;text-transform:uppercase;color:var(--or-texte);margin-right:10px}
.grille4{display:grid;grid-template-columns:repeat(4,auto);gap:0 8px;justify-content:start}
.sante{display:grid;grid-template-columns:1fr 1fr;gap:0 24px}
.q{display:flex;justify-content:space-between;align-items:center;gap:8px;min-height:28px;border-bottom:1px dotted var(--bordure);line-height:1.2}
.q .on{display:inline-flex;gap:8px;align-items:center;font-weight:700;white-space:nowrap;font-size:11px}
.q .on span{display:inline-flex;align-items:center;gap:4px}
.ligne{border-bottom:1.3px solid var(--bordure);height:25px}
.note{font-size:9.5px;color:var(--brun-doux);margin:5px 0 0;font-style:italic}
.pied{position:absolute;left:0;right:0;bottom:0;height:46px}
.pied svg{position:absolute;left:0;bottom:22px}
.pied p{position:absolute;left:0;right:0;bottom:6px;margin:0;text-align:center;font-size:10px;font-weight:700;color:var(--or-texte)}
.zones{display:grid;grid-template-columns:auto auto 1fr;gap:16px;align-items:start}
.sil{text-align:center;font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--or-texte)}
.tableau{width:100%;border-collapse:collapse}
.tableau th{font-size:9.5px;font-weight:800;letter-spacing:.07em;text-transform:uppercase;color:var(--or-texte);background:#f6e3b4;text-align:left;padding:6px 8px;border:1px solid var(--bordure)}
.tableau td.libre{background:rgba(255,255,255,.35)}
.tableau td{height:26px;border:1px solid var(--bordure);background:rgba(255,255,255,.6)}
.consent{font-size:11px;line-height:1.4}
.consent .opt{display:flex;align-items:flex-start;white-space:normal;margin:0 0 6px}
.consent .cb{margin-top:2px}
.rgpd{font-size:9.5px;line-height:1.4;color:var(--brun-doux);margin:6px 0 0}
.sigs{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:10px}
.sig{border:1.5px solid var(--or);border-radius:12px;height:100px;padding:8px 12px;background:rgba(255,255,255,.7)}
.sig b{font-size:9.5px;font-weight:800;letter-spacing:.07em;text-transform:uppercase;color:var(--or-texte)}`;

const vague = (largeur) => {
  let d = 'M0 14';
  for (let x = 0; x < largeur; x += 140) d += ' q35 -9 70 0 t70 0';
  return `<svg width="${largeur}" height="28" viewBox="0 0 ${largeur} 28"><path d="${d}" fill="none" stroke="#d9a73b" stroke-width="2.4" stroke-linecap="round"/></svg>`;
};
const pied = `<div class="pied">${vague(794)}<p>Sushumna · 4 cours Victor Hugo, 45100 Orléans · ${CONTACT.tel} · ${CONTACT.site} · Document confidentiel</p></div>`;

const feuille1 = `<section class="feuille">
  <div class="deco" style="width:330px;height:330px;right:-110px;top:-120px"></div>
  <div class="deco" style="width:260px;height:260px;left:-100px;bottom:120px"></div>
  <div class="entete"><img src="${LOGO_URL}" alt="Sushumna">
    <div class="titres"><h1>Fiche de renseignements client</h1></div></div>

  <div class="section">${sectionTitre('🙂', 'Client')}
    <div class="g2">${champ('Nom')}${champ('Prénom')}${champ('Date de naissance')}${champ('Profession')}${champ('Téléphone')}</div>
    <div class="rang" style="margin-top:8px"><span class="lib" style="flex-basis:100%;margin-bottom:2px">Comment m’avez-vous connu ?</span>${opt('Google')}${opt('Instagram')}${opt('Bouche-à-oreille')}${opt('Carte cadeau')}${opt('Parrainage')}<span class="champ" style="flex:1;min-width:230px"><label>Nom et prénom du parrain</label></span></div>
  </div>

  <div class="section">${sectionTitre('🩺', 'Santé')}
    <div class="sante">${SANTE.map((q) => `<div class="q"><span>${q}</span><span class="on"><span>${cb}Oui</span><span>${cb}Non</span></span></div>`).join('')}</div>
    <div class="champ" style="margin-top:10px"><label>Précisions si « oui »</label></div><div class="ligne"></div><div class="ligne"></div>
  </div>

  <div class="section">${sectionTitre('🎯', 'Préférences')}
    <div class="rang"><span class="lib">Pression</span>${opt('Légère')}${opt('Moyenne')}${opt('Ferme')}<span class="lib" style="margin-left:18px">Sommeil</span>${opt('Bon')}${opt('Moyen')}${opt('Difficile')}</div>
    <div class="g2" style="margin-top:6px">${champ('Zones à éviter', 'plein')}${champ('Type d’huile', 'plein')}${champ('Activité physique (type, fréquence)')}${champ('Niveau de stress (0 à 10)')}</div>
    <div class="champ" style="margin-top:10px"><label>Autres choses à me signaler ?</label></div><div class="ligne"></div><div class="ligne"></div>
  </div>

  <div class="section">${sectionTitre('🧍', 'Zones de tension ou de douleur')}
    <div class="zones">
      <div class="sil">${silhouette(false, 188)}<br>Face</div>
      <div class="sil">${silhouette(true, 188)}<br>Dos</div>
      <div>
        <div class="champ"><label>Depuis quand ?</label></div>
        <div class="champ"><label>Intensité de la gêne (0 à 10)</label></div>
        <div class="ligne"></div><div class="ligne"></div>
        <div class="champ"><label>Zones où vous ne souhaitez pas de massage</label></div><div class="ligne"></div>
      </div>
    </div>
  </div>

  ${pied}
</section>`;

const feuille2 = `<section class="feuille">
  <div class="deco" style="width:300px;height:300px;left:-110px;top:-110px"></div>
  <div class="deco" style="width:340px;height:340px;right:-130px;bottom:150px"></div>
  <div class="entete"><img src="${LOGO_URL}" alt="Sushumna" style="width:160px">
    <div class="titres"><h1>Fiche client · suite</h1><p class="meta">Nom : ______________________ &nbsp; Prénom : ______________________</p></div></div>

  <div class="section">${sectionTitre('📋', 'Notes du praticien')}
    <div class="ligne"></div><div class="ligne"></div><div class="ligne"></div><div class="ligne"></div>
  </div>

  <div class="section">${sectionTitre('📝', 'Suivi des séances')}
    <table class="tableau"><tr><th style="width:92px">Date</th><th style="width:190px">Massage</th><th style="width:62px">Durée</th><th>Observations · ressenti après la séance</th></tr>
    ${Array.from({ length: 13 }, () => '<tr><td></td><td></td><td></td><td></td></tr><tr><td class="libre" colspan="4"></td></tr>').join('')}</table>
  </div>
  ${pied}
</section>`;

PAGES.push({
  nom: 'fiche-client', w: 794, h: 1123 * 2, echelle: 3.125, feuilles: 2,
  sorties: ['fiche-client-recto', 'fiche-client-verso'], pdf: 'fiche-client.pdf',
  html: document_({ w: 794, h: 1123 * 2, css: CSS_FICHE, body: `<div class="page" style="display:block;justify-content:flex-start;align-items:stretch;text-align:left">${feuille1}${feuille2}</div>` }),
});

/* ---------- Rendu ---------- */
(async () => {
  fs.mkdirSync(SOURCES, { recursive: true });
  fs.mkdirSync(JPEG, { recursive: true });
  const navigateur = await chromium.launch({ args: ['--no-sandbox'], executablePath: process.env.CHROMIUM_PATH || undefined });
  try {
    const seulement = (process.env.ONLY || '').split(',').filter(Boolean);
    for (const p of PAGES) {
      if (seulement.length && !seulement.some((n) => p.nom.startsWith(n))) continue;
      const fichierHtml = path.join(SOURCES, `${p.nom}.html`);
      fs.mkdirSync(path.dirname(fichierHtml), { recursive: true });
      fs.mkdirSync(path.dirname(path.join(JPEG, `${p.nom}.jpg`)), { recursive: true });
      fs.writeFileSync(fichierHtml, p.html);
      const contexte = await navigateur.newContext({
        viewport: { width: parseInt(p.w, 10), height: parseInt(p.h, 10) },
        deviceScaleFactor: p.echelle,
      });
      const page = await contexte.newPage();
      await page.goto('file://' + fichierHtml, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(300);
      if (p.feuilles) {
        const hFeuille = parseInt(p.h, 10) / p.feuilles;
        for (let k = 0; k < p.feuilles; k++) {
          await page.screenshot({ path: path.join(JPEG, `${p.sorties[k]}.jpg`), type: 'jpeg', quality: 92, clip: { x: 0, y: k * hFeuille, width: parseInt(p.w, 10), height: hFeuille } });
        }
        if (p.pdf) {
          await page.pdf({ path: path.join(DOSSIER, p.pdf), width: '210mm', height: '297mm', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
        }
      } else if (p.coupes) {
        for (let k = 0; k < p.coupes; k++) {
          const sortie = path.join(JPEG, p.nom, `${k + 1}.jpg`);
          fs.mkdirSync(path.dirname(sortie), { recursive: true });
          await page.screenshot({ path: sortie, type: 'jpeg', quality: 92, clip: { x: k * 1080, y: 0, width: 1080, height: 1080 } });
        }
      } else {
        await page.screenshot({ path: path.join(JPEG, `${p.nom}.jpg`), type: 'jpeg', quality: 92 });
      }
      await contexte.close();
      console.log('ok', p.nom);
    }
  } finally {
    await navigateur.close();
  }
})();
