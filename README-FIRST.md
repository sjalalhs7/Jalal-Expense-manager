# Jalal Expense Manager — repair package

This is an **overlay/repair package** for the existing repository:
https://github.com/sjalalhs7/Jalal-Expense-manager

Do not delete the existing repository files. Extract this ZIP and upload/merge its folders and files into the repository root, preserving the paths shown here.

## What this package fixes
- Restores the standard Android Studio project directory layout.
- Corrects the Android launcher icon resource reference.
- Keeps the existing web app and brand files intact.
- Provides the PWA `assets/` folder location expected by the current `index.html`, `manifest.webmanifest`, and `service-worker.js`.

## Two existing-file copies are still required
The repository already contains these original image files in its root:
- `icon-192.png`
- `icon-512.png`
- `brand-logo.png`

Copy them (do not move or delete the originals) into:
- `assets/icon-192.png`
- `assets/icon-512.png`
- `assets/brand-logo.png`

Also copy the existing root `index.html` into:
- `android/app/src/main/assets/index.html`

For the Android WebView, copy the three original PNGs into:
- `android/app/src/main/assets/assets/icon-192.png`
- `android/app/src/main/assets/assets/icon-512.png`
- `android/app/src/main/assets/assets/brand-logo.png`

These copies are necessary because this package deliberately does not replace your existing app page or logo. The Android page uses the same relative `assets/...` image paths as the web app.

## Android project
Open the `android/` folder in Android Studio. This is source code, not an APK.
- Application ID: `com.jalal.expensemanager`
- Minimum SDK: 23
- Compile/target SDK: 35
- Android Gradle Plugin: 8.7.3
- JDK 17 recommended

A Gradle wrapper is not included. Android Studio may prompt you to sync/install the required Gradle and SDK components.

## Important limitations
- The app stores records locally on the current device/browser. There is no cloud sync.
- Export backups regularly. Clearing app storage or uninstalling can erase records.
- The optional PIN is a convenience lock, not encryption.
- Urdu mode is partial; most labels remain English.
- No APK or physical-device test is included in this package.
