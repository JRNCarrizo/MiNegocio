$body = @{
    email = "jorge@example.com"
    password = "123456"
} | ConvertTo-Json

$headers = @{
    "Content-Type" = "application/json"
}

try {
    Write-Host "Intentando login con jorge@example.com / 123456..." -ForegroundColor Yellow
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/publico/minegocio/auth/login" -Method POST -Headers $headers -Body $body
    Write-Host "Login exitoso:" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 10)
} catch {
    Write-Host "Error en login:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response body: $responseBody"
    }
}
