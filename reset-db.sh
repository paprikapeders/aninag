#!/usr/bin/env bash

# Aninag Quick Setup Script
# Resets database and seeds demo data

echo "🎨 Aninag Database Reset & Seed"
echo "================================"
echo ""

# Check if running in project root
if [ ! -f "artisan" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Confirm action
read -p "This will reset your database. Continue? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

echo "🗄️  Resetting database..."
php artisan migrate:fresh

echo "🌱 Seeding demo data..."
php artisan db:seed

echo ""
echo "✅ Done!"
echo ""
echo "Demo data created:"
echo "  - 1 Gallery (Artisan Contemporary Gallery)"
echo "  - 6 Artists (Filipino contemporary artists)"
echo "  - 12 Artworks (various mediums)"
echo ""
echo "Visit http://localhost:8000 to see your catalog!"
echo ""
