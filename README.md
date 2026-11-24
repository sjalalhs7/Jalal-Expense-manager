# Jalal Expense Manager

A mobile-friendly, offline-first expense tracker with income records, budgets, reports, JSON backup/restore, and an Android WebView app.

## Android build

- Application ID: `com.jalal.expensemanager` (keep this unchanged after first Play publication).
- Minimum Android: API 23 (Android 6.0).
- Compile / target API: 36 (Android 16), required for new Play submissions from 31 August 2026.
- Version: `1.1.0` / versionCode `3`.
- Android Gradle Plugin: 8.9.1; Gradle: 8.11.1; JDK: 17.
- GitHub Actions builds a debug APK for device testing and a release Android App Bundle (AAB).
- The debug APK is for testing only. The Play release AAB must be signed with a persistent upload key and uploaded through a Play Console app enrolled in Play App Signing.

## Configure the Play upload key

Create a dedicated upload keystore and keep a secure offline backup. Do not commit the keystore or passwords to this repository. Add these four GitHub Actions repository secrets:

- `ANDROID_KEYSTORE_BASE64`: base64-encoded upload keystore file.
- `ANDROID_KEYSTORE_PASSWORD`: keystore password.
- `ANDROID_KEY_ALIAS`: upload key alias.
- `ANDROID_KEY_PASSWORD`: upload key password.

Until these secrets are configured, CI deliberately labels the AAB as unsigned. An unsigned AAB is not ready for Play Console upload. Google Play App Signing should be enabled when creating the app in Play Console; Google then manages the app-signing key and the developer signs uploads with the upload key.

## Web / PWA

The website entry point is `index.html`. It uses browser local storage and does not require a backend. The Progressive Web App manifest is `manifest.webmanifest`.

## Data, privacy and limitations

- Expenses, income, budgets and settings are stored locally on the current device. The Android manifest does not request internet access and this app does not implement cloud sync, analytics or advertising SDKs.
- Export JSON backups regularly. Clearing app storage or uninstalling can erase records.
- The optional PIN is stored locally and is a convenience lock only; it is not encryption and must not be described as strong data protection.
- Urdu support is partial; most labels remain English.

## Google Play publication checklist

1. Confirm the app name, icon, screenshots, short/full descriptions and support contact.
2. Publish a public privacy policy URL and complete the Play Console Data safety form accurately.
3. Complete the app content declarations, content rating questionnaire, target audience and ads declaration.
4. Configure the upload-key secrets above and verify that CI produces a signed AAB.
5. Enroll in Play App Signing and upload the AAB to internal testing.
6. Test on real Android devices, including Android 13 and newer; fix issues before closed testing.
7. For personal developer accounts created after 13 November 2023, complete the required closed test with at least 12 opted-in testers continuously for 14 days before applying for production access.

Passing CI is not a guarantee of Play policy approval. Play Console review and publication must be completed by the account owner.

## Validation

GitHub Actions runs repository validation and builds the Android debug APK plus Play release bundle. CI validation does not replace physical-device testing or Play Console review.
