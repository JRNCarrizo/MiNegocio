$bodyRegistro = @{
    nombre = "Test Debug"
    apellidos = "Usuario Debug"
    email = "debug@test.com"
    telefono = "987654321"
    password = "password123"
} | ConvertTo-Json

$headers = @{
    "Content-Type" = "application/json"
}

try {
    Write-Host "=== REGISTRANDO NUEVO CLIENTE ===" -ForegroundColor Yellow
    $responseRegistro = Invoke-RestMethod -Uri "http://localhost:8080/api/publico/minegocio/auth/registro" -Method POST -Headers $headers -Body $bodyRegistro
    Write-Host "Registro exitoso!" -ForegroundColor Green
    
    Write-Host "`n=== PROBANDO LOGIN INMEDIATO ===" -ForegroundColor Yellow
    $bodyLogin = @{
        email = "debug@test.com"
        password = "password123"
    } | ConvertTo-Json
    
    $responseLogin = Invoke-RestMethod -Uri "http://localhost:8080/api/publico/minegocio/auth/login" -Method POST -Headers $headers -Body $bodyLogin
    Write-Host "Login exitoso!" -ForegroundColor Green
    Write-Host ($responseLogin | ConvertTo-Json -Depth 10)
    
} catch {
    Write-Host "Error:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response body: $responseBody"
    }
}
