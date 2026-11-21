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
- **Night out:** set drinks for tonight, minutes between rounds, and water between rounds.
- **Calories:** shown per drink, for today, for the week, in the pause sheet, and as calories avoided against your usual week. No money figures anywhere.
- **Liver tab:** an illustrated liver driven by the 4 weeks up to your last drink (weekly average and days over the NIAAA daily line; your usual week fills in days before you started). It fades back as alcohol-free days build toward 42 (fatty liver usually clears in 4 to 6 weeks without alcohol if there's no scarring). A "What if" slider previews more dry days. Men's or women's NIAAA lines. It's labelled as an illustration, not a diagnosis.
- **THC drinks:** logged in mg (`kind:'thc'`, `mg`), shown in the day log, history and a weekly THC total, but excluded from standard drinks, limits, dry days and the liver view (`D()` is alcohol only; `TH()` is THC only).
- **Home:** most of the screen is Lotl's tank. Lotl idles, blinks and swims, and does small random things (chases a bubble, flips, naps, waves). Tap Lotl for a reaction. The water tints as the week fills, and Lotl gets slower and sleepier when you're over. Dry days, streak milestones and an under-plan week get a small celebration once. Everything respects Reduce Motion.
- **Logging and editing:** one horizontal row of drinks sorted by how often you use them, plus "All". Every logged drink has a pencil; tap to edit (with Half, − and + for size), swipe left to delete with undo.
- **Clear drink log:** in Plan, hold to clear logged drinks, nights and urges while keeping your plan, limits, custom drinks and settings.
- **Updates:** the service worker fetches pages fresh when online and only falls back to the cache offline, so a new push shows up on the next open.
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
