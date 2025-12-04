# Fixing Cloudflare Pages 404 Error

## Problem
Getting 404 error on Cloudflare Pages deployment.

## Solution

I've updated the configuration. Here's what needs to be done:

### Step 1: Verify Configuration Changes

The `next.config.js` has been updated to enable static export:
- ✅ `output: 'export'` - Enables static site generation
- ✅ `images: { unoptimized: true }` - Required for static export
- ✅ `trailingSlash: true` - Better compatibility

### Step 2: Update Cloudflare Pages Build Settings

In your Cloudflare Pages dashboard:

1. Go to your project: **legible-community-fb**
2. Click **Settings** → **Builds & deployments**
3. Configure:

   **Build command:**
   ```
   npm run build
   ```

   **Build output directory:**
   ```
   out
   ```

   **Root directory (advanced):**
   ```
   (leave empty or use "/")
   ```

   **Environment variables:**
   ```
   NODE_VERSION=18
   ```

### Step 3: Re-deploy

After updating build settings:

1. Go to **Deployments** tab
2. Click **Retry deployment** on the latest deployment, OR
3. Push a new commit to trigger a new deployment

### Step 4: Commit and Push Configuration Changes

I've made the configuration changes. Commit and push them:

```bash
cd /Users/acat/community-feedback

# Add the changes
git add next.config.js public/_redirects cloudflare.json

# Commit
git commit -m "Configure for Cloudflare Pages static export"

# Push to trigger new deployment
git push origin main
```

This will trigger a new deployment with the correct configuration.

## Alternative: Manual Configuration

If automatic deployment isn't working, you can also:

1. **Build locally:**
   ```bash
   npm install
   npm run build
   ```

2. **Upload the `out/` directory:**
   - Go to Cloudflare Pages → Deployments
   - Click "Upload assets"
   - Upload all files from the `out/` directory

## Verification

After deployment, you should see:
- ✅ Build completes successfully
- ✅ Output directory shows `out/` folder
- ✅ Site loads at https://legible-community-fb.pages.dev/

## Common Issues

### Build Fails
- Check Node.js version is 18+
- Ensure all dependencies are in `package.json`
- Check build logs in Cloudflare Dashboard

### Still Getting 404
- Verify output directory is set to `out`
- Check that `next.config.js` has `output: 'export'`
- Clear Cloudflare cache or wait a few minutes

### Routes Don't Work
- Verify `trailingSlash: true` in `next.config.js`
- Check `_redirects` file is in `public/` directory
- Ensure all routes are client-side (no server-side code)

## Need Help?

If issues persist:
1. Check Cloudflare Pages build logs
2. Verify repository is connected correctly
3. Ensure `main` branch is selected
4. Try redeploying from the dashboard

