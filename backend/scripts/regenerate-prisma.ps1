# Regenerate Prisma client when EPERM blocks query_engine-windows.dll.node
# 1) Stop all "npm run dev", tsx watch, and Node terminals.
# 2) Optional (aggressive): Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

$ErrorActionPreference = "Stop"
$backendRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $backendRoot.Path

$prismaClient = Join-Path $backendRoot "node_modules\.prisma\client"
if (Test-Path $prismaClient) {
  Write-Host "Deleting node_modules\.prisma\client..." -ForegroundColor Cyan
  Remove-Item -Recurse -Force $prismaClient
}

Write-Host "Running npx prisma generate..." -ForegroundColor Cyan
npx prisma generate
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}
Write-Host "OK - you can restart npm run dev." -ForegroundColor Green
