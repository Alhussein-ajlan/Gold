@echo off
echo ================================================
echo    Building BenAjlan Smart Accounting System
echo ================================================
echo.

echo [1/4] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b %errorlevel%
)
echo.

echo [2/4] Building application...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed!
    pause
    exit /b %errorlevel%
)
echo.

echo [3/4] Creating installer with Inno Setup...
call npm run build:inno
if %errorlevel% neq 0 (
    echo ERROR: Inno Setup compilation failed!
    echo Make sure Inno Setup is installed and iscc.exe is in PATH
    pause
    exit /b %errorlevel%
)
echo.

echo [4/4] Build completed successfully!
echo.
echo Output location: ..\GoldNew\BenAjlan-Setup-3.2.4.exe
echo.
echo ================================================
echo                Build Complete!
echo ================================================
pause
