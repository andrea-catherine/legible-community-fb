# Deployment Guide

## Deploying to AWS CloudFront (via S3)

This guide walks through deploying the EIA Community Feedback Management application to AWS CloudFront for static hosting.

### Prerequisites

- AWS account with S3 and CloudFront access
- AWS CLI installed and configured
- Node.js 18+ installed
- Git repository set up

### Step 1: Prepare for Static Export

The application uses client-side data storage (localStorage), so it can be deployed as a static site.

Update `next.config.js` to enable static export:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
```

### Step 2: Build the Application

```bash
npm install
npm run build
```

This will create an `out/` directory containing all static files ready for deployment.

### Step 3: Create S3 Bucket

```bash
aws s3 mb s3://your-bucket-name --region us-east-1
```

Enable static website hosting:

```bash
aws s3 website s3://your-bucket-name \
  --index-document index.html \
  --error-document 404.html
```

### Step 4: Upload Files to S3

```bash
aws s3 sync out/ s3://your-bucket-name --delete
```

The `--delete` flag removes files from S3 that no longer exist in the build.

### Step 5: Set Bucket Permissions

Make the bucket publicly readable:

```bash
aws s3api put-bucket-policy --bucket your-bucket-name --policy '{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::your-bucket-name/*"
  }]
}'
```

**Note:** For CloudFront, you can skip public bucket access and use CloudFront OAI instead.

### Step 6: Create CloudFront Distribution

1. Go to AWS CloudFront Console
2. Create a new distribution
3. Configure:
   - **Origin Domain**: Your S3 bucket
   - **Origin Path**: Leave empty (or `/out` if files are in subdirectory)
   - **Default Root Object**: `index.html`
   - **Viewer Protocol Policy**: Redirect HTTP to HTTPS
   - **Compress Objects Automatically**: Yes
   - **Default Cache Behavior**: Cache based on headers
   - **Error Pages**:
     - 404 → `/404.html` with 200 status code
     - 403 → `/404.html` with 200 status code

### Step 7: Configure Custom Domain (Optional)

1. Add your custom domain in CloudFront
2. Request SSL certificate in AWS Certificate Manager (ACM)
3. Update DNS records to point to CloudFront distribution

### Step 8: Automated Deployment Script

Create a deployment script `deploy.sh`:

```bash
#!/bin/bash

BUCKET_NAME="your-bucket-name"
DISTRIBUTION_ID="your-cloudfront-distribution-id"

echo "Building application..."
npm run build

echo "Uploading to S3..."
aws s3 sync out/ s3://$BUCKET_NAME --delete

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"

echo "Deployment complete!"
```

Make it executable:

```bash
chmod +x deploy.sh
```

Run deployment:

```bash
./deploy.sh
```

## Alternative: Deploy to Vercel

Vercel is optimized for Next.js and handles builds automatically:

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically on every push

Vercel provides:
- Automatic HTTPS
- Global CDN
- Preview deployments for PRs
- Environment variables
- Custom domains

## Environment Variables

Currently, the application uses localStorage for data. For production with a backend:

1. Create `.env.local` file (don't commit)
2. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://api.example.com
   NEXT_PUBLIC_SKIPULAGSGATT_URL=https://skipulagsgatt.is
   ```

3. Update `.gitignore` to exclude `.env.local`

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to S3 and CloudFront

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Deploy to S3
        run: aws s3 sync out/ s3://${{ secrets.S3_BUCKET }} --delete
      
      - name: Invalidate CloudFront
        run: aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
```

## Security Considerations

1. **S3 Bucket**: Don't make it publicly readable if using CloudFront
2. **CloudFront OAI**: Use Origin Access Identity for better security
3. **HTTPS**: Always use HTTPS in production
4. **Environment Variables**: Never commit sensitive data
5. **CORS**: Configure CORS if using external APIs

## Performance Optimization

1. **CloudFront Cache**: Configure appropriate cache headers
2. **Compression**: Enable automatic compression in CloudFront
3. **CDN**: CloudFront provides global edge locations
4. **Image Optimization**: Consider using Next.js Image optimization (requires server)

## Monitoring

1. **CloudWatch**: Monitor CloudFront metrics
2. **S3 Logging**: Enable S3 access logging
3. **CloudFront Logging**: Enable CloudFront access logs
4. **Error Tracking**: Consider adding error tracking (Sentry, etc.)

## Troubleshooting

### 404 Errors on Refresh

Next.js routes need to be handled by CloudFront error pages:
- 404 → `/404.html` (200 status)
- 403 → `/404.html` (200 status)

### Build Errors

Ensure all dependencies are in `package.json`:
```bash
npm install --save <package>
```

### Deployment Script Issues

Check AWS CLI credentials:
```bash
aws configure list
```

## Next Steps

After deployment:
1. Set up custom domain
2. Configure monitoring
3. Set up CI/CD pipeline
4. Add error tracking
5. Configure analytics (if needed)

