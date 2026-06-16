const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const requiredFiles = [
  { pkg: 'electron', file: 'node_modules/electron/dist/electron.exe' },
  { pkg: 'app-builder-bin', file: 'node_modules/app-builder-bin/win/x64/app-builder.exe' },
  { pkg: 'rcedit', file: 'node_modules/rcedit/bin/rcedit.exe' },
  { pkg: 'app-builder-bin', file: 'node_modules/builder-util/node_modules/app-builder-bin/win/x64/app-builder.exe', optional: true }
];

console.log('🔍 Verifying required build dependencies...\n');

let needsReinstall = [];

for (const item of requiredFiles) {
  const fullPath = path.join(__dirname, '..', item.file);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${item.pkg}: OK`);
  } else {
    console.log(`❌ ${item.pkg}: MISSING (${item.file})`);
    needsReinstall.push(item.pkg);
  }
}

if (needsReinstall.length > 0) {
  console.log('\n🔧 Reinstalling missing packages...\n');
  
  for (const pkg of needsReinstall) {
    console.log(`📦 Reinstalling ${pkg}...`);
    try {
      // Remove the package folder first
      const pkgPath = path.join(__dirname, '..', 'node_modules', pkg);
      if (fs.existsSync(pkgPath)) {
        fs.rmSync(pkgPath, { recursive: true, force: true });
      }
      // Reinstall
      execSync(`npm install ${pkg} --save-dev`, { 
        stdio: 'inherit',
        cwd: path.join(__dirname, '..')
      });
      console.log(`✅ ${pkg} reinstalled successfully\n`);
    } catch (err) {
      console.error(`❌ Failed to reinstall ${pkg}: ${err.message}`);
      process.exit(1);
    }
  }
  
  // Verify again
  console.log('\n🔍 Verifying after reinstall...\n');
  let stillMissing = false;
  for (const item of requiredFiles) {
    const fullPath = path.join(__dirname, '..', item.file);
    if (fs.existsSync(fullPath)) {
      console.log(`✅ ${item.pkg}: OK`);
    } else {
      console.log(`❌ ${item.pkg}: STILL MISSING`);
      stillMissing = true;
    }
  }
  
  if (stillMissing) {
    console.error('\n❌ Some files are still missing. Check your antivirus settings.');
    process.exit(1);
  }
}

console.log('\n✅ All build dependencies verified!\n');
