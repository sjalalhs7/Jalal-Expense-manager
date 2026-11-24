# Android release notes

This Android Studio project wraps the existing offline-first expense app in a WebView.

- Package: `com.jalal.expensemanager`
- minSdk 23; targetSdk / compileSdk 36
- Release version 1.1.0 (versionCode 3)
- Uses JDK 17, Gradle 8.11.1 and Android Gradle Plugin 8.9.1.

## Privacy

Expense records stay in WebView local storage on the device. No internet permission, cloud sync, analytics or ad SDK is included. Export JSON backups regularly. The optional PIN is stored locally and is only a convenience lock, not encryption.

## Play Store signing

The debug APK is only for sideload testing. The release AAB must be signed with a persistent upload key. Store that key outside Git and configure the four GitHub Actions secrets documented in the root README. Enroll the app in Google Play App Signing in Play Console.
