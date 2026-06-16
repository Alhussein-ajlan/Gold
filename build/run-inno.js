const { execSync } = require('child_process');
const path = require('path');

const innoPath = 'C:\\Program Files (x86)\\Inno Setup 6\\ISCC.exe';
const issFile = path.join(__dirname, 'installer.iss');
const packageJson = require(path.join(__dirname, '..', 'package.json'));
const appVersion = packageJson.version;

try {
    console.log('Running Inno Setup...');
    execSync(`"${innoPath}" "/DMyAppVersion=${appVersion}" "${issFile}"`, { stdio: 'inherit' });
    console.log('✅ Inno Setup completed successfully!');
} catch (err) {
    console.error('❌ Inno Setup failed:', err.message);
    process.exit(1);
}
