const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const packageJson = require(path.join(__dirname, '..', 'package.json'));
const manifestVersion = `${packageJson.version}.0`;

// Path to the executable
const exePath = path.join(__dirname, '..', '..', 'GoldBuild', 'win-unpacked', 'المحاسب الذكي BenAjlan.exe');
const manifestPath = path.join(__dirname, '..', '..', 'GoldBuild', 'win-unpacked', 'المحاسب الذكي BenAjlan.exe.manifest');

console.log('Setting execution level to requireAdministrator...');
console.log('Exe path:', exePath);

// Create manifest file content
const manifestContent = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<assembly xmlns="urn:schemas-microsoft-com:asm.v1" manifestVersion="1.0">
  <assemblyIdentity
    version="${manifestVersion}"
    processorArchitecture="amd64"
    name="BenAjlan.SmartAccounting"
    type="win32"
  />
  <description>BenAjlan Smart Accounting System</description>
  <trustInfo xmlns="urn:schemas-microsoft-com:asm.v3">
    <security>
      <requestedPrivileges>
        <requestedExecutionLevel level="requireAdministrator" uiAccess="false"/>
      </requestedPrivileges>
    </security>
  </trustInfo>
</assembly>`;

try {
  // Use rcedit from node_modules to embed manifest
  const rceditPath = path.join(__dirname, '..', 'node_modules', 'rcedit', 'bin', 'rcedit.exe');
  const command = `"${rceditPath}" "${exePath}" --set-requested-execution-level requireAdministrator`;
  
  console.log('Running rcedit to embed manifest...');
  execSync(command, { stdio: 'inherit' });
  console.log('✅ Manifest embedded successfully!');
  
  // Also create external manifest file as backup
  console.log('Creating external manifest file...');
  fs.writeFileSync(manifestPath, manifestContent, 'utf8');
  console.log('✅ External manifest file created!');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
