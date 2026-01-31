@echo off
REM Aninag Quick Setup Script for Windows
REM Resets database and seeds demo data

echo.
echo 🎨 Aninag Database Reset ^& Seed
echo ================================
echo.

REM Check if running in project root
if not exist "artisan" (
    echo ❌ Error: Please run this script from the project root directory
    exit /b 1
)

REM Confirm action
set /p confirm="This will reset your database. Continue? (y/N): "
if /i not "%confirm%"=="y" (
    echo Cancelled.
    exit /b 0
)

echo 🗄️  Resetting database...
php artisan migrate:fresh

echo 🌱 Seeding demo data...
php artisan db:seed

echo.
echo ✅ Done!
echo.
echo Demo data created:
echo   - 1 Gallery (Artisan Contemporary Gallery)
echo   - 6 Artists (Filipino contemporary artists)
echo   - 12 Artworks (various mediums)
echo.
echo Visit http://localhost:8000 to see your catalog!
echo.
