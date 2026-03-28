# CLAUDE.md

## WHAT (Project Overview)

Sol & Bad is a web application that helps users quickly find sunny swimming spots nearby.

Tech stack:

- Next.js (frontend + server components)
- Google Maps API (maps & directions)
- Weather API (e.g. OpenWeather)
- shadcn/ui (UI components)

Core features:

- Map with user location
- Nearby swimming spots
- Weather-based recommendations
- Route planning (car, walking, cycling, public transport)

---

## WHY (Purpose)

The goal is to reduce decision time for spontaneous outdoor activities.

The app answers:
"Where can I go right now to enjoy sun and swimming nearby?"

It prioritizes:

- Proximity
- Weather conditions
- Ease of travel

---

## HOW (Working in this repo)

General principles:

- Prefer simple, minimal solutions
- Follow existing patterns in the codebase
- Use shadcn/ui components for UI when possible
- Do not introduce unnecessary abstractions

Before making changes:

1. Search for existing implementations
2. Reuse components where possible

After making changes:

- Ensure the app builds and runs
- Verify map and geolocation still work
- Check that API calls return expected data

---

## PROJECT STRUCTURE (high-level)

- `/app` – Next.js app router pages
- `/components` – reusable UI components (including shadcn)
- `/lib` – API and utility functions
- `/styles` – styling

---

## EXTERNAL DEPENDENCIES

- Google Maps API (maps + directions)
- Weather API (location-based forecasts)

---

## NOTES

- The app relies on geolocation (browser permission required)
- API limits may affect functionality
- Internet connection is required

---

## ADDITIONAL DOCS

For more detailed tasks, see:

- `docs/api.md` – API usage
- `docs/features.md` – feature details
- `docs/dev.md` – development workflow

Only read these if relevant to the current task.
