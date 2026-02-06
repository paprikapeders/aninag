FROM php:8.3-fpm

WORKDIR /var/www

# System dependencies
RUN apt-get update && apt-get install -y git curl zip unzip libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring bcmath gd \
    && rm -rf /var/lib/apt/lists/*

# Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy composer files first for better layer caching
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --optimize-autoloader

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy .env for Vite build (only VITE_ vars are exposed to client)
COPY .env* ./

# Copy application files
COPY . .

# Explicitly copy scrapper data (in case .dockerignore blocks it)
COPY scrapper/storage /var/www/scrapper/storage

# Complete composer installation
RUN composer dump-autoload --optimize --no-dev

# Build frontend assets (Vite will read .env.production)
RUN npm run build

# Clean up dev dependencies after build
RUN npm prune --production

# Create necessary directories and set permissions
RUN mkdir -p storage/logs storage/framework/sessions storage/framework/views storage/framework/cache \
    && chown -R www-data:www-data /var/www \
    && chmod -R 775 storage bootstrap/cache

# Expose PHP-FPM port
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
