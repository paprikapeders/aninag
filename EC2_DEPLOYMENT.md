# AWS EC2 Deployment Guide

## Quick Checklist

- [ ] EC2 instance launched with proper security groups
- [ ] Docker and Docker Compose installed
- [ ] Repository cloned to EC2
- [ ] `.env` file configured with production settings
- [ ] Database passwords updated in `.env` and `docker-compose.prod.yml`
- [ ] Application built and running with `docker-compose.prod.yml`
- [ ] Database migrations executed
- [ ] Application accessible on port 80
- [ ] SSL certificate configured (recommended)
- [ ] Backup strategy implemented

## Prerequisites

- EC2 instance running Amazon Linux 2023 or Ubuntu 22.04
- Docker and Docker Compose installed on EC2
- Security group allowing inbound traffic on port 80 (HTTP) and 443 (HTTPS)
- SSH access to your EC2 instance

## Important Notes

- **Development vs Production**: 
  - `docker-compose.yml` is for local development with hot-reload and exposed ports
  - `docker-compose.prod.yml` is for production with optimized settings and security
- **Database Security**: Production config does NOT expose database port 3306 externally
- **Built Images**: Production uses built Docker images (no local volume mounts)

## Installation Steps

### 1. Install Docker and Docker Compose on EC2

**For Amazon Linux 2023:**
```bash
sudo yum update -y
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Log out and log back in for group changes to take effect
```

**For Ubuntu:**
```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-v2
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ubuntu
```

### 2. Clone Your Repository

```bash
cd /home/ec2-user  # or /home/ubuntu for Ubuntu
git clone <your-repository-url> chammy
cd chammy
```

### 3. Configure Environment

```bash
# Copy and edit environment file
cp .env.example .env
nano .env
```

**Important environment variables to update:**
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=http://your-ec2-public-ip-or-domain
APP_KEY=  # Generate this in step 4

# Database (leave as is for containerized DB)
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=<change-to-secure-password>

# Update MySQL root password in docker-compose.yml as well
```

### 4. Generate Application Key

```bash
# Temporarily create a container to generate key
docker run --rm -v $(pwd):/app -w /app php:8.3-cli php -r "echo 'base64:' . base64_encode(random_bytes(32)) . PHP_EOL;"

# Copy the output and add it to .env as APP_KEY
```

### 5. Update docker-compose.yml for Production

Edit the MySQL password in `docker-compose.yml`:
```yaml
db:
  environment:
    MYSQL_DATABASE: laravel
    MYSQL_USER: laravel
    MYSQL_PASSWORD: <your-secure-password>  # Match with .env
    MYSQL_ROOT_PASSWORD: <your-secure-root-password>
```

### 6. Build and Start Containers

```bash
# Build the application image (using production compose file)
docker-compose -f docker-compose.prod.yml build --no-cache

# Start all services
docker-compose -f docker-compose.prod.yml up -d

# Check if containers are running
docker-compose -f docker-compose.prod.yml ps
```

### 7. Run Database Migrations

```bash
# Run migrations
docker-compose -f docker-compose.prod.yml exec app php artisan migrate --force

# (Optional) Seed database
docker-compose -f docker-compose.prod.yml exec app php artisan db:seed --force

# Clear and cache config
docker-compose -f docker-compose.prod.yml exec app php artisan config:cache
docker-compose -f docker-compose.prod.yml exec app php artisan route:cache
docker-compose -f docker-compose.prod.yml exec app php artisan view:cache
```

### 8. Set Up Storage Links

```bash
docker-compose -f docker-compose.prod.yml exec app php artisan storage:link
```

### 9. Configure EC2 Security Group

In AWS Console:
1. Go to EC2 → Security Groups
2. Select your instance's security group
3. Add inbound rules:
   - Type: HTTP, Protocol: TCP, Port: 80, Source: 0.0.0.0/0
   - Type: HTTPS, Protocol: TCP, Port: 443, Source: 0.0.0.0/0 (for future SSL)

### 10. Access Your Application

Open browser and navigate to:
```
http://your-ec2-public-ip
```

## Deployment Updates

When you push updates to your repository:

```bash
cd /home/ec2-user/chammy
git pull origin main

# Rebuild and restart containers
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# Run migrations if needed
docker-compose -f docker-compose.prod.yml exec app php artisan migrate --force

# Clear caches
docker-compose -f docker-compose.prod.yml exec app php artisan config:cache
docker-compose -f docker-compose.prod.yml exec app php artisan route:cache
docker-compose -f docker-compose.prod.yml exec app php artisan view:cache
```

## Useful Commands

```bash
# View logs
docker-compose -f docker-compose.prod.yml logs -f app
docker-compose -f docker-compose.prod.yml logs -f web
docker-compose -f docker-compose.prod.yml logs -f db

# Restart services
docker-compose -f docker-compose.prod.yml restart

# Stop services
docker-compose -f docker-compose.prod.yml down

# Access app container shell
docker-compose -f docker-compose.prod.yml exec app bash

# Access database
docker-compose -f docker-compose.prod.yml exec db mysql -u laravel -p laravel

# Backup database
docker-compose -f docker-compose.prod.yml exec db mysqldump -u root -p laravel > backup_$(date +%Y%m%d).sql

# Restore database
docker-compose -f docker-compose.prod.yml exec -T db mysql -u root -p laravel < backup_20260206.sql
```

## SSL/HTTPS Setup (Optional but Recommended)

### Using Let's Encrypt with Certbot:

1. Install Certbot on EC2:
```bash
sudo yum install -y certbot python3-certbot-nginx  # Amazon Linux
# or
sudo apt-get install -y certbot python3-certbot-nginx  # Ubuntu
```

2. Stop nginx container temporarily:
```bash
docker-compose -f docker-compose.prod.yml stop web
```

3. Get SSL certificate:
```bash
sudo certbot certonly --standalone -d your-domain.com
```

4. Update nginx configuration to use SSL (create new config in `docker/nginx/`)

5. Mount SSL certificates in docker-compose.yml

## Monitoring

### Set up CloudWatch for monitoring:
- CPU usage
- Memory usage
- Disk usage
- Application logs

### Application health check endpoint:
Create a route in Laravel for health checks that AWS ELB can use if needed.

## Backup Strategy

1. **Database Backups**: Set up cron job for automated MySQL dumps
2. **Volume Backups**: Take EBS snapshots of the volume containing docker volumes
3. **Code Backups**: Keep your git repository up to date

## Troubleshooting

### Container won't start:
```bash
docker-compose -f docker-compose.prod.yml logs app
docker-compose -f docker-compose.prod.yml logs db
```

### Permission issues:
```bash
docker-compose -f docker-compose.prod.yml exec app chown -R www-data:www-data /var/www/storage
docker-compose -f docker-compose.prod.yml exec app chmod -R 775 /var/www/storage
```

### Database connection issues:
1. Check if db container is running: `docker-compose -f docker-compose.prod.yml ps`
2. Verify DB credentials in .env match docker-compose.prod.yml
3. Check database logs: `docker-compose -f docker-compose.prod.yml logs db`

### Port conflicts:
If port 80 is already in use, change it in docker-compose.prod.yml:
```yaml
web:
  ports:
    - "8080:80"  # Use port 8080 externally instead
```

## Security Recommendations

1. ✅ Use strong passwords for database
2. ✅ Set APP_DEBUG=false in production
3. ✅ Keep APP_KEY secret and secure
4. ❌ Don't expose database port (3310) to 0.0.0.0 - remove from docker-compose.yml
5. ✅ Set up SSL/HTTPS
6. ✅ Keep Docker and system packages updated
7. ✅ Use AWS IAM roles instead of storing credentials
8. ✅ Set up regular automated backups
9. ✅ Enable CloudWatch monitoring
10. ✅ Use AWS Secrets Manager for sensitive data

## Cost Optimization

- Use t3.micro or t3.small for small applications (eligible for free tier)
- Set up CloudWatch alarms for unusual activity
- Use EBS gp3 volumes for better price/performance
- Consider Reserved Instances for long-term deployments
