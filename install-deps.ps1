# Installe les dépendances (racine + backend + frontend) — à utiliser si PowerShell refuse "&&".
$Root = $PSScriptRoot
Set-Location $Root
Write-Host "[1/3] npm install (racine)..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Set-Location "$Root\backend"
Write-Host "[2/3] npm install (backend)..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Set-Location "$Root\frontend"
Write-Host "[3/3] npm install (frontend)..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Set-Location $Root
Write-Host "Terminé." -ForegroundColor Green
