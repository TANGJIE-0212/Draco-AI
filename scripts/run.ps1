param(
    [string]$NotebookLmUrl = "https://notebooklm.google.com/"
)

$ErrorActionPreference = 'Stop'
$ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

for ($week = 1; $week -le 7; $week++) {
    for ($day = 1; $day -le 7; $day++) {
        $file = Join-Path $ScriptRoot "week$week\day$day.md"
        if (-not (Test-Path $file)) {
            Write-Warning "Missing: $file"
            continue
        }

        $content = Get-Content $file -Raw -Encoding UTF8
        Set-Clipboard -Value $content
        Write-Host "Copied Week $week Day $day to clipboard: $file" -ForegroundColor Green
        Start-Process $NotebookLmUrl
        Read-Host "Paste into NotebookLM and generate the video, then press Enter for the next script"
    }
}

Write-Host "All scripts processed." -ForegroundColor Cyan
