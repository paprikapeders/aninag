@echo off
REM Aninag Notion Sync - Quick Start for Windows

echo.
echo 🎨 Aninag Notion Public Sync
echo ============================
echo.

REM Check if .env exists
if not exist ".env" (
    echo ❌ .env file not found
    echo Please copy .env.example to .env first
    echo.
    pause
    exit /b 1
)

echo Step 1: Testing Notion connection...
echo.
php test-notion-connection.php

if errorlevel 1 (
    echo.
    echo ❌ Connection test failed
    echo Please check your PUBLIC_NOTION_URL in .env
    echo.
    pause
    exit /b 1
)

echo.
echo Step 2: Syncing artworks from Notion...
echo.
php artisan aninag:sync-notion --public

if errorlevel 1 (
    echo.
    echo ❌ Sync failed
    echo Check the error message above
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Sync completed successfully!
echo.
echo Your artworks are now available at:
echo http://localhost:8000
echo.
echo To view the catalog:
echo http://localhost:8000/catalog
echo.
pause
