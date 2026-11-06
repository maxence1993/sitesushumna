const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const POLICES = 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@1,500&display=swap';
const L = 3869, H = 1426;
const page = (logo, couleur, taille) => `<!doctype html><html><head><meta charset="utf-8"><link href="${POLICES}" rel="stylesheet"><style>
html,body{margin:0;padding:0;background:transparent}
#logo{position:relative;width:${L}px;height:${H}px}
#logo img{width:${L}px;height:${H}px;display:block}
#logo p{position:absolute;margin:0;left:${(L * 0.7216).toFixed(1)}px;top:${(H * 0.592 + 70).toFixed(1)}px;transform:translateX(-50%);white-space:nowrap;
 font-family:"Lora",Georgia,serif;font-style:italic;font-size:${taille}px;line-height:1.1;color:${couleur}}
</style></head><body><div id="logo"><img src="file:///home/user/sitesushumna/graphisme/assets/${logo}" alt=""><p id="s">Le bonheur est en vous</p></div></body></html>`;
(async () => {
  const nav = await chromium.launch({ args: ['--no-sandbox'] });
  for (const [nom, logo, couleur] of [
    ['logo-sushumna-slogan-couleurs-transparent', 'logo-hd.png', '#87601a'],
    ['logo-sushumna-slogan-or-transparent', 'logo-hd-or.png', '#d9a73b'],
  ]) {
    const f = path.join(__dirname, `_${nom}.html`);
    fs.writeFileSync(f, page(logo, couleur, 200));
    const ctx = await nav.newContext({ viewport: { width: L, height: H }, deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    await p.goto('file://' + f, { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(400);
    const r = await p.evaluate(() => { const b = document.getElementById('s').getBoundingClientRect(); return { l: b.left, r: b.right, t: b.top, b: b.bottom }; });
    console.log(nom, JSON.stringify(r));
    await p.screenshot({ path: path.join(__dirname, `${nom}.png`), omitBackground: true, clip: { x: 0, y: 0, width: L, height: H } });
    await ctx.close();
  }
  await nav.close();
})();
