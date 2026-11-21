# Jalal Expense Manager

A mobile-friendly, offline-first expense tracker with income records, budgets, reports, JSON backup/restore, and an Android WebView source project.

## Web / PWA

The website entry point is `index.html`. It uses browser local storage and does not require a backend. The Progressive Web App manifest is `manifest.webmanifest`; icons and brand artwork are in `assets/`.

Serve the repository over HTTPS (for example, GitHub Pages) to enable PWA installation and service-worker offline caching. Opening the HTML as a local file does not enable service workers.

## Android source

Open the `android/` directory in Android Studio. Use JDK 17 and install Android SDK Platform 35 when prompted. Android Studio can create/sync the Gradle wrapper. The Android project loads the same web app from `android/app/src/main/assets/index.html`.

This repository contains Android source code, not a built or signed APK. APK compilation and physical-device testing are still required before release.

## Data, privacy and limitations

- Expenses and income are stored locally on the current browser/device; no cloud sync is implemented.
- Export JSON backups regularly. Clearing browser/app storage or uninstalling can erase records.
- The optional PIN is a convenience lock, not encryption.
- Urdu support is partial: the current language toggle changes direction and greeting, while most labels remain English.

## Validation

A GitHub Actions workflow runs `node scripts/validate.mjs` on pushes and pull requests to `main`. It checks required files, PWA icon references, manifest JSON and JavaScript syntax. It does not replace browser testing or Android compilation.
