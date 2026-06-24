# A lancer en PowerShell **Administrateur** si MongoDB est installe comme service Windows.
# Prisma + MongoDB necessitent un replica set (meme un seul noeud suffit en local).
$ErrorActionPreference = "Stop"
$cfgPath = "C:\Program Files\MongoDB\Server\8.2\bin\mongod.cfg"
if (-not (Test-Path $cfgPath)) {
  Write-Error "Fichier introuvable : $cfgPath - adaptez le chemin a votre version MongoDB."
}
$content = Get-Content -Raw -Path $cfgPath
# Guillemets simples : le caractere # ne demarre pas un commentaire PowerShell
if ($content -match 'replSetName:\s*["'']?rs0["'']?') {
  Write-Host "replSetName rs0 semble deja present dans mongod.cfg."
} else {
  if ($content -notmatch '#replication:') {
    Write-Error 'Structure mongod.cfg inattendue (section #replication: absente).'
  }
  $new = $content -replace "#replication:\r?\n", @"
replication:
  replSetName: rs0

"@
  Set-Content -Path $cfgPath -Value $new -Encoding UTF8
  Write-Host "mongod.cfg mis a jour (replSetName: rs0)."
}

Write-Host "Redemarrage du service MongoDB..."
Restart-Service MongoDB -Force
Start-Sleep -Seconds 3

$mongoshExe = @(
  "C:\Program Files\MongoDB\Server\8.2\bin\mongosh.exe",
  "C:\Program Files\MongoDB\Server\8.0\bin\mongosh.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

$mongoshJs = "try { rs.status() } catch (e) { rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: '127.0.0.1:27017' }] }) }"

if ($mongoshExe) {
  & $mongoshExe --quiet --eval $mongoshJs
  Write-Host ('Termine. Verifiez avec: & "' + $mongoshExe + '" --eval "rs.status()"')
} else {
  $here = Split-Path -Parent $MyInvocation.MyCommand.Path
  $root = Resolve-Path (Join-Path $here "..")
  Write-Host "mongosh introuvable - depuis le dossier backend, executez: npm run mongo:init-rs"
  Set-Location $root
  npm run mongo:init-rs
}
