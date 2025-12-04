# Clearing Cache to See New Projects

If you're still only seeing one project in the application, you may need to clear your browser's localStorage cache. The prototype stores data locally in your browser.

## How to Clear Cache

### Option 1: Clear localStorage via Browser Console
1. Open your browser's Developer Tools (F12 or Cmd+Option+I on Mac)
2. Go to the Console tab
3. Type the following and press Enter:
   ```javascript
   localStorage.clear()
   ```
4. Refresh the page

### Option 2: Clear via Application Tab
1. Open Developer Tools (F12 or Cmd+Option+I on Mac)
2. Go to the Application tab (Chrome) or Storage tab (Firefox)
3. Expand "Local Storage"
4. Click on your site's URL
5. Click "Clear All" or delete individual items starting with "eia-"
6. Refresh the page

### Option 3: Clear All Browser Data
1. Open browser settings
2. Clear browsing data/cache
3. Select "Cookies and other site data" or "Cached images and files"
4. Clear data
5. Refresh the page

After clearing cache, the application will reinitialize with the new data including both wind farm projects!

## Current Projects

1. **Búrfellslundur/Vaðölduver Wind Farm** (Project 1)
   - 28-30 turbines, 120 MW
   - Status: Public Comment Phase
   - Developer: Landsvirkjun

2. **Hafið Wind Farm Project** (Project 2) - NEW!
   - 15-18 turbines, 75 MW offshore
   - Status: Scoping Phase
   - Developer: Orkubú Vestfjarða

