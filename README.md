# TinyTrip AI

A small responsive React + TypeScript + Vite portfolio MVP for planning a toddler-friendly day.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To make a production build, run `npm run build`.

## Product scope

- Landing page, parent preferences, itinerary, Find Another, and Start Over.
- Deterministic recommendations from a local TypeScript dataset. There is no chatbot or external AI API.
- No accounts, authentication, payment, notification, or backend features.
- The activities in `src/data/activities.ts` are clearly marked placeholders from the product brief. Their factual fields are intentionally `null` / unknown.
- Known budget and indoor/outdoor conflicts are filtered. Unknown costs can remain candidates because the brief only forbids known paid activities for a free budget; unknown settings are excluded when Indoor or Outdoor is selected, so they are never presented as a confirmed match. The result labels cost and other unknown details as `Unknown`.
- Activity age ranges, costs, amenities, addresses, websites, durations, verified hours, and geographic distance will need verified data before the plan can make stronger claims. The nap and day-length choices shape the itinerary text, but the MVP does not claim verified venue schedules or travel times.

## Main folders

- `src/data`: placeholder activity records
- `src/lib`: deterministic recommendation logic
- `src`: interface and responsive styles
