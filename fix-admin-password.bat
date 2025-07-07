@echo off
echo ========================================
echo Corrigiendo contraseña del admin
echo ========================================

echo Verificando si el backend está ejecutándose...
curl -s -X GET "http://localhost:8080/api/debug/ping" > nul
if %errorlevel% neq 0 (
    echo ERROR: El backend no está ejecutándose
    echo Por favor, inicia el backend primero ejecutando start-backend-simple.bat
    pause
    exit /b 1
)

echo Backend detectado. Corrigiendo contraseña...
curl -X POST "http://localhost:8080/api/debug/fix-admin-password" -H "Content-Type: application/json"

echo.
echo ========================================
echo Si todo salió bien, usa estas credenciales:
echo Email: admin@demo.com
echo Password: admin123
echo ========================================
pause
