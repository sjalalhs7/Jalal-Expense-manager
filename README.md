# Jalal Expense Manager

A mobile-first personal expense tracker. The web app stores records locally in the current browser/device; it does not require an account or backend. Currency is PKR (Rs.).

## Features present in this package

- Add, edit and delete expense records; add and remove income records
- Today, current-week, selected-month and selected-year summaries
- Daily, weekly, monthly and yearly reports with category breakdowns and charts
- Monthly budget, budget progress and net balance
- Search and filter expenses by category and month
- JSON backup and restore
- Optional 4–8 digit PIN convenience lock
- English interface; Urdu option currently changes layout direction (RTL) and welcome greeting only. Most labels and report text remain English.
- PWA manifest and service worker for offline use after the first successful load
- Android Studio WebView source project with JSON backup export/import bridge

## Publish the web app with GitHub Pages

1. Upload the contents of this folder to the root of your GitHub repository (keep `index.html`, `assets/`, `manifest.webmanifest` and `service-worker.js` together).
2. In GitHub, open **Settings → Pages**.
3. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Open the published HTTPS site on your phone. Use the browser menu → **Add to Home screen** / **Install app**.

For local testing, serve this folder over localhost. Opening `index.html` directly with `file://` does not enable PWA installation or service-worker caching.

## Android Studio source

Open the `android/` folder in Android Studio. The project is configured with:

- Application ID: `com.jalal.expensemanager`
- Minimum Android: API 23
- Compile / target SDK: 35
- Android Gradle Plugin: 8.7.3

Install Android SDK 35 and use a compatible JDK (17 recommended by the Android Gradle Plugin). A Gradle wrapper is not included; use Android Studio's installed Gradle support or add a wrapper from a compatible Gradle installation. Then choose **Build → Build Bundle(s) / APK(s) → Build APK(s)**. This ZIP contains source code, **not a prebuilt APK**.

## Data and security notes

- Expense, income, budget and settings data are stored locally. Clearing app/site storage or uninstalling the Android app can erase records.
- Export JSON backups regularly. Restoring a backup replaces current app data.
- The PIN is stored locally as a convenience lock; it is **not encryption**.
- The app does not sync records between devices.

## Project structure

- `index.html` — web app interface and logic
- `assets/` — PWA icons and supplied brand artwork
- `manifest.webmanifest` — install metadata
- `service-worker.js` — offline app-shell cache
- `android/` — Android Studio WebView project
- `TEST-REPORT.md` — checks performed and limitations
