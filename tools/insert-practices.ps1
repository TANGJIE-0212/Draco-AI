# Insert practice steps into all day data files based on practices.json
# Inserts a new step before the closing `]\n};` pattern of each file.

param(
    [string]$JsonPath = "$PSScriptRoot\practices.json",
    [string]$RepoRoot = (Resolve-Path "$PSScriptRoot\..").Path
)

$ErrorActionPreference = 'Stop'
$entries = [System.IO.File]::ReadAllText($JsonPath, [System.Text.Encoding]::UTF8) | ConvertFrom-Json

function Escape-TS([string]$s) {
    if ($null -eq $s) { return '' }
    # Escape backslash, then double-quote, then newlines
    $s = $s -replace '\\','\\'
    $s = $s -replace '"','\"'
    $s = $s -replace "`r`n",'\n'
    $s = $s -replace "`n",'\n'
    return $s
}

foreach ($e in $entries) {
    $path = Join-Path $RepoRoot ("week{0}/day{1}/data.ts" -f $e.week, $e.day)
    if (-not (Test-Path $path)) { Write-Host "SKIP missing $path" -ForegroundColor Yellow; continue }

    $raw = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

    if ($raw -match "type: 'practice'") {
        # Remove single-line practice step lines.
        $raw = [regex]::Replace($raw, "(?m)^\s*\{\s*type:\s*'practice'.*\},?\s*\r?\n", "")
        # Remove multi-line practice blocks: from "{\n  type: 'practice'" to the matching "},\n" or "}\n".
        $raw = [regex]::Replace($raw, "(?s)\s*\{\s*\r?\n\s*type:\s*'practice',.*?\}\s*,?\s*\r?\n", "`r`n")
        Write-Host "RESET removed existing practice in $path" -ForegroundColor DarkCyan
    }

    $task        = Escape-TS $e.task
    $rubric      = Escape-TS $e.rubric
    $placeholder = Escape-TS $e.placeholder
    $minLen      = if ($e.PSObject.Properties.Name -contains 'minLength') { $e.minLength } else { 30 }

    $stepLine = '    { type: ''practice'', task: "' + $task + '", rubric: "' + $rubric + '", placeholder: "' + $placeholder + '", minLength: ' + $minLen + ' },'

    # Find the last `{ type: 'theory'` step and insert OUR step before it.
    # Use regex to find all matches and pick the last position.
    $matches2 = [regex]::Matches($raw, "(?m)^\s*\{\s*type:\s*'theory'")
    if ($matches2.Count -eq 0) {
        Write-Host "FAIL no theory step in $path" -ForegroundColor Red
        continue
    }
    $last = $matches2[$matches2.Count - 1]
    # Find the start-of-line for that match
    $insertPos = $last.Index
    # Walk back to start of that line (find preceding newline)
    while ($insertPos -gt 0 -and $raw[$insertPos - 1] -ne "`n") { $insertPos-- }

    $newContent = $raw.Substring(0, $insertPos) + $stepLine + "`r`n" + $raw.Substring($insertPos)
    [System.IO.File]::WriteAllText($path, $newContent, (New-Object System.Text.UTF8Encoding($false)))
    Write-Host "OK   week$($e.week)/day$($e.day)" -ForegroundColor Green
}

Write-Host "`nDone."
