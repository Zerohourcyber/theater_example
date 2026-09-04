/**
 * Visual QA screenshot harness.
 *
 * Starts the production server (deterministic output, no dev-compile jank),
 * captures full-page screenshots of every public route at desktop (1440px)
 * and mobile (390px) widths into /screenshots.
 *
 * Reduced motion is emulated so the hero's staggered load animation resolves
 * immediately rather than capturing mid-fade.
 *
 * Run: npm run screenshots   (after npm run build)
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
  { name: "plan", path: "/plan" },
  { name: "support", path: "/support" },
  { name: "who-we-are", path: "/who-we-are" },
  { name: "contact", path: "/contact" },
  { name: "proposal-general", path: "/proposal" },
  { name: "proposal-enmu", path: "/proposal?for=enmu" },
  { name: "proposal-sponsor", path: "/proposal?for=sponsor" },
  { name: "not-found", path: "/no-such-page" },
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

/**
 * A server left over from an interrupted run will still answer on PORT, and
 * `next start` fails quietly when the port is taken — so the capture would
 * silently screenshot a stale build, referencing CSS chunk names that no
 * longer exist. Refuse to run instead.
 */
async function assertPortFree(): Promise<void> {
  try {
    await fetch(BASE, { signal: AbortSignal.timeout(1500) });
  } catch {
    return; // Nothing listening, which is what we want.
  }
  console.error(
    `Something is already serving ${BASE} — probably a leftover \`next start\`.\n` +
      "Stop it first, or screenshots will capture a stale build."
  );
  process.exit(1);
}

async function main() {
  if (!existsSync(join(process.cwd(), ".next", "BUILD_ID"))) {
    console.error("No production build found — run `npm run build` first.");
    process.exit(1);
  }
  await assertPortFree();
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

    // The proposal's whole purpose is to be handed over on paper, so the
    // print stylesheet is a deliverable and gets checked alongside the rest.
    const pdfContext = await browser.newContext();
    const pdfPage = await pdfContext.newPage();
    for (const variant of ["general", "enmu", "sponsor", "city"]) {
      const query = variant === "general" ? "" : `?for=${variant}`;
      await pdfPage.goto(`${BASE}/proposal${query}`, {
        waitUntil: "networkidle",
      });
      await pdfPage.evaluate(() => document.fonts.ready);
      const file = join(OUT_DIR, `proposal-${variant}.pdf`);
      await pdfPage.pdf({ path: file, format: "Letter", printBackground: true });
      console.log(`  ✓ proposal-${variant}.pdf`);
    }
    await pdfContext.close();

    await browser.close();
    console.log(`Done — screenshots and PDFs in ${OUT_DIR}`);
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
