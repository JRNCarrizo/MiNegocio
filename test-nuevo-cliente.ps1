$body = @{
    nombre = "Usuario Test"
    apellidos = "Apellidos Test"
    email = "test@nuevocliente.com"
    telefono = "123456789"
    password = "123456"
} | ConvertTo-Json

$headers = @{
    "Content-Type" = "application/json"
}

try {
    Write-Host "Registrando nuevo cliente..." -ForegroundColor Yellow
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/publico/minegocio/auth/registro" -Method POST -Headers $headers -Body $body
    Write-Host "Registro exitoso:" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 10)
    
    # Ahora probar login con el nuevo cliente
    Write-Host "`nProbando login con el nuevo cliente..." -ForegroundColor Yellow
    $loginBody = @{
        email = "test@nuevocliente.com"
        password = "123456"
    } | ConvertTo-Json
    
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/publico/minegocio/auth/login" -Method POST -Headers $headers -Body $loginBody
    Write-Host "Login exitoso:" -ForegroundColor Green
    Write-Host ($loginResponse | ConvertTo-Json -Depth 10)
    
} catch {
    Write-Host "Error:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response body: $responseBody"
    }
}
