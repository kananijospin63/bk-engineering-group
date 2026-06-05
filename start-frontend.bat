@echo off
echo ============================================
echo   BK Engineering Group - Frontend (Next.js)
echo ============================================
echo.

cd client

echo [1/2] Installation des dependances...
call npm install
if %errorlevel% neq 0 (
    echo ERREUR: npm install a echoue
    pause
    exit /b 1
)

echo.
echo [2/2] Demarrage du serveur de developpement...
echo.
echo ============================================
echo   Site disponible sur http://localhost:3000
echo   Admin sur http://localhost:3000/admin
echo ============================================
echo.
call npm run dev
pause
