# Static validation report

Checks performed while preparing this package:

- JavaScript syntax checked with Node.js `--check`.
- PWA manifest parsed as valid JSON.
- Android manifest parsed as valid XML.
- Web app and Android bundled `index.html` checked for byte-for-byte equality.
- Required PWA assets referenced by the service worker checked for existence.
- ZIP archive integrity checked after packaging.

Not verified in this environment:

- Full interactive browser testing across desktop/mobile browsers.
- Live GitHub Pages deployment and install/offline behavior on a physical phone.
- Android Gradle sync, emulator/device execution, or APK compilation. No APK is included.

Known product limitations:

- Urdu mode currently provides RTL layout and a translated welcome greeting; most interface strings remain English.
- PIN is a local convenience lock, not encryption.
- Data remains on the current device/browser unless the user exports and manually transfers a backup.
