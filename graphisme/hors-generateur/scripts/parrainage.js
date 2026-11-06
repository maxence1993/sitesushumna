/* Visuels « Parrainage » : affiche A4 (JPEG + PDF), publication carrée, story.
   Script hors du dépôt : rien n'est enregistré dans la branche. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SORTIE = __dirname;
const LOGO = 'file:///home/user/sitesushumna/graphisme/assets/logo-hd.png';
const EMBLEME = 'file:///home/user/sitesushumna/graphisme/assets/embleme-hd.png';
const POLICES = 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;1,500&family=Nunito:wght@400;600;700;800&display=swap';
const REDUC = '20 €';

const BASE = `
:root{--creme:#fffdf8;--sable-2:#f3e8d3;--bordure:#e6d5b5;--or:#d9a73b;--or-clair:#f6e3b4;--or-texte:#87601a;--brun:#3d2a1b;--brun-doux:#5c4330;--titres:"Lora",Georgia,serif;--texte:"Nunito",Arial,sans-serif}
*{box-sizing:border-box}html,body{margin:0;padding:0}
body{font-family:var(--texte);color:var(--brun);background:var(--creme)}
.page{position:relative;overflow:hidden;background:linear-gradient(180deg,var(--creme) 0%,#fbf3e2 100%);text-align:center}
.deco{position:absolute;border-radius:50%;background:#f6e3b4;opacity:.45}
.filigrane{position:absolute;opacity:.06}
.surtitre{margin:0;font-weight:800;text-transform:uppercase;letter-spacing:.3em;color:var(--or-texte)}
.titre{font-family:var(--titres);font-weight:600;line-height:1.08;margin:0;color:var(--brun)}
.sous{font-family:var(--titres);font-style:italic;color:var(--or-texte);margin:0}
.carte{position:relative;background:var(--creme);border:2.5px solid var(--or);border-radius:30px;box-shadow:0 14px 34px rgba(92,67,48,.16)}
.badge{position:absolute;left:50%;transform:translateX(-50%);background:var(--or);color:var(--brun);font-weight:800;border-radius:999px;white-space:nowrap;box-shadow:0 6px 14px rgba(217,167,59,.4)}
.carte h2{font-family:var(--titres);font-weight:600;margin:0;color:var(--brun)}
.montant{font-family:var(--titres);font-weight:600;color:var(--or-texte);line-height:1}
.carte p{margin:0;color:var(--brun-doux);font-weight:700}
.bandeau{background:linear-gradient(135deg,var(--brun) 0%,#5b3f26 100%);color:#fff;border-radius:26px}
.bandeau b{display:block;font-family:var(--titres);font-weight:600;color:var(--or-clair)}
.bandeau span{color:#f3e8d3}
.etape .n{border:3px solid var(--or);background:var(--creme);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--titres);font-weight:600;color:var(--or-texte)}
.etape p{margin:0;font-weight:700;color:var(--brun)}
.contact{font-weight:800;color:var(--or-texte)}
.vague{position:absolute;left:0}
`;

const vague = (largeur) => {
  let d = 'M0 14';
  for (let x = 0; x < largeur; x += 140) d += ' q35 -9 70 0 t70 0';
  return `<svg class="vague" width="${largeur}" height="28" viewBox="0 0 ${largeur} 28"><path d="${d}" fill="none" stroke="#d9a73b" stroke-width="2.6" stroke-linecap="round"/></svg>`;
};
const doc = (w, h, css, body) => `<!doctype html><html lang="fr"><head><meta charset="utf-8"><link href="${POLICES}" rel="stylesheet"><style>${BASE}body{width:${w}px;height:${h}px}.page{width:${w}px;height:${h}px}${css}</style></head><body>${body}</body></html>`;

const ETAPES = [
  'Parlez de Sushumna à un proche.',
  'Il prend son massage et profite de 20 € de réduction.',
  'Vous avez 2 mois pour utiliser vos 20 €.',
];
const BANDEAU = { titre: 'Votre réduction est valable 2 mois', texte: 'à partir du jour où votre filleul prend son massage.' };

/* ---------- A4 (794 × 1123, rendu ×3,125 = 300 dpi) ---------- */
const a4 = doc(794, 1123, `
.logo{position:absolute;left:50%;top:34px;transform:translateX(-50%);width:230px;height:auto}
.haut{position:absolute;left:0;right:0;top:132px}
.haut .surtitre{font-size:15px}.haut .titre{font-size:62px;margin:8px 0 10px}.haut .sous{font-size:26px}
.cartes{position:absolute;left:44px;right:44px;top:345px;display:grid;grid-template-columns:1fr 1fr;gap:26px}
.carte{padding:54px 18px 32px}.badge{top:-19px;font-size:17px;padding:7px 20px}
.carte h2{font-size:36px;margin-bottom:10px}.montant{font-size:116px;margin:8px 0 12px}
.carte p{font-size:20px;line-height:1.35}
.bandeau{position:absolute;left:44px;right:44px;top:725px;padding:26px 26px}
.bandeau b{font-size:33px;margin-bottom:8px}.bandeau span{font-size:21px}
.etapes{position:absolute;left:44px;right:44px;top:880px;display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.etape .n{width:60px;height:60px;font-size:30px;margin:0 auto 12px}.etape p{font-size:17.5px;line-height:1.35;padding:0 6px}
.contact{position:absolute;left:0;right:0;bottom:7px;font-size:15px}.vague{bottom:44px}`,
`<div class="page">
 <div class="deco" style="width:420px;height:420px;right:-150px;top:-140px"></div>
 <div class="deco" style="width:360px;height:360px;left:-140px;bottom:200px"></div>
 <img class="filigrane" src="${EMBLEME}" style="left:50%;top:560px;width:640px;transform:translate(-50%,-50%)" alt="">
 <img class="logo" src="${LOGO}" alt="Sushumna">
 <div class="haut"><p class="surtitre">Parrainage</p><h1 class="titre">Parrainez un proche</h1><p class="sous">20 € de réduction pour le parrain et le filleul</p></div>
 <div class="cartes">
  <div class="carte"><span class="badge">Pour le filleul</span><h2>Votre proche</h2><div class="montant">${REDUC}</div><p>de réduction sur son massage</p></div>
  <div class="carte"><span class="badge">Pour le parrain</span><h2>Vous</h2><div class="montant">${REDUC}</div><p>de réduction sur votre prochain massage</p></div>
 </div>
 <div class="bandeau"><b>${BANDEAU.titre}</b><span>${BANDEAU.texte}</span></div>
 <div class="etapes">${ETAPES.map((t, i) => `<div class="etape"><div class="n">${i + 1}</div><p>${t}</p></div>`).join('')}</div>
 ${vague(794)}<p class="contact">Pour réserver : 07 50 46 01 10 · massage-sushumna.com · @massage_sushumna_orleans</p>
</div>`);

/* ---------- Publication carrée (1080 × 1080) ---------- */
const post = doc(1080, 1080, `
.logo{position:absolute;left:70px;top:56px;width:240px;height:auto}
.haut{position:absolute;left:0;right:0;top:130px}
.haut .surtitre{font-size:26px}.haut .titre{font-size:76px;margin:12px 0 10px}.haut .sous{font-size:34px}
.cartes{position:absolute;left:70px;right:70px;top:395px;display:grid;grid-template-columns:1fr 1fr;gap:34px}
.carte{padding:50px 20px 30px}.badge{top:-22px;font-size:23px;padding:8px 24px}
.carte h2{font-size:38px;margin-bottom:6px}.montant{font-size:118px;margin:4px 0 10px}.carte p{font-size:25px;line-height:1.3}
.bandeau{position:absolute;left:70px;right:70px;top:795px;padding:22px 30px}
.bandeau b{font-size:42px;margin-bottom:6px}.bandeau span{font-size:27px}
.contact{position:absolute;left:0;right:0;bottom:44px;font-size:25px}`,
`<div class="page">
 <div class="deco" style="width:520px;height:520px;right:-170px;top:-170px"></div>
 <div class="deco" style="width:420px;height:420px;left:-150px;bottom:-60px"></div>
 <img class="logo" src="${LOGO}" alt="Sushumna">
 <div class="haut"><p class="surtitre">Parrainage</p><h1 class="titre">Parrainez un proche</h1><p class="sous">20 € de réduction pour vous deux</p></div>
 <div class="cartes">
  <div class="carte"><span class="badge">Le filleul</span><h2>Son massage</h2><div class="montant">${REDUC}</div><p>de réduction</p></div>
  <div class="carte"><span class="badge">Le parrain</span><h2>Votre massage</h2><div class="montant">${REDUC}</div><p>de réduction</p></div>
 </div>
 <div class="bandeau"><b>${BANDEAU.titre}</b><span>${BANDEAU.texte}</span></div>
 <p class="contact">massage-sushumna.com · 07 50 46 01 10</p>
</div>`);

/* ---------- Story (1080 × 1920) ---------- */
const story = doc(1080, 1920, `
.logo{position:absolute;left:50%;top:200px;transform:translateX(-50%);width:320px;height:auto}
.haut{position:absolute;left:0;right:0;top:350px}
.haut .surtitre{font-size:30px}.haut .titre{font-size:90px;margin:14px 0 14px}.haut .sous{font-size:42px;padding:0 70px}
.cartes{position:absolute;left:70px;right:70px;top:700px;display:grid;grid-template-columns:1fr 1fr;gap:34px}
.carte{padding:62px 20px 38px}.badge{top:-26px;font-size:28px;padding:10px 30px}
.carte h2{font-size:44px;margin-bottom:8px}.montant{font-size:140px;margin:6px 0 12px}.carte p{font-size:30px;line-height:1.3}
.bandeau{position:absolute;left:70px;right:70px;top:1130px;padding:30px 34px}
.bandeau b{font-size:50px;margin-bottom:8px}.bandeau span{font-size:34px}
.etapes{position:absolute;left:70px;right:70px;top:1385px;display:flex;flex-direction:column;gap:22px}
.etape{display:flex;align-items:center;gap:26px;text-align:left;background:var(--creme);border:2px solid var(--bordure);border-radius:28px;padding:16px 28px;box-shadow:0 8px 22px rgba(92,67,48,.08)}
.etape .n{width:62px;height:62px;font-size:34px;flex:none}.etape p{font-size:33px;line-height:1.25}
.contact{position:absolute;left:0;right:0;top:1795px;font-size:30px}`,
`<div class="page">
 <div class="deco" style="width:640px;height:640px;right:-230px;top:-170px"></div>
 <div class="deco" style="width:560px;height:560px;left:-220px;bottom:-130px"></div>
 <img class="logo" src="${LOGO}" alt="Sushumna">
 <div class="haut"><p class="surtitre">Parrainage</p><h1 class="titre">Parrainez un proche</h1><p class="sous">20 € de réduction pour le parrain et le filleul</p></div>
 <div class="cartes">
  <div class="carte"><span class="badge">Le filleul</span><h2>Son massage</h2><div class="montant">${REDUC}</div><p>de réduction</p></div>
  <div class="carte"><span class="badge">Le parrain</span><h2>Votre massage</h2><div class="montant">${REDUC}</div><p>de réduction</p></div>
 </div>
 <div class="bandeau"><b>${BANDEAU.titre}</b><span>${BANDEAU.texte}</span></div>
 <div class="etapes">${ETAPES.map((t, i) => `<div class="etape"><div class="n">${i + 1}</div><p>${t}</p></div>`).join('')}</div>
 <p class="contact">massage-sushumna.com · 07 50 46 01 10</p>
</div>`);

(async () => {
  const navigateur = await chromium.launch({ args: ['--no-sandbox'] });
  const rendre = async (html, w, h, echelle, jpeg, pdf) => {
    const fichier = path.join(SORTIE, `_${path.basename(jpeg, '.jpg')}.html`);
    fs.writeFileSync(fichier, html);
    const ctx = await navigateur.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: echelle });
    const page = await ctx.newPage();
    await page.goto('file://' + fichier, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(SORTIE, jpeg), type: 'jpeg', quality: 92 });
    if (pdf) await page.pdf({ path: path.join(SORTIE, pdf), width: '210mm', height: '297mm', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    await ctx.close();
  };
  await rendre(a4, 794, 1123, 3.125, 'parrainage-affiche-a4.jpg', 'parrainage-affiche-a4.pdf');
  await rendre(post, 1080, 1080, 1, 'parrainage-publication.jpg');
  await rendre(story, 1080, 1920, 1, 'parrainage-story.jpg');
  await navigateur.close();
  console.log('ok');
})();
