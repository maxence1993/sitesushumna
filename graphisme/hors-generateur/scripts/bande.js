const { chromium } = require('playwright');
const path = require('path');
const LOGO = 'file:///home/user/sitesushumna/graphisme/assets/logo-hd.png';
const LOGO_OR = 'file:///home/user/sitesushumna/graphisme/assets/logo-hd-or.png';
const POLICES = 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;1,500&family=Nunito:wght@700;800&display=swap';
const page = (rgb, logo, couleurSlogan, haut, top, opaque, tailleLogo) => `<!doctype html><html><head><meta charset="utf-8"><link href="${POLICES}" rel="stylesheet"><style>
html,body{margin:0;padding:0;background:transparent}
body{width:1080px;height:1920px;position:relative}
.bande{position:absolute;left:0;top:${top}px;width:1080px;height:${haut}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;
 background:linear-gradient(to bottom,rgba(${rgb},0) 0%,rgba(${rgb},${(opaque*.04).toFixed(3)}) 6%,rgba(${rgb},${(opaque*.15).toFixed(3)}) 14%,rgba(${rgb},${(opaque*.36).toFixed(3)}) 23%,rgba(${rgb},${(opaque*.64).toFixed(3)}) 32%,rgba(${rgb},${(opaque*.9).toFixed(3)}) 40%,rgba(${rgb},${opaque}) 46%,rgba(${rgb},${opaque}) 54%,rgba(${rgb},${(opaque*.9).toFixed(3)}) 60%,rgba(${rgb},${(opaque*.64).toFixed(3)}) 68%,rgba(${rgb},${(opaque*.36).toFixed(3)}) 77%,rgba(${rgb},${(opaque*.15).toFixed(3)}) 86%,rgba(${rgb},${(opaque*.04).toFixed(3)}) 94%,rgba(${rgb},0) 100%)}
.logo{position:relative;width:${tailleLogo}px}
.logo img{width:${tailleLogo}px;height:auto;display:block}
.logo p.slogan{position:absolute;margin:0;left:${(tailleLogo*0.7216).toFixed(1)}px;top:${(tailleLogo*1426/3869*0.592 + 7).toFixed(1)}px;transform:translateX(-50%);white-space:nowrap;font-family:"Lora",Georgia,serif;font-style:italic;font-size:24px;line-height:1.1;color:${couleurSlogan}}
.bande p.lieu{margin:22px 0 0;font-family:"Nunito",Arial,sans-serif;font-weight:800;font-size:27px;letter-spacing:.05em;color:${couleurSlogan}}
</style></head><body><div class="bande"><div class="logo"><img src="${logo}" alt=""><p class="slogan">Le bonheur est en vous</p></div><p class="lieu">Massage bien-être, Orléans</p></div></body></html>`;
(async () => {
  const nav = await chromium.launch({ args: ['--no-sandbox'] });
  for (const [nom, html] of [
    ['bande-logo-claire-large', page('255,253,248', LOGO, '#87601a', 600, 1270, 0.9, 400)],
    ['bande-logo-foncee-large', page('61,42,27', LOGO_OR, '#f6e3b4', 600, 1270, 0.9, 400)],
  ]) {
    const f = path.join(__dirname, `_${nom}.html`);
    require('fs').writeFileSync(f, html);
    const ctx = await nav.newContext({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    await p.goto('file://' + f, { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(__dirname, `${nom}.png`), omitBackground: true });
    await ctx.close();
  }
  await nav.close();
  console.log('ok');
})();
