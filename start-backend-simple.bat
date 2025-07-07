@echo off
echo Iniciando backend miNegocio...
cd /d "c:\Users\Usuario\Desktop\miNegocio"

echo Compilando proyecto...
call mvn clean compile -q

echo Ejecutando aplicación...
call mvn spring-boot:run

pause
