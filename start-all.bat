@echo off
setlocal

REM Launch backend and frontend dev servers in separate terminals.
set "ROOT=%~dp0"
set "BACKEND=%ROOT%backend"
set "FRONTEND=%ROOT%frontend"

if not exist "%BACKEND%" (
  echo [ERROR] Backend folder not found: "%BACKEND%"
  pause
  exit /b 1
)

if not exist "%FRONTEND%" (
  echo [ERROR] Frontend folder not found: "%FRONTEND%"
  pause
  exit /b 1
)

echo Starting backend...
start "Backend Dev Server" cmd /k "cd /d ""%BACKEND%"" && npm run dev"

echo Starting frontend...
start "Frontend Dev Server" cmd /k "cd /d ""%FRONTEND%"" && npm run dev"

echo.
echo Done. Two windows were opened:
echo - Backend API (default): http://localhost:8787
echo - Frontend: http://localhost:5173
echo.
echo You can close this window.
endlocal
