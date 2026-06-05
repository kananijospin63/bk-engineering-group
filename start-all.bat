@echo off
echo ============================================
echo   BK Engineering Group - Demarrage
echo ============================================
echo.
echo Assurez-vous que PostgreSQL est demarre !
echo.

echo Demarrage du Backend...
start "BK Backend" cmd /k "cd /d %~dp0server && npm run dev"

echo Attente de 5 secondes...
timeout /t 5 /nobreak > nul

echo Demarrage du Frontend (production)...
start "BK Frontend" cmd /k "cd /d %~dp0client && npm run start"

echo.
echo ============================================
echo   Backend  : http://localhost:5000
echo   Frontend : http://localhost:3000
echo   Admin    : http://localhost:3000/admin
echo   Login    : admin@bkengineering.com
echo   Password : Admin@2024
echo ============================================
echo.
pause
