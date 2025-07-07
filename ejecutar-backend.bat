@echo off
echo ===================================================
echo Ejecutando Backend de miNegocio
echo ===================================================
echo.

echo 1. Limpiando proyecto...
call mvnw.cmd clean

echo.
echo 2. Compilando proyecto...
call mvnw.cmd compile

echo.
echo 3. Ejecutando aplicación...
call mvnw.cmd spring-boot:run

pause
