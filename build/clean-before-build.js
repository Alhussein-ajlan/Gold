const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(__dirname, '../../GoldBuild/win-unpacked');

function sleep(ms) {
    const end = Date.now() + ms;
    while (Date.now() < end) {}
}

console.log('Cleaning before build...');

// Kill all processes that might lock build files
const processesToKill = [
    'electron.exe',
    'mt5_bridge.exe',
    'المحاسب الذكي BenAjlan.exe'
];

console.log('Killing processes that might lock build files...');
processesToKill.forEach(proc => {
    try {
        execSync(`taskkill /F /IM "${proc}" /T`, { stdio: 'ignore' });
    } catch (e) {}
});

// Also kill any process using the build folder
try {
    execSync(`taskkill /F /FI "MODULES eq app.asar" /T`, { stdio: 'ignore' });
} catch (e) {}

// Wait for processes to terminate
sleep(3000);

// Try to unlock files using handle (if available)
try {
    execSync(`powershell -Command "Get-Process | Where-Object {$_.Path -like '*GoldBuild*'} | Stop-Process -Force"`, { stdio: 'ignore' });
} catch (e) {}

// Delete build folder
if (fs.existsSync(buildDir)) {
    console.log('Deleting build folder...');
    try {
        fs.rmSync(buildDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 1000 });
        console.log('Build folder deleted');
    } catch (e) {
        console.log('Warning: Could not fully clean build folder:', e.message);
    }
}

console.log('Cleanup complete!');
