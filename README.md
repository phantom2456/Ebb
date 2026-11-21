# Ebb

A drink-moderation app for iPhone, built as a single-file web app. Lotl the axolotl lives in a little tank that is your week: clear and glowing under plan, cloudy coral past it.

## Files

- `index.html` is the whole app: HTML, CSS and JavaScript, no build step.
- `manifest.webmanifest`, `sw.js`, `icon-*.png` are only used when you host it yourself (full-screen, offline home-screen app).

## Where it runs today

It is published as a private claude.ai page. On claude.ai it saves data to your own private storage on the page (`data/users/<your id>/`), which nobody else can read, so it syncs between your iPhone and Mac. It also keeps a copy in the browser's localStorage.

Opened anywhere else (a local file or your own host), it runs fully offline and saves only to localStorage on that device. Use Plan > Back up or move data to copy your data between the two.

## Run it on your Mac

```
cd ebb
python3 -m http.server 8080
```

Then open http://localhost:8080. Any static server works.

## Host it yourself (true full-screen iPhone app, works offline)

Any static host works: GitHub Pages, Netlify, Vercel or Cloudflare Pages. Upload the folder as-is, open the https URL in Safari on your iPhone, then Share > Add to Home Screen. The service worker caches it for offline use. Data then lives on the phone only, so export a backup now and then.

## How it works

- **Standard drinks** = ml × ABV × 0.789 / 14 (US definition: 14 g of alcohol).
- **Day boundary** is 5 AM, so a 1 AM drink counts toward the night before. Weeks start Monday.
- **Friction:** a drink that breaks a planned dry day, tonight's plan, your pace, your daily limit or your weekly limit opens a pause sheet: ride it out (90-second breathing), swap for water, or hold the button for 1.4 seconds to log it anyway.
- **Tone:** Gentle or Blunt. Both show the same numbers; neither attacks the person, because shame predicts more drinking, not less.
- **Night out:** set drinks for tonight, minutes between rounds, and water between rounds. Logging uses bar prices while a night is on.
- **Data model** (`S` in the script): `settings`, `custom` drinks, `drinks`, `events` (urges ridden out, swaps), `nights`. Every record has an id and an update time `u`; deletes are tombstones, and merging takes the newer record per id. On claude.ai it is stored as one `main` document plus one document per month (`m2026-11`).

## Moving to native SwiftUI later

The logic maps cleanly:

- `stdOf`, `stats()`, `friction()`, `mood()` are pure functions; port them to a Swift `struct` and test them first.
- Store drinks with SwiftData or Core Data; the record shapes above become `@Model` classes.
- What native adds: a home-screen and Lock Screen widget showing the week and Lotl, real local notifications (for example a check-in at 9 PM on planned dry days), Live Activities for a night out with the pace countdown, and optional HealthKit export.
- Import your history by pasting the JSON backup from Plan > Back up or move data.
- Lotl is an SVG in `lotl(mood)`; rebuild it in SwiftUI `Path`s or export the SVG to an asset.

## Not built yet

Reminders or notifications (web pages on claude.ai can't send them), widgets, and sharing with a friend.
