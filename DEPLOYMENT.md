# Deployment Guide

## Mixed Content Error Fix

This document explains how to fix the "Mixed Content" error when deploying to Vercel.

### Problem
When deploying to Vercel (HTTPS), the application tries to make requests to HTTP API endpoints, which browsers block for security reasons.

### Solution

#### 1. Environment Variables Configuration

The application now uses environment variables for API configuration:

```bash
# Local Development (.env.local)
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=https://65.109.108.95:3001/api/
```

#### 2. Vercel Deployment Setup

When deploying to Vercel, set these environment variables in your Vercel dashboard:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXTAUTH_SECRET` | `your-secret-key-here` | Production |
| `NEXTAUTH_URL` | `https://your-domain.vercel.app` | Production |
| `NEXT_PUBLIC_API_BASE_URL` | `/api/proxy/` | Production |

#### 3. Proxy Solution (Implemented)

Since the backend server at `65.109.108.95:3001` doesn't support HTTPS, we've implemented a **proxy solution** using Next.js API routes.

**How it works**:
- Your frontend makes HTTPS requests to `/api/proxy/*`
- The Next.js API route (`src/app/api/proxy/[...path]/route.ts`) receives these requests
- The API route forwards requests to your HTTP backend server
- Responses are returned to the frontend through the HTTPS proxy

**Benefits**:
- ✅ No mixed content errors
- ✅ No backend server changes required
- ✅ Secure HTTPS communication for users
- ✅ Maintains all existing API functionality

**The proxy is already configured and ready to use!**

### 4. Deployment Steps

1. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Fix mixed content error with HTTPS API configuration"
   git push
   ```

2. **Set environment variables in Vercel**:
   - Add all required environment variables as listed above

3. **Redeploy**:
   - Vercel will automatically redeploy when you push to your main branch
   - Or manually trigger a redeploy from the Vercel dashboard

### 5. Testing

After deployment:
1. Visit your Vercel URL
2. Open browser developer tools
3. Check for any remaining mixed content warnings
4. Test API functionality (login, data loading, etc.)

### 6. Troubleshooting

If you still see mixed content errors:
1. Check that all environment variables are set correctly in Vercel
2. Verify your backend server supports HTTPS
3. Check browser developer tools for specific failing requests
4. Consider implementing the proxy solution if backend HTTPS is not available

## Additional Notes

- The `NEXT_PUBLIC_` prefix is required for environment variables used in client-side code
- Make sure to use a strong, unique `NEXTAUTH_SECRET` for production
- Update `NEXTAUTH_URL` to match your actual Vercel domain 