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
    css: `.page{background:radial-gradient(circle at 50% 45%,#4a3422 0,var(--brun) 65%,#2e2014 100%)}
.surtitre{color:var(--or-clair);font-size:20px}
.slogan{margin:26px 0 0;font-family:var(--titres);font-style:italic;font-size:26px;color:var(--or-clair)}`,
    body: `<div class="page">
  <img src="../assets/logo-hd-or.png" alt="Sushumna" style="width:600px;height:auto">
  <p class="slogan">Le bonheur est en vous</p>
  <p class="surtitre" style="margin-top:18px">Massages bien-être · Orléans</p>
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

/* ---------- 10. Story « Tarifs » (1080 × 1920) ---------- */
PAGES.push({
  nom: '10-story-tarifs', w: 1080, h: 1920, echelle: 1,
  html: document_({ w: 1080, h: 1920,
    css: `.page{justify-content:flex-start;padding:250px 90px 260px;background:linear-gradient(180deg,var(--creme) 0%,var(--sable-2) 100%)}
.logo{width:380px;height:auto}
.titre{font-size:124px;margin:44px 0 18px}
.sous{font-size:36px;max-width:820px;margin-bottom:56px}
.bloc{width:100%;margin-bottom:46px}
.bloc h2{font-family:var(--titres);font-weight:600;font-size:46px;margin:0 0 22px;color:var(--or-texte);text-transform:uppercase;letter-spacing:.12em}
.ligne{display:flex;justify-content:space-between;align-items:center;background:var(--creme);border:2px solid var(--bordure);border-radius:28px;padding:26px 42px;margin-bottom:20px;font-size:44px;font-weight:700}
.ligne .prix{font-family:var(--titres);font-weight:600;font-size:56px;color:var(--or-texte)}
.formule{display:flex;flex-direction:column;align-items:flex-start;background:#fff8e6;border:2px solid var(--or);border-radius:28px;padding:26px 42px;margin-bottom:20px;text-align:left}
.formule .haut{display:flex;justify-content:space-between;align-items:center;width:100%}
.formule strong{font-size:42px}
.formule .prix{font-family:var(--titres);font-weight:600;font-size:56px;color:var(--or-texte)}
.formule em{font-style:normal;font-weight:800;font-size:28px;color:var(--or-texte);margin-top:6px}`,
    body: `<img class="logo" src="../assets/logo-hd.png" alt="Sushumna">
<p class="surtitre" style="font-size:28px">Tarifs</p>
<h1 class="titre">Mes tarifs</h1>
<p class="sous">Tous les massages sont au même prix : seule la durée change.</p>
<div class="bloc">
  <h2>Séances</h2>
  <div class="ligne"><span>1h</span><span class="prix">70 €</span></div>
  <div class="ligne"><span>1h30</span><span class="prix">100 €</span></div>
  <div class="ligne"><span>2h</span><span class="prix">130 €</span></div>
</div>
<div class="bloc">
  <h2>Formules 4 massages</h2>
  <div class="formule"><div class="haut"><strong>4 massages d’1h</strong><span class="prix">200 €</span></div><em>80 € d’économie</em></div>
  <div class="formule"><div class="haut"><strong>4 massages de 2h</strong><span class="prix">400 €</span></div><em>120 € d’économie</em></div>
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
  ['14-grille-bienvenue', surCreme(`<img src="../assets/embleme-hd.png" alt="" style="height:300px;width:auto;margin-bottom:50px">
<p class="surtitre" style="font-size:28px">Bienvenue</p>
<h2 class="titre" style="font-size:100px;margin:20px 0 34px">Prenez le temps de vous détendre</h2>
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
  PAGES.push({
    nom, w: 1080, h: 1350, echelle: 1,
    html: document_({ w: 1080, h: 1350, css: contenu.css, body: `<div class="page">${contenu.body}</div>` }),
  });
}

/* ---------- Rendu ---------- */
(async () => {
  fs.mkdirSync(SOURCES, { recursive: true });
  fs.mkdirSync(JPEG, { recursive: true });
  const navigateur = await chromium.launch({ args: ['--no-sandbox'], executablePath: process.env.CHROMIUM_PATH || undefined });
  try {
    for (const p of PAGES) {
      const fichierHtml = path.join(SOURCES, `${p.nom}.html`);
      fs.writeFileSync(fichierHtml, p.html);
      const contexte = await navigateur.newContext({
        viewport: { width: parseInt(p.w, 10), height: parseInt(p.h, 10) },
        deviceScaleFactor: p.echelle,
      });
      const page = await contexte.newPage();
      await page.goto('file://' + fichierHtml, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(JPEG, `${p.nom}.jpg`), type: 'jpeg', quality: 92 });
      await contexte.close();
      console.log('ok', p.nom);
    }
  } finally {
    await navigateur.close();
  }
})();
