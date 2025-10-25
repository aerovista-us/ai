@echo off
echo ========================================
echo AeroVista Emoji Encoding Fix
echo ========================================
echo.

cd /d "c:\Documents\AeroVista-Products"
echo Current directory: %CD%
echo.

echo Fixing emoji encoding issues...
echo.

REM Create a temporary PowerShell script to fix encoding
echo $files = Get-ChildItem -Recurse -Include "*.md","*.html","*.txt" > temp_fix.ps1
echo foreach ($file in $files) { >> temp_fix.ps1
echo     $content = Get-Content $file.FullName -Raw -Encoding UTF8 >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ'', '🎯' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸŽ¯', '🚀' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸš€', '✈️' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '📊' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '✅' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '❌' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '⚠️' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '📝' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '📈' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '🔧' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '💡' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '🏆' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '🏢' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '📧' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '🤝' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '🎉' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '🆘' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '📚' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '🛠️' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '🔍' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '📋' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '📅' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '💰' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '🎁' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '⭐' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '🔥' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '💼' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '🌍' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '🔒' >> temp_fix.ps1
echo     $content = $content -replace 'ðŸ', '🎓' >> temp_fix.ps1
echo     Set-Content $file.FullName -Value $content -Encoding UTF8 >> temp_fix.ps1
echo     Write-Host "Fixed: $($file.Name)" >> temp_fix.ps1
echo } >> temp_fix.ps1

echo Running PowerShell script to fix encoding...
powershell -ExecutionPolicy Bypass -File temp_fix.ps1

echo.
echo Cleaning up temporary files...
del temp_fix.ps1

echo.
echo ========================================
echo Emoji encoding fix completed!
echo ========================================
echo.
echo All emoji characters should now display correctly.
echo.
pause
