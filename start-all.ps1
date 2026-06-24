# Launch backend and frontend dev servers in separate PowerShell windows.
# Usage:
#   powershell -ExecutionPolicy Bypass -File .\start-all.ps1

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendPath = Join-Path $root "backend"
$frontendPath = Join-Path $root "frontend"

if (-not (Test-Path $backendPath)) {
  Write-Error "Backend folder not found: $backendPath"
}
if (-not (Test-Path $frontendPath)) {
  Write-Error "Frontend folder not found: $frontendPath"
}

Write-Host "Starting backend in a new PowerShell window..."
Start-Process powershell -ArgumentList @(
  "-NoExit",
  "-ExecutionPolicy", "Bypass",
  "-Command", "Set-Location '$backendPath'; npm run dev"
)

Write-Host "Starting frontend in a new PowerShell window..."
Start-Process powershell -ArgumentList @(
  "-NoExit",
  "-ExecutionPolicy", "Bypass",
  "-Command", "Set-Location '$frontendPath'; npm run dev"
)

Write-Host ""
Write-Host "Done. Two terminals should now be running:"
Write-Host " - Backend API on http://localhost:8787 (default)"
Write-Host " - Frontend on http://localhost:5173"
Write-Host ""
Write-Host "To stop: close both spawned PowerShell windows."
