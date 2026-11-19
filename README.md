# Jalal Expense Manager

A mobile-first personal expense tracker branded with the supplied Jalal artwork. The web app stores records locally on the device/browser; it does not require an account or backend.

## Features

- Add, edit and delete expense records in PKR (Rs.)
- Record income and remove income entries
- Today, current-week, selected-month and selected-year summaries
- Daily, weekly, monthly and yearly reports with category breakdowns and charts
- Monthly budget, budget progress and net balance (income minus expenses)
- Search and filter expenses by category and month
- JSON backup and restore
- Optional 4–8 digit PIN convenience lock
- English interface; Urdu option currently changes the layout direction (RTL) and welcome greeting only. Most labels and report text remain English.
- PWA manifest and service worker for offline use after the first successful load
- Android Studio WebView source project with local JSON backup export/import bridge

## Run as a web app

1. Upload the **contents of this folder** to the root of your GitHub repository (so `index.html` is at the repository root).
2. In GitHub, open **Settings → Pages**.
3. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Open the published HTTPS site on your phone. Use the browser menu → **Add to Home screen** / **Install app**.

For local testing, serve this folder over localhost (for example, with VS Code Live Server). Opening `index.html` directly with `file://` does not enable PWA installation or service-worker offline caching.

## Android Studio source

Open the `android/` folder in Android Studio and allow it to configure/sync the project. The source uses:

- Application ID: `com.jalal.expensemanager`
- Minimum Android: API 23
- Compile SDK: 35
- Android Gradle Plugin: 8.7.3

Android Studio may ask to install Android SDK 35 and a compatible Gradle/JDK setup. Then use **Build → Build Bundle(s) / APK(s) → Build APK(s)**. This package contains Android source, not a prebuilt APK. A Gradle wrapper is not included, so Android Studio may ask you to configure or generate the wrapper / use a locally installed Gradle version before syncing.

## Data and security notes

- Expense, income, budget and settings data are stored in local browser/app storage. Clearing site/app storage or uninstalling the Android app can erase the records.
- Export JSON backups regularly and keep them somewhere safe. Restoring a backup replaces the current app data.
- The PIN is stored locally as a convenience lock; it is **not encryption** and is not suitable for protecting sensitive financial records from a technically capable attacker.
- The app does not sync records between devices.

## Project structure

- `index.html` — web app interface and logic
- `assets/` — logo and PWA icons
- `manifest.webmanifest` — install metadata
- `service-worker.js` — offline app-shell cache
- `android/` — Android Studio WebView source project
- `TEST-REPORT.md` — checks performed and limitations
