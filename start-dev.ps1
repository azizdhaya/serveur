# Prisma (MongoDB) + seed + API + frontend — sans Docker.
$Root = $PSScriptRoot
Set-Location $Root

Write-Host ""
Write-Host '=== Photovoltaique Dashboard — demarrage (MongoDB) ===' -ForegroundColor Green
Write-Host ""

Write-Host '[1/2] Prisma db push + seed...' -ForegroundColor Cyan
Set-Location "$Root\backend"
$ErrorActionPreference = "Stop"
npx prisma db push --skip-generate
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
npx prisma db seed
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host '[2/2] API port 8787 + Vite...' -ForegroundColor Cyan
Set-Location $Root
Write-Host ""
Write-Host 'Base MongoDB : verifiez que MongoDB tourne sur 127.0.0.1:27017' -ForegroundColor DarkGray
Write-Host 'Ouvrez http://localhost:5173 — admin@photovoltaique.tn / Admin@2024!' -ForegroundColor Yellow
Write-Host 'Arret : Ctrl+C dans cette fenetre.' -ForegroundColor DarkGray
Write-Host ""
npm run dev
