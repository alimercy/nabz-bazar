# نبض بازار

A responsive RTL market dashboard with a dependency-free Node.js API proxy.

## Run

1. Install Node.js 18 or newer.
2. Copy `.env.example` to `.env`.
3. Update the domestic USD and coin prices in `.env`.
4. Start the project:

```powershell
npm start
```

Open `http://localhost:8080`.

## Pages

- `/` — main market dashboard
- `/currency.html` — currencies and converter
- `/gold.html` — gold, coins, and gold calculator
- `/crypto.html` — cryptocurrencies and portfolio value
- `/stocks.html` — stock-market indices and symbols
- `/global.html` — global commodities and indices
- `/news.html` — market news and analysis

Do not open `index.html` directly if you want live data. The `/api/markets`
endpoint is provided by `server.mjs`, and the browser calls that same-origin
endpoint once per minute.

## Deploy to a live website

The repository includes `render.yaml` for a Node web-service deployment.

1. Push the project to a private or public GitHub/GitLab repository.
2. In Render, create a new Blueprint or Node Web Service from that repository.
3. Use `npm install` as the build command and `npm start` as the start command.
4. Add these secrets in the host dashboard:

```env
NAVASAN_API_KEY=your_navasan_key
NAVASAN_CACHE_SECONDS=21600
USD_TOMAN=93250
COIN_IMAMI_TOMAN=78240000
COINGECKO_API_KEY=your_key
```

5. Set `/api/health` as the health-check path.
6. Deploy and open the generated HTTPS address.

The frontend and API are served by the same Node process, so this line in
`app.js` works locally and in production without changing the domain:

```js
fetch("/api/markets")
```

You can connect a custom domain to the same web service after deployment.
Never upload `.env`; it is excluded through `.gitignore`.

## Navasan live Iranian prices

Get an API key from Navasan and place it only in `.env`:

```env
NAVASAN_API_KEY=your_real_key
NAVASAN_CACHE_SECONDS=21600
NAVASAN_VALUE_DIVISOR=1
NAVASAN_COIN_MULTIPLIER=1000
```

Restart the server after changing `.env`. The backend requests Navasan's
`/latest/` endpoint and maps these fields automatically:

- `usd_sell` → US dollar
- `eur` or `eur_sell` → Euro
- `aed_sell` or `dirham_dubai` → UAE dirham
- `18ayar` → 18K gold
- `sekkeh` → Imam coin

Navasan's free plan is limited, so the default independent provider cache is
six hours. If your paid plan permits frequent calls, set
`NAVASAN_CACHE_SECONDS=60`.

Check one returned USD value against Navasan's dashboard. If your response is
in Rial while the UI is in Toman, set `NAVASAN_VALUE_DIVISOR=10`.
The `sekkeh` field is normalized from thousands of Toman with
`NAVASAN_COIN_MULTIPLIER=1000`.

## Data flow

```text
Browser dashboard
       |
       v
GET /api/markets
       |
       +-- CoinGecko: BTC and ETH in USD
       +-- Frankfurter: official EUR/AED cross-rates
       +-- Gold API: XAU/USD spot price
       +-- .env: domestic open-market USD/Toman and Imam Coin
       |
       v
Cached normalized JSON (60 seconds)
```

The server keeps provider credentials away from browser source, adds timeouts,
normalizes differing response formats, and returns fallback values when an
upstream provider is temporarily unavailable.

## Connect an Iranian market-data API

In `server.mjs`, add a provider function:

```js
async function getIranMarket() {
  return fetchJson("https://provider.example/v1/latest", {
    headers: { Authorization: `Bearer ${process.env.IRAN_MARKET_API_KEY}` }
  });
}
```

Call it inside `buildMarkets()`, then replace `USD_TOMAN`,
`COIN_PRICE`, and the derived gold estimate with the fields returned by your
provider. Put the key in `.env`, never in `app.js` or `index.html`.

The provider should ideally return licensed free-market USD/Toman, 18K gold,
Imam Coin, daily change, high, low, and a source timestamp.

## API endpoints

- `GET /api/health` — server status
- `GET /api/markets` — normalized market snapshot

Example asset:

```json
{
  "id": "bitcoin",
  "title": "بیت‌کوین",
  "price": 61843,
  "change": 1.64,
  "low": 61348,
  "high": 62337,
  "source": "CoinGecko",
  "unit": "USD"
}
```
