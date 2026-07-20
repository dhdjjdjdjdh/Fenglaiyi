import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("C:/Users/fenglaiyi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
});
const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1 });
const errors = [];
page.on("console", message => {
  if (message.type() === "error") errors.push(`console: ${message.text()}`);
});
page.on("pageerror", error => errors.push(`page: ${error.message}`));

await page.goto("http://127.0.0.1:8765/unequal.html", { waitUntil: "networkidle" });
await page.locator("#custodyLedger").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.locator("#custodyLedger").screenshot({ path: "work/qa-custody-desktop.png" });

const firstState = await page.evaluate(() => ({
  lens: document.getElementById("custodyLensText")?.textContent,
  images: [...document.querySelectorAll(".custody-gallery img")].map(image => ({
    src: image.getAttribute("src"),
    width: image.getBoundingClientRect().width,
    height: image.getBoundingClientRect().height,
    naturalWidth: image.naturalWidth,
    naturalHeight: image.naturalHeight
  })),
  gallery: document.getElementById("custodyGallery")?.getBoundingClientRect().toJSON()
}));

const stageAudit = [];
for (let index = 0; index < 4; index += 1) {
  await page.locator(`.custody-stop[data-index="${index}"]`).click();
  await page.waitForTimeout(220);
  stageAudit.push(await page.evaluate(() => ({
    title: document.getElementById("custodyTitle")?.textContent,
    images: [...document.querySelectorAll(".custody-gallery img")].map(image => ({
      src: image.getAttribute("src"),
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight
    })),
    captions: [...document.querySelectorAll(".custody-gallery figcaption strong")].map(caption => caption.textContent)
  })));
}

await page.locator('.custody-stop[data-index="2"]').click();
await page.locator('.custody-lens-tab[data-lens="missing"]').click();
await page.waitForTimeout(480);
await page.locator("#custodyLedger").screenshot({ path: "work/qa-custody-repair.png" });

await page.locator("#riskLexicon").scrollIntoViewIfNeeded();
await page.locator('.risk-term[data-code="MEDIUM 02"]').hover();
await page.waitForTimeout(320);
await page.locator("#riskLexicon").screenshot({ path: "work/qa-risk-desktop.png" });

const secondState = await page.evaluate(() => ({
  title: document.getElementById("custodyTitle")?.textContent,
  lens: document.getElementById("custodyLensText")?.textContent,
  gallerySources: [...document.querySelectorAll(".custody-gallery img")].map(image => image.getAttribute("src")),
  riskTitle: document.getElementById("riskLexiconTitle")?.textContent,
  riskText: document.getElementById("riskLexiconText")?.textContent,
  overflows: [...document.querySelectorAll(".custody-ledger *, .risk-lexicon *")]
    .filter(element => element.scrollWidth > element.clientWidth + 2 || element.scrollHeight > element.clientHeight + 2)
    .slice(0, 15)
    .map(element => ({ className: element.className?.baseVal || element.className, id: element.id, sw: element.scrollWidth, cw: element.clientWidth, sh: element.scrollHeight, ch: element.clientHeight }))
}));

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
mobile.on("console", message => {
  if (message.type() === "error") errors.push(`mobile console: ${message.text()}`);
});
mobile.on("pageerror", error => errors.push(`mobile page: ${error.message}`));
await mobile.goto("http://127.0.0.1:8765/unequal.html", { waitUntil: "networkidle" });
await mobile.locator("#custodyLedger").scrollIntoViewIfNeeded();
await mobile.waitForTimeout(400);
await mobile.locator("#custodyLedger").screenshot({ path: "work/qa-custody-mobile.png" });
await mobile.locator("#riskLexicon").scrollIntoViewIfNeeded();
await mobile.locator("#riskLexicon").screenshot({ path: "work/qa-risk-mobile.png" });
const mobileState = await mobile.evaluate(() => ({
  bodyWidth: document.body.scrollWidth,
  viewportWidth: window.innerWidth,
  galleryScrollWidth: document.getElementById("custodyGallery")?.scrollWidth,
  galleryClientWidth: document.getElementById("custodyGallery")?.clientWidth,
  riskWidth: document.getElementById("riskLexicon")?.getBoundingClientRect().width
}));

console.log(JSON.stringify({ firstState, stageAudit, secondState, mobileState, errors }, null, 2));
await browser.close();
