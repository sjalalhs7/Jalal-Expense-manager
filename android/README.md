# Jalal Expense Manager — Android source

This is an Android Studio source project wrapping the existing web app in a WebView.

## Open
Open this `android/` directory in Android Studio. Use JDK 17 and install Android SDK Platform 35 when prompted. Android Studio can generate/sync the Gradle wrapper for the project.

## Included
- App ID: `com.jalal.expensemanager`
- Minimum Android: API 23
- Target/compile SDK: 35
- Offline local HTML app at `app/src/main/assets/index.html`
- Backup export/import through Android document picker

## Data and privacy
Records remain in WebView local storage on this device. They are not uploaded to a server. Export JSON backups regularly. The optional app PIN is not encryption.

## Verification status
GitHub Actions builds `app-debug.apk` on Android source changes. Download the `Jalal-Expense-Manager-debug-apk` artifact from a successful **Build Android APK** run. This is a debug APK for testing, not a production-signed release. Physical-device testing is still required.
