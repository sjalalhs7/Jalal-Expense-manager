import { readFileSync, existsSync, writeFileSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const required = [
  'index.html',
  'manifest.webmanifest',
  'service-worker.js',
  'assets/icon-192.png',
  'assets/icon-512.png',
  'assets/brand-logo.png',
  'android/settings.gradle',
  'android/app/build.gradle',
  'android/app/src/main/AndroidManifest.xml',
  'android/app/src/main/java/com/jalal/expensemanager/MainActivity.java',
  'android/app/src/main/assets/index.html'
];
const missing = required.filter(path => !existsSync(path));
if (missing.length) {
  console.error('Missing required files:', missing.join(', '));
  process.exit(1);
}

const manifest = JSON.parse(readFileSync('manifest.webmanifest', 'utf8'));
for (const icon of manifest.icons ?? []) {
  if (!existsSync(icon.src.replace(/^\.\//, ''))) {
    throw new Error('Manifest icon is missing: ' + icon.src);
  }
}

const html = readFileSync('index.html', 'utf8');
const androidHtml = readFileSync('android/app/src/main/assets/index.html', 'utf8');
if (androidHtml !== html) {
  throw new Error('Android bundled app is out of sync with the root web app.');
}
for (const marker of ['function validExpense(', 'function validIncome(', 'function validDate(', '!x.expenses.every(validExpense)', '!x.income.every(validIncome)']) {
  if (!html.includes(marker)) throw new Error('Missing data validation safeguard: ' + marker);
}
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/gi)];
if (!scripts.length) throw new Error('No inline application script found.');
for (let i = 0; i < scripts.length; i++) {
  const temp = `.validate-inline-${i}.js`;
  writeFileSync(temp, scripts[i][1]);
  try {
    execFileSync(process.execPath, ['--check', temp], { stdio: 'inherit' });
  } finally {
    unlinkSync(temp);
  }
}
execFileSync(process.execPath, ['--check', 'service-worker.js'], { stdio: 'inherit' });
console.log('Validation passed: required files, PWA icons, manifest JSON, synchronized Android app, data-import safeguards and JavaScript syntax.');
