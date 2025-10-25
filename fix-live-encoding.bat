@echo off
echo ========================================
echo Fix Live Site Encoding Issues
echo ========================================
echo.

cd /d "c:\Documents\AeroVista-Products"
echo Current directory: %CD%
echo.

echo Fixing emoji encoding for live site...
echo.

REM Create PowerShell script to fix emojis
echo $files = Get-ChildItem -Recurse -Include "*.html","*.md" > fix_emojis.ps1
echo foreach ($file in $files) { >> fix_emojis.ps1
echo     $content = Get-Content $file.FullName -Raw -Encoding UTF8 >> fix_emojis.ps1
echo     $content = $content -replace '🎯', '&#x1F3AF;' >> fix_emojis.ps1
echo     $content = $content -replace '🚀', '&#x1F680;' >> fix_emojis.ps1
echo     $content = $content -replace '✈️', '&#x2708;&#xFE0F;' >> fix_emojis.ps1
echo     $content = $content -replace '📊', '&#x1F4CA;' >> fix_emojis.ps1
echo     $content = $content -replace '✅', '&#x2705;' >> fix_emojis.ps1
echo     $content = $content -replace '❌', '&#x274C;' >> fix_emojis.ps1
echo     $content = $content -replace '⚠️', '&#x26A0;&#xFE0F;' >> fix_emojis.ps1
echo     $content = $content -replace '📝', '&#x1F4DD;' >> fix_emojis.ps1
echo     $content = $content -replace '📈', '&#x1F4C8;' >> fix_emojis.ps1
echo     $content = $content -replace '🔧', '&#x1F527;' >> fix_emojis.ps1
echo     $content = $content -replace '💡', '&#x1F4A1;' >> fix_emojis.ps1
echo     $content = $content -replace '🏆', '&#x1F3C6;' >> fix_emojis.ps1
echo     $content = $content -replace '🏢', '&#x1F3E2;' >> fix_emojis.ps1
echo     $content = $content -replace '📧', '&#x1F4E7;' >> fix_emojis.ps1
echo     $content = $content -replace '🤝', '&#x1F91D;' >> fix_emojis.ps1
echo     $content = $content -replace '🎉', '&#x1F389;' >> fix_emojis.ps1
echo     $content = $content -replace '🆘', '&#x1F198;' >> fix_emojis.ps1
echo     $content = $content -replace '📚', '&#x1F4DA;' >> fix_emojis.ps1
echo     $content = $content -replace '🛠️', '&#x1F6E0;&#xFE0F;' >> fix_emojis.ps1
echo     $content = $content -replace '🔍', '&#x1F50D;' >> fix_emojis.ps1
echo     $content = $content -replace '📋', '&#x1F4CB;' >> fix_emojis.ps1
echo     $content = $content -replace '📅', '&#x1F4C5;' >> fix_emojis.ps1
echo     $content = $content -replace '💰', '&#x1F4B0;' >> fix_emojis.ps1
echo     $content = $content -replace '🎁', '&#x1F381;' >> fix_emojis.ps1
echo     $content = $content -replace '⭐', '&#x2B50;' >> fix_emojis.ps1
echo     $content = $content -replace '🔥', '&#x1F525;' >> fix_emojis.ps1
echo     $content = $content -replace '💼', '&#x1F4BC;' >> fix_emojis.ps1
echo     $content = $content -replace '🌍', '&#x1F30D;' >> fix_emojis.ps1
echo     $content = $content -replace '🔒', '&#x1F512;' >> fix_emojis.ps1
echo     $content = $content -replace '🎓', '&#x1F393;' >> fix_emojis.ps1
echo     Set-Content $file.FullName -Value $content -Encoding UTF8 >> fix_emojis.ps1
echo     Write-Host "Fixed: $($file.Name)" >> fix_emojis.ps1
echo } >> fix_emojis.ps1

echo Running PowerShell script to fix emojis...
powershell -ExecutionPolicy Bypass -File fix_emojis.ps1

echo.
echo Cleaning up temporary files...
del fix_emojis.ps1

echo.
echo ========================================
echo Live site encoding fix completed!
echo ========================================
echo.
echo All emoji characters have been converted to HTML entities.
echo This should fix the display issues on your live site.
echo.
echo Next steps:
echo 1. Run git_push.bat to deploy the fixes
echo 2. Check your live site to confirm emojis display correctly
echo.
pause
