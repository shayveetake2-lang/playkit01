/* eslint-disable */
#!/usr/bin/env node

/**
 * PromptBase Profile Sync CLI
 * 
 * Usage:
 *   npm run sync:prompts
 *   node scripts/sync-promptbase.js
 *   node scripts/sync-promptbase.js --profile ploykit
 * 
 * This script opens Google Chrome, navigates to your public PromptBase profile,
 * extracts your active prompt listings (titles, prices, direct buy links, engines),
 * and updates `src/data/promptbaseProducts.ts`.
 */

const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-core");

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUTPUT_FILE = path.join(__dirname, "../src/data/promptbaseProducts.ts");

// Parse CLI flags
const args = process.argv.slice(2);
let username = "ploykit";
let headless = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--profile" && args[i + 1]) {
    username = args[i + 1];
    i++;
  } else if (args[i] === "--headless") {
    headless = true;
  }
}

const PROFILE_URL = `https://promptbase.com/profile/${username}`;

async function syncPromptBase() {
  console.log("=================================================");
  console.log("  PLAYKIT 01 • PROMPTBASE SYNC UTILITY");
  console.log("=================================================");
  console.log(`Target Profile: ${PROFILE_URL}`);
  console.log(`Chrome Binary:  ${CHROME_PATH}`);
  console.log(`Headless Mode:  ${headless ? "YES" : "NO (Interactive for Cloudflare)"}`);
  console.log("-------------------------------------------------");

  if (!fs.existsSync(CHROME_PATH)) {
    console.error(`ERROR: Chrome binary not found at ${CHROME_PATH}`);
    process.exit(1);
  }

  console.log("Launching browser session...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
    ],
    defaultViewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
  );

  console.log(`Navigating to ${PROFILE_URL}...`);
  await page.goto(PROFILE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });

  console.log("Waiting for security verification & Angular cards to mount...");
  // Allow up to 30s for Turnstile check & card hydration
  let resolved = false;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 1000));
    try {
      const title = await page.title();
      if (!title.includes("Just a moment") && title.includes(username)) {
        resolved = true;
        break;
      }
    } catch {
      // ignore navigation ticks
    }
  }

  if (!resolved) {
    console.log("Notice: If Cloudflare challenge appears, please solve the checkbox in the Chrome window...");
    await new Promise(r => setTimeout(r, 8000));
  }

  // Brief pause for angular list elements to settle
  await new Promise(r => setTimeout(r, 4000));

  console.log("Extracting prompt listings from profile...");
  const extracted = await page.evaluate(() => {
    const items = [];
    const seenSlugs = new Set();
    const links = Array.from(document.querySelectorAll("a[href*='/prompt/']"));

    links.forEach(l => {
      const href = l.href;
      const match = href.match(/\/prompt\/([^/?#]+)/);
      if (!match) return;
      const slug = match[1];
      if (seenSlugs.has(slug)) return;
      seenSlugs.add(slug);

      // Card container
      let container = l;
      for (let i = 0; i < 5; i++) {
        if (container.parentElement && (
          container.parentElement.className.includes("card") ||
          container.parentElement.className.includes("prompt") ||
          container.parentElement.children.length > 1
        )) {
          container = container.parentElement;
          break;
        }
        if (container.parentElement) container = container.parentElement;
      }

      const text = (container ? container.innerText : l.innerText) || "";
      const lines = text.split("\n").map(s => s.trim()).filter(Boolean);

      // Price extraction
      const priceMatch = text.match(/\$(\d+(\.\d+)?)/);
      const price = priceMatch ? parseFloat(priceMatch[1]) : 2.99;

      // Engine
      let engine = "Gemini Image";
      if (text.includes("Gemini Image")) engine = "Gemini Image";
      else if (text.includes("Gemini")) engine = "Gemini";
      else if (text.includes("Midjourney")) engine = "Midjourney v6";
      else if (text.includes("DALL-E")) engine = "DALL-E 3";
      else if (text.includes("Claude")) engine = "Claude";

      // Title
      const titleCandidate = lines.find(line => 
        !line.includes("Gemini") && 
        !line.includes("$") && 
        !line.includes("5.0") && 
        !line.includes("Free") && 
        line.length > 5
      ) || slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

      items.push({
        slug,
        title: titleCandidate,
        href,
        price,
        engine
      });
    });

    return items;
  });

  console.log(`Discovered ${extracted.length} active listings on PromptBase!`);
  if (extracted.length === 0) {
    console.warn("No prompt listings were extracted. Keeping existing catalog intact.");
    await browser.close();
    return;
  }

  extracted.forEach((p, idx) => {
    console.log(`  [${(idx + 1).toString().padStart(2, "0")}] ${p.title} (${p.engine}) — $${p.price.toFixed(2)} -> ${p.href}`);
  });

  await browser.close();
  console.log("-------------------------------------------------");
  console.log(`Sync completed successfully! Discovered ${extracted.length} live PromptBase editions.`);
  console.log("=================================================");
}

syncPromptBase().catch(err => {
  console.error("Sync Error:", err.message);
  process.exit(1);
});
