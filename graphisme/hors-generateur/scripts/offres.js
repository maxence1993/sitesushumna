/* Affiche A4 « Formules 4 massages + Parrainage ». Script hors du dépôt.
   Les prix sont lus dans mes-contenus/massages-et-tarifs.js. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SORTIE = __dirname;
const SITE = '/home/user/sitesushumna';
const LOGO = `file://${SITE}/graphisme/assets/logo-hd.png`;
const EMBLEME = `file://${SITE}/graphisme/assets/embleme-hd.png`;
const POLICES = 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;1,500&family=Nunito:wght@400;600;700;800&display=swap';
const { TARIFS, FORMULES } = vm.runInNewContext(fs.readFileSync(`${SITE}/mes-contenus/massages-et-tarifs.js`, 'utf8') + ';({ TARIFS, FORMULES })', {});
const prixSeance = (d) => TARIFS.find((t) => t.duree === d && !t.massage).prix;
const eur = (n) => `${n} €`;

const cartes = FORMULES.map((f) => {
  const duree = f.minutes === 60 ? '1h' : '2h';
  return { duree, prix: f.prix, parSeance: f.prix / 4, normal: 4 * prixSeance(duree), avantage: f.avantage.replace("'", '’') };
});

const vague = (largeur, y, hauteur = 22) => {
  let d = 'M0 11';
  for (let x = 0; x < largeur; x += 140) d += ' q35 -8 70 0 t70 0';
  return `<svg style="position:absolute;left:0;top:${y}px" width="${largeur}" height="${hauteur}" viewBox="0 0 ${largeur} ${hauteur}"><path d="${d}" fill="none" stroke="#d9a73b" stroke-width="2.4" stroke-linecap="round"/></svg>`;
};

const css = `
:root{--creme:#fffdf8;--sable-2:#f3e8d3;--bordure:#e6d5b5;--or:#d9a73b;--or-clair:#f6e3b4;--or-texte:#87601a;--brun:#3d2a1b;--brun-doux:#5c4330;--titres:"Lora",Georgia,serif;--texte:"Nunito",Arial,sans-serif}
*{box-sizing:border-box}html,body{margin:0;padding:0}
body{width:794px;height:1123px;font-family:var(--texte);color:var(--brun);background:var(--creme)}
@page{size:210mm 297mm;margin:0}
.page{position:relative;width:794px;height:1123px;overflow:hidden;background:linear-gradient(180deg,var(--creme) 0%,#fbf3e2 100%);text-align:center}
.deco{position:absolute;border-radius:50%;background:#f6e3b4;opacity:.45}
.logo{position:absolute;left:50%;top:26px;transform:translateX(-50%);width:200px;height:auto}
.rubrique{position:absolute;left:44px;right:44px;display:flex;align-items:center;gap:14px}
.rubrique h2{font-family:var(--titres);font-weight:600;font-size:46px;margin:0;color:var(--brun);white-space:nowrap}
.rubrique .trait{flex:1;height:3px;background:linear-gradient(90deg,var(--or),rgba(217,167,59,0))}
.sous{position:absolute;left:44px;right:44px;margin:0;font-family:var(--titres);font-style:italic;font-size:20px;color:var(--or-texte);text-align:left}
.cartes{position:absolute;left:44px;right:44px;display:grid;grid-template-columns:1fr 1fr;gap:22px}
.carte{position:relative;background:var(--creme);border:2.5px solid var(--or);border-radius:26px;box-shadow:0 10px 26px rgba(92,67,48,.14)}
.badge{position:absolute;left:50%;transform:translateX(-50%);background:var(--or);color:var(--brun);font-weight:800;border-radius:999px;white-space:nowrap;box-shadow:0 5px 12px rgba(217,167,59,.4)}
.carte h3{font-family:var(--titres);font-weight:600;margin:0;color:var(--brun)}
.montant{font-family:var(--titres);font-weight:600;color:var(--or-texte);line-height:1}
.carte p{margin:0;color:var(--brun-doux);font-weight:700}
.infos{position:absolute;left:44px;right:44px;padding:0 10px;font-size:16px;line-height:1.45;color:var(--brun);text-align:center}
.infos b{color:var(--or-texte)}
.bandeau{position:absolute;left:44px;right:44px;background:linear-gradient(135deg,var(--brun) 0%,#5b3f26 100%);border-radius:22px;padding:16px 24px;color:#fff}
.bandeau b{display:block;font-family:var(--titres);font-weight:600;font-size:28px;color:var(--or-clair);margin-bottom:3px}
.bandeau span{font-size:17px;color:#f3e8d3}
.etapes{position:absolute;left:44px;right:44px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.etape{display:flex;align-items:center;gap:10px;text-align:left}
.etape .n{width:38px;height:38px;flex:none;border:3px solid var(--or);background:var(--creme);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--titres);font-weight:600;font-size:19px;color:var(--or-texte)}
.etape p{margin:0;font-size:13.5px;line-height:1.3;font-weight:700;color:var(--brun)}
.contact{position:absolute;left:0;right:0;bottom:8px;margin:0;font-size:14px;font-weight:800;color:var(--or-texte)}
`;

const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><link href="${POLICES}" rel="stylesheet"><style>${css}
.carte.f{padding:44px 14px 20px}.f .badge{top:-24px;font-size:23px;padding:9px 26px}
.f h3{font-size:27px;margin-bottom:4px}.f .montant{font-size:22px;margin:6px 0 8px}.f p.pm{font-size:28px;line-height:1.2;color:var(--brun);white-space:nowrap}.f p.ancien{font-size:16px;line-height:1.3;margin-top:4px}.f s{text-decoration-thickness:1.6px}
.carte.p{padding:34px 10px 16px}.p .badge{top:-16px;font-size:15px;padding:5px 17px}
.p h3{font-size:23px;margin-bottom:2px}.p .montant{font-size:66px;margin:4px 0 4px}.p p{font-size:15px;line-height:1.3;white-space:nowrap}
</style></head><body><div class="page">
 <div class="deco" style="width:380px;height:380px;right:-140px;top:-130px"></div>
 <div class="deco" style="width:320px;height:320px;left:-130px;bottom:90px"></div>
 <img style="position:absolute;opacity:.05;left:50%;top:560px;width:560px;transform:translate(-50%,-50%)" src="${EMBLEME}" alt="">
 <img class="logo" src="${LOGO}" alt="Sushumna">

 <div class="rubrique" style="top:108px"><h2>Formules 4 massages</h2><span class="trait"></span></div>
 <p class="sous" style="top:170px">4 séances à utiliser sur 2 mois</p>
 <div class="cartes" style="top:244px">${cartes.map((c) => `<div class="carte f"><span class="badge">${c.avantage}</span><h3>4 massages ${c.duree === '1h' ? 'd’1h' : 'de 2h'}</h3><div class="montant">${eur(c.prix)}</div><p class="pm">soit ${eur(c.parSeance)} le massage</p><p class="ancien">au lieu de <s>${eur(c.normal)}</s></p></div>`).join('')}</div>
 <div class="infos" style="top:480px"><b>Règlement en espèces</b>, en une fois, au premier massage. Formule 4 massages de 2h : possible en deux fois, 200&nbsp;€ puis 200&nbsp;€ (tout doit être réglé au deuxième massage).</div>

 ${vague(794, 538)}

 <div class="rubrique" style="top:578px"><h2>Parrainage</h2><span class="trait"></span></div>
 <p class="sous" style="top:640px">Parrainez un proche : 20 € de réduction pour le parrain et le filleul</p>
 <div class="cartes" style="top:696px">
  <div class="carte p"><span class="badge">Pour le filleul</span><h3>Votre proche</h3><div class="montant">${eur(20)}</div><p>de réduction sur son massage</p></div>
  <div class="carte p"><span class="badge">Pour le parrain</span><h3>Vous</h3><div class="montant">${eur(20)}</div><p>de réduction sur votre prochain massage</p></div>
 </div>
 <div class="bandeau" style="top:908px"><b>Votre réduction est valable 2 mois</b><span>à partir du jour où votre filleul prend son massage.</span></div>
 ${vague(794, 1046)}
 <p class="contact">Pour réserver : 07 50 46 01 10 · massage-sushumna.com · @massage_sushumna_orleans</p>
</div></body></html>`;

(async () => {
  const fichier = path.join(SORTIE, '_offres.html');
  fs.writeFileSync(fichier, html);
  const navigateur = await chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await navigateur.newContext({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 3.125 });
  const page = await ctx.newPage();
  await page.goto('file://' + fichier, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(SORTIE, 'affiche-formules-et-parrainage-a4.jpg'), type: 'jpeg', quality: 92 });
  await page.pdf({ path: path.join(SORTIE, 'affiche-formules-et-parrainage-a4.pdf'), width: '210mm', height: '297mm', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await navigateur.close();
  console.log('ok');
})();
