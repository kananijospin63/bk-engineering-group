@echo off
echo ============================================
echo   BK Engineering Group - Backend (API)
echo ============================================
echo.

cd server

echo [1/3] Installation des dependances...
call npm install
if %errorlevel% neq 0 (
    echo ERREUR: npm install a echoue
    pause
    exit /b 1
)

echo.
echo [2/3] Migration de la base de donnees...
call npm run migrate
if %errorlevel% neq 0 (
    echo ERREUR: Migration echouee. Verifiez que MySQL/WAMP est demarre.
    pause
    exit /b 1
)

echo.
echo [3/3] Insertion des donnees initiales...
call npm run seed

echo.
echo ============================================
echo   API demarree sur http://localhost:5000
echo ============================================
echo.
call npm run dev
pause
