@echo off
echo Starting Scalable Backend System...

:: Start User Service (Node.js)
echo Starting User Service (Port 3001)...
start cmd /k "cd user-service && npm run dev"

:: Start Product Service (Java)
echo Starting Product Service (Port 3002)...
start cmd /k "cd product-service && set \"JAVA_HOME=C:\Program Files\Common Files\Oracle\Java\javapath\" && .\mvnw spring-boot:run"

:: Start Analytics Service (Python)
echo Starting Analytics Service (Port 8000)...
start cmd /k "cd analytics-service && venv\Scripts\activate && uvicorn main:app --reload"

echo All services are starting in separate windows.
pause
