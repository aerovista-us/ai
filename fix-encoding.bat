@echo off
echo ========================================
echo AeroVista Encoding Fix Script
echo ========================================
echo.

cd /d "c:\Documents\AeroVista-Products"
echo Current directory: %CD%
echo.

echo Fixing encoding issues in AeroVista files...
echo.

REM Run the Python encoding fix script
python fix-encoding.py

echo.
echo ========================================
echo Encoding fix completed!
echo ========================================
echo.
echo All emoji characters should now display correctly.
echo.
pause
