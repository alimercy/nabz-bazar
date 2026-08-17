import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

// Tiny .env loader so the project stays dependency-free.
const envPath = path.join(root, ".env");
if (existsSync(envPath)) {
  for (const rawLine of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const index = line.indexOf("=");
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

const PORT = Number(process.env.PORT || 8080);
const CACHE_SECONDS = Number(process.env.CACHE_SECONDS || 60);
const NAVASAN_CACHE_SECONDS = Number(process.env.NAVASAN_CACHE_SECONDS || 21600);
const NAVASAN_VALUE_DIVISOR = Number(process.env.NAVASAN_VALUE_DIVISOR || 1);
const NAVASAN_COIN_MULTIPLIER = Number(process.env.NAVASAN_COIN_MULTIPLIER || 1000);
const USD_TOMAN = Number(process.env.USD_TOMAN || 93250);
const COIN_PRICE = Number(process.env.COIN_IMAMI_TOMAN || 78240000);

const fallback = {
  bitcoin: { usd: 61843, usd_24h_change: 1.64 },
  ethereum: { usd: 2648, usd_24h_change: .98 },
  goldOunce: { price: 2458.3, change: .41 },
  eurPerUsd: .91,
  aedPerUsd: 3.6725
};

let cache = { at: 0, value: null };
let navasanCache = { at: 0, value: null };

async function fetchJson(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6500);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: { "User-Agent": "NabzBazaar/1.0", Accept: "application/json", ...(options.headers || {}) }
    });
    if (!response.ok) throw new Error(`${response.status} from ${new URL(url).hostname}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function getCrypto() {
  const headers = {};
  if (process.env.COINGECKO_API_KEY) headers["x-cg-demo-api-key"] = process.env.COINGECKO_API_KEY;
  return fetchJson(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true",
    { headers }
  );
}

async function getNavasan() {
  if (!process.env.NAVASAN_API_KEY) return null;
  if (navasanCache.value && Date.now() - navasanCache.at < NAVASAN_CACHE_SECONDS * 1000) {
    return navasanCache.value;
  }
  const url = new URL("https://api.navasan.tech/latest/");
  url.searchParams.set("api_key", process.env.NAVASAN_API_KEY);
  const value = await fetchJson(url.toString());
  navasanCache = { at: Date.now(), value };
  return value;
}

async function getFx() {
  const rows = await fetchJson("https://api.frankfurter.dev/v2/rates?base=USD&quotes=EUR,AED");
  return Object.fromEntries(rows.map(row => [row.quote, row.rate]));
}

async function getGold() {
  const gold = await fetchJson("https://api.gold-api.com/price/XAU");
  return { price: Number(gold.price), change: Number(gold.ch || gold.change || 0) };
}

const asset = (id, title, price, change, source, unit) => ({
  id, title, price: Number(price), change: Number(change || 0),
  low: Number(price) * .992, high: Number(price) * 1.008, source, unit
});

function readNavasan(data, keys, fallbackValue) {
  for (const key of keys) {
    const row = data?.[key];
    const value = Number(row?.value) / NAVASAN_VALUE_DIVISOR;
    if (!Number.isFinite(value)) continue;
    const absoluteChange = Number(row.change || 0) / NAVASAN_VALUE_DIVISOR;
    const previous = value - absoluteChange;
    const change = previous ? (absoluteChange / previous) * 100 : 0;
    return {
      value,
      change,
      timestamp: Number(row.timestamp || 0),
      key
    };
  }
  return { value: fallbackValue, change: 0, timestamp: 0, key: null };
}

async function buildMarkets() {
  if (cache.value && Date.now() - cache.at < CACHE_SECONDS * 1000) return cache.value;

  const [navasanResult, cryptoResult, fxResult, goldResult] = await Promise.allSettled([
    getNavasan(), getCrypto(), getFx(), getGold()
  ]);
  const navasan = navasanResult.status === "fulfilled" ? navasanResult.value : null;
  const crypto = cryptoResult.status === "fulfilled" ? cryptoResult.value : fallback;
  const fx = fxResult.status === "fulfilled" ? fxResult.value : { EUR: fallback.eurPerUsd, AED: fallback.aedPerUsd };
  const gold = goldResult.status === "fulfilled" && goldResult.value.price ? goldResult.value : fallback.goldOunce;
  const providers = [];
  if (navasan) providers.push("Navasan");
  if (cryptoResult.status === "fulfilled") providers.push("CoinGecko");
  if (fxResult.status === "fulfilled") providers.push("Frankfurter");
  if (goldResult.status === "fulfilled") providers.push("Gold API");

  const bitcoin = crypto.bitcoin || fallback.bitcoin;
  const ethereum = crypto.ethereum || fallback.ethereum;
  const usdLocal = readNavasan(navasan, ["usd_sell", "usd"], USD_TOMAN);
  const eurLocal = readNavasan(navasan, ["eur", "eur_sell"], USD_TOMAN / Number(fx.EUR || fallback.eurPerUsd));
  const aedLocal = readNavasan(navasan, ["aed_sell", "dirham_dubai", "aed"], USD_TOMAN / Number(fx.AED || fallback.aedPerUsd));
  const gold18Local = readNavasan(navasan, ["18ayar"], 0);
  const coinLocalRaw = readNavasan(navasan, ["sekkeh"], COIN_PRICE / NAVASAN_COIN_MULTIPLIER);
  const coinLocal = {
    ...coinLocalRaw,
    value: coinLocalRaw.key ? coinLocalRaw.value * NAVASAN_COIN_MULTIPLIER : COIN_PRICE
  };
  // 18K gold = 75% pure gold. This is a spot estimate, not a local dealer quote.
  const derivedGold18Toman = (Number(gold.price) * usdLocal.value / 31.1034768) * .75;
  const gold18Toman = gold18Local.value || derivedGold18Toman;
  const latestNavasanTimestamp = Math.max(
    usdLocal.timestamp, eurLocal.timestamp, aedLocal.timestamp, gold18Local.timestamp, coinLocal.timestamp
  );

  const payload = {
    live: providers.length > 0,
    updatedAt: latestNavasanTimestamp
      ? new Date(latestNavasanTimestamp * 1000).toISOString()
      : new Date().toISOString(),
    providers,
    domesticRateConfigured: Boolean(navasan || process.env.USD_TOMAN),
    navasanCacheSeconds: NAVASAN_CACHE_SECONDS,
    note: navasan
      ? "Iranian currency, gold and coin values are supplied by Navasan."
      : "Local gold is an estimate derived from XAU/USD and the configured USD/Toman rate.",
    assets: [
      asset("usd", "دلار آمریکا", usdLocal.value, usdLocal.change, navasan && usdLocal.key ? "Navasan" : "configured", "تومان"),
      asset("eur", "یورو", eurLocal.value, eurLocal.change, navasan && eurLocal.key ? "Navasan" : "Frankfurter + domestic USD", "تومان"),
      asset("aed", "درهم امارات", aedLocal.value, aedLocal.change, navasan && aedLocal.key ? "Navasan" : "Frankfurter + domestic USD", "تومان"),
      asset("gold18", "طلای ۱۸ عیار", gold18Toman, gold18Local.key ? gold18Local.change : gold.change, gold18Local.key ? "Navasan" : "derived spot estimate", "تومان"),
      asset("coin", "سکه امامی", coinLocal.value, coinLocal.change, coinLocal.key ? "Navasan" : "configured", "تومان"),
      asset("bitcoin", "بیت‌کوین", bitcoin.usd, bitcoin.usd_24h_change, "CoinGecko", "USD"),
      asset("ethereum", "اتریوم", ethereum.usd, ethereum.usd_24h_change, "CoinGecko", "USD"),
      asset("goldOunce", "انس جهانی طلا", gold.price, gold.change, "Gold API", "USD")
    ]
  };
  cache = { at: Date.now(), value: payload };
  return payload;
}

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon"
};

function json(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  });
  res.end(JSON.stringify(body));
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (requestUrl.pathname === "/api/markets") {
    try {
      return json(res, 200, await buildMarkets());
    } catch (error) {
      return json(res, 502, { error: "market_data_unavailable", message: error.message });
    }
  }
  if (requestUrl.pathname === "/api/health") {
    return json(res, 200, { ok: true, cacheSeconds: CACHE_SECONDS, time: new Date().toISOString() });
  }

  const relative = requestUrl.pathname === "/" ? "index.html" : decodeURIComponent(requestUrl.pathname.slice(1));
  const filePath = path.resolve(root, relative);
  if (!filePath.startsWith(root + path.sep) && filePath !== path.join(root, "index.html")) {
    return json(res, 403, { error: "forbidden" });
  }
  try {
    const info = await stat(filePath);
    if (!info.isFile()) throw new Error("not_file");
    const body = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-Content-Type-Options": "nosniff"
    });
    res.end(body);
  } catch {
    json(res, 404, { error: "not_found" });
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Nabz Bazaar running at http://localhost:${PORT}`);
  console.log(`API health: http://localhost:${PORT}/api/health`);
});
