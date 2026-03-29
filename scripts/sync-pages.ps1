$root = Split-Path -Parent $PSScriptRoot
$dist = Join-Path $root 'dist'
$docs = Join-Path $root 'docs'

if (!(Test-Path $dist)) {
  throw 'dist folder not found. Run the build first.'
}

if (Test-Path $docs) {
  Remove-Item -LiteralPath $docs -Recurse -Force
}

Copy-Item -LiteralPath $dist -Destination $docs -Recurse
Write-Output 'Copied dist -> docs for GitHub Pages.'
