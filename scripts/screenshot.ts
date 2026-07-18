/**
 * Visual QA screenshot harness.
 *
 * Starts the production server (deterministic output, no dev-compile jank),
 * captures full-page screenshots of every public route at desktop (1440px)
 * and mobile (390px) widths into /screenshots.
 *
 * Reduced motion is emulated so scroll-triggered Framer animations render
 * statically — otherwise below-the-fold sections would screenshot at
 * opacity 0.
 *
 * Run: node scripts/screenshot.ts   (Node 22+ type stripping)
 */

import { spawn, type ChildProcess } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const PORT = 3113;
const BASE = `http://localhost:${PORT}`;
const OUT_DIR = join(process.cwd(), "screenshots");

const routes: Array<{ name: string; path: string }> = [
  { name: "home", path: "/" },
  { name: "productions", path: "/productions" },
  { name: "production-detail", path: "/productions/dear-evan-hansen" },
  { name: "about", path: "/about" },
  { name: "auditions", path: "/auditions" },
  { name: "get-involved", path: "/get-involved" },
  { name: "news", path: "/news" },
  { name: "contact", path: "/contact" },
  { name: "faq", path: "/faq" },
];

const viewports = [
  { label: "desktop", width: 1440, height: 900 },
  { label: "mobile", width: 390, height: 844 },
];

function waitForServer(url: string, timeoutMs = 60_000): Promise<void> {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const tick = async () => {
      try {
        const res = await fetch(url);
        if (res.ok) return resolve();
      } catch {
        /* not up yet */
      }
      if (Date.now() - started > timeoutMs) {
        return reject(new Error(`Server did not start within ${timeoutMs}ms`));
      }
      setTimeout(tick, 500);
    };
    tick();
  });
}

async function main() {
  if (!existsSync(join(process.cwd(), ".next", "BUILD_ID"))) {
    console.error("No production build found — run `npm run build` first.");
    process.exit(1);
  }
  mkdirSync(OUT_DIR, { recursive: true });

  console.log(`Starting production server on :${PORT} ...`);
  const server: ChildProcess = spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["next", "start", "-p", String(PORT)],
    { stdio: "ignore", shell: process.platform === "win32" }
  );

  try {
    await waitForServer(BASE);
    console.log("Server ready. Launching browser ...");
    const browser = await chromium.launch();

    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        reducedMotion: "reduce",
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();

      for (const route of routes) {
        const file = join(OUT_DIR, `${route.name}-${viewport.label}.png`);
        await page.goto(`${BASE}${route.path}`, { waitUntil: "networkidle" });
        // Let fonts settle before capture.
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(300);
        await page.screenshot({ path: file, fullPage: true });
        console.log(`  ✓ ${route.name}-${viewport.label}.png`);
      }
      await context.close();
    }

    await browser.close();
    console.log(`Done — screenshots in ${OUT_DIR}`);
  } finally {
    if (server.pid) {
      // On Windows, kill the whole npx→next process tree.
      if (process.platform === "win32") {
        spawn("taskkill", ["/PID", String(server.pid), "/T", "/F"], {
          stdio: "ignore",
          shell: true,
        });
      } else {
        server.kill("SIGTERM");
      }
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
