# Jalal Expense Manager

A mobile-first, offline-capable personal expense tracker branded with the supplied Jalal logo and icon.

## Features
- Add, edit and delete expense records (PKR)
- Record and delete income
- Today, current-week, selected-month and selected-year summaries
- Daily, weekly, monthly and yearly reports with category breakdowns and charts
- Monthly budget, budget progress and net balance (income minus expenses)
- Search and filter expenses by category and month
- JSON backup and restore
- Optional 4–8 digit PIN convenience lock
- English / Urdu direction toggle
- PWA manifest and service worker for offline use after first load
- Android Studio WebView wrapper with local backup export/import support

## Run as a web app
Open `index.html` in a browser. For install/offline PWA behavior, serve the folder over HTTPS or localhost, then use the browser's **Install app** / **Add to Home Screen** option. GitHub Pages can host this static project.

## Android Studio project
Open the `android/` folder in Android Studio, allow Gradle sync, then select **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
- Package: `com.jalal.expensemanager`
- Minimum Android: API 23
- Compile SDK: 35
- App launcher icon: supplied Jalal Expense Manager artwork

Android Studio may need Android SDK 35 and a compatible Gradle JDK. The wrapper loads the bundled `index.html` from app assets and stores data locally on the device.

## Privacy and data safety
All expense and income records are stored locally in browser/app storage. No account or cloud server is used. Export JSON backups regularly. Clearing browser/app storage or uninstalling the Android app can erase local records. The PIN is a convenience lock, not encryption; do not treat it as bank-grade security. Keep backups in a secure location.

## Project structure
- `index.html` — app interface and logic
- `assets/` — supplied brand artwork and PWA icons
- `manifest.webmanifest` — PWA metadata
- `service-worker.js` — offline app-shell cache
- `android/` — Android Studio WebView project
