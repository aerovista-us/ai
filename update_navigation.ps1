# Update Navigation Script
Write-Host "Starting Navigation Update..." -ForegroundColor Green

$basePath = "c:\Documents\AeroVista-Products"
$htmlFiles = Get-ChildItem "$basePath\*.html" | Where-Object { $_.Name -ne "navigation.html" }

Write-Host "Found $($htmlFiles.Count) HTML files to update" -ForegroundColor Cyan

foreach ($htmlFile in $htmlFiles) {
    Write-Host "Updating $($htmlFile.Name)..." -ForegroundColor White
    
    $content = Get-Content $htmlFile.FullName -Raw
    $originalContent = $content
    
    # Read new navigation
    $newNavigation = Get-Content "$basePath\navigation.html" -Raw
    
    # Remove old navigation patterns
    $content = $content -replace '<nav[^>]*class="navigation"[^>]*>.*?</nav>', '', [System.Text.RegularExpressions.RegexOptions]::Singleline
    $content = $content -replace '<nav[^>]*>.*?</nav>', '', [System.Text.RegularExpressions.RegexOptions]::Singleline
    $content = $content -replace '<div class="navigation">.*?</div>', '', [System.Text.RegularExpressions.RegexOptions]::Singleline
    
    # Add skip link if not present
    if ($content -notmatch "Skip to main content") {
        $skipLink = '<a href="#main-content" class="sr-only" style="position: absolute; top: -40px; left: 6px; background: #000; color: #fff; padding: 8px; text-decoration: none; z-index: 1000;" onfocus="this.style.top=`6px`" onblur="this.style.top=`-40px`">Skip to main content</a>'
        $content = $content -replace '<body>', "<body>`n$skipLink"
    }
    
    # Insert new navigation after body tag
    if ($content -match '<body[^>]*>') {
        $content = $content -replace '<body[^>]*>', "$&`n$newNavigation"
    }
    
    # Add main-content id if not present
    if ($content -notmatch 'id="main-content"') {
        $content = $content -replace '(<div[^>]*class="[^"]*container[^"]*"[^>]*>)', '$1 id="main-content"'
        if ($content -notmatch 'id="main-content"') {
            $content = $content -replace '(<div[^>]*class="[^"]*header[^"]*"[^>]*>)', '$1 id="main-content"'
        }
    }
    
    # Save if changes were made
    if ($content -ne $originalContent) {
        Set-Content -Path $htmlFile.FullName -Value $content -Encoding UTF8
        Write-Host "  ✅ Updated navigation in $($htmlFile.Name)" -ForegroundColor Green
    } else {
        Write-Host "  No navigation changes needed in $($htmlFile.Name)" -ForegroundColor Yellow
    }
}

Write-Host "`nNavigation update complete!" -ForegroundColor Green
Write-Host "All pages now have the new hamburger-style navigation with file tree structure." -ForegroundColor Cyan
