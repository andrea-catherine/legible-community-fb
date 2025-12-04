# Cloudflare Pages Deployment

The application has been successfully deployed to Cloudflare Pages!

**Live URL:** https://legible-community-fb.pages.dev/

## Cloudflare Pages Setup

Cloudflare Pages is an excellent choice for deploying Next.js static exports. It provides:
- ✅ Global CDN distribution
- ✅ Automatic HTTPS
- ✅ Free custom domains
- ✅ Automatic deployments from GitHub
- ✅ Preview deployments for PRs
- ✅ Fast build times

## Deployment Configuration

### Build Settings

For Next.js static export on Cloudflare Pages:

**Build command:**
```bash
npm run build
```

**Build output directory:**
```
out
```

**Node version:**
```
18
```

### Next.js Configuration

Ensure `next.config.js` is configured for static export:

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

## Automatic Deployments

Cloudflare Pages can automatically deploy from your GitHub repository:

1. Go to Cloudflare Dashboard → Pages
2. Connect your GitHub repository: `andrea-catherine/legible-community-fb`
3. Configure build settings (as shown above)
4. Deploy automatically on every push to `main` branch

## Custom Domain Setup

To use a custom domain:

1. Go to your Pages project in Cloudflare Dashboard
2. Navigate to **Custom domains**
3. Click **Set up a custom domain**
4. Enter your domain name
5. Cloudflare will provide DNS records to add
6. DNS will propagate automatically

## Environment Variables

If you need environment variables (for future API integrations):

1. Go to Pages project → Settings → Environment variables
2. Add variables (e.g., `NEXT_PUBLIC_API_URL`)
3. Redeploy or wait for next automatic deployment

## Performance

Cloudflare Pages automatically provides:
- ✅ Edge caching
- ✅ Automatic compression
- ✅ HTTP/2 and HTTP/3
- ✅ Image optimization (if configured)
- ✅ Analytics (in Pro plan)

## Monitoring

Check your deployment:
- **Deployment status:** Cloudflare Dashboard → Pages → Deployments
- **Analytics:** Cloudflare Dashboard → Analytics (if enabled)
- **Functions logs:** Available in Cloudflare Dashboard

## Troubleshooting

### Build Failures

Check build logs in Cloudflare Dashboard:
- Ensure Node.js version matches (18+)
- Verify all dependencies in `package.json`
- Check for build errors in logs

### 404 Errors on Routes

Next.js routes should work automatically with static export. If you see 404s:
- Verify `output: 'export'` in `next.config.js`
- Check that all routes are properly exported
- Ensure trailing slashes are configured

### Performance Issues

- Check Cloudflare Analytics for insights
- Verify assets are being cached
- Enable Cloudflare's image optimization if needed

## Next Steps

1. ✅ **Deployed!** Application is live at https://legible-community-fb.pages.dev/
2. Set up custom domain (optional)
3. Configure automatic deployments from GitHub
4. Add environment variables if needed (future)
5. Monitor analytics and performance

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [Custom Domains](https://developers.cloudflare.com/pages/platform/custom-domains/)

