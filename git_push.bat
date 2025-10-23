@echo off
echo ========================================
echo AeroVista Git Push Script
echo ========================================
echo.

cd /d "c:\Documents\AeroVista-Products"
echo Current directory: %CD%
echo.

echo Checking git status...
"C:\Program Files\Git\bin\git.exe" status
echo.

echo Adding all changes...
"C:\Program Files\Git\bin\git.exe" add .
echo.

echo Committing changes...
"C:\Program Files\Git\bin\git.exe" commit -m "Update AeroVista site with navigation fixes and missing pages

- Fixed double navigation headers across all pages
- Created missing landing pages for all tiers
- Added branded 404 error page
- Updated broken links and redirects
- Standardized navigation structure
- Enhanced user experience and accessibility"
echo.

echo Pushing to GitHub...
"C:\Program Files\Git\bin\git.exe" push origin master
echo.

echo ========================================
echo Push completed successfully!
echo ========================================
echo.
echo Repository: https://github.com/aerovista-us/ai
echo Live site: https://aerovista-us.github.io/ai/
echo.
pause
