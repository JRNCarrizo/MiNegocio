# Script para corregir la contraseña del admin
$baseUrl = "http://localhost:8080/api/debug"

Write-Host "Verificando si el backend está ejecutándose..." -ForegroundColor Yellow

try {
    # Intentar hacer ping al backend
    $pingResponse = Invoke-RestMethod -Uri "$baseUrl/ping" -Method GET -TimeoutSec 5
    Write-Host "✅ Backend está ejecutándose" -ForegroundColor Green
    
    # Corregir la contraseña del admin
    Write-Host "Corrigiendo contraseña del admin..." -ForegroundColor Yellow
    $fixResponse = Invoke-RestMethod -Uri "$baseUrl/fix-admin-password" -Method POST -ContentType "application/json"
    
    Write-Host "✅ Resultado:" -ForegroundColor Green
    $fixResponse | ConvertTo-Json -Depth 3 | Write-Host
    
    if ($fixResponse.passwordActualFunciona -eq $true -or $fixResponse.nuevoHashFunciona -eq $true) {
        Write-Host "✅ La contraseña del admin está funcionando correctamente" -ForegroundColor Green
        Write-Host "   Email: admin@demo.com" -ForegroundColor Cyan
        Write-Host "   Password: admin123" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Aún hay problemas con la contraseña" -ForegroundColor Red
    }
    
} catch {
    Write-Host "❌ Error: El backend no está ejecutándose o hay un problema de conexión" -ForegroundColor Red
    Write-Host "   Detalles: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Asegúrate de que el backend esté ejecutándose en http://localhost:8080" -ForegroundColor Yellow
}

Write-Host "`nPresiona cualquier tecla para continuar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
