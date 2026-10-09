@echo off
echo ==============================================================
echo   GUVI E-Commerce Platform - Java Web Server Launcher
echo ==============================================================
echo.
echo Compiling Java source files...
if not exist backend\bin mkdir backend\bin
javac -encoding UTF-8 -d backend\bin backend\src\com\guvi\ecommerce\exception\*.java backend\src\com\guvi\ecommerce\util\*.java backend\src\com\guvi\ecommerce\model\*.java backend\src\com\guvi\ecommerce\dao\*.java backend\src\com\guvi\ecommerce\servlet\base\*.java backend\src\com\guvi\ecommerce\servlet\*.java backend\src\com\guvi\ecommerce\server\*.java

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Compilation failed! Please check error output.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo Compilation successful. Starting Java Server on http://localhost:8080 ...
echo.
java -cp backend\bin com.guvi.ecommerce.server.AppServer
pause
