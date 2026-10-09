@echo off
echo ==============================================================
echo   GUVI E-Commerce Platform - Backend Launcher
echo ==============================================================
echo.
echo Compiling Java source files...
if not exist bin mkdir bin
javac -encoding UTF-8 -d bin src\com\guvi\ecommerce\model\*.java src\com\guvi\ecommerce\dao\*.java src\com\guvi\ecommerce\servlet\base\*.java src\com\guvi\ecommerce\servlet\*.java src\com\guvi\ecommerce\server\*.java

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Compilation failed!
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo Compilation successful. Starting Java Server on http://localhost:8080 ...
echo.
java -cp bin com.guvi.ecommerce.server.AppServer
pause
