# FoodFresh - Setup and Run Script for Windows
# Run this script in PowerShell: .\setup.ps1

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "    FoodFresh - Setup Script" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed. Please install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check Python
try {
    $pythonVersion = python --version
    Write-Host "✓ Python installed: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Python is not installed. Please install from https://python.org/" -ForegroundColor Red
    exit 1
}

# Check MongoDB
Write-Host "Checking MongoDB..." -ForegroundColor Yellow
$mongoRunning = Get-Service MongoDB -ErrorAction SilentlyContinue
if ($mongoRunning) {
    if ($mongoRunning.Status -eq 'Running') {
        Write-Host "✓ MongoDB is running" -ForegroundColor Green
    } else {
        Write-Host "! MongoDB is installed but not running. Starting..." -ForegroundColor Yellow
        Start-Service MongoDB
    }
} else {
    Write-Host "! MongoDB service not found. Make sure MongoDB is installed and running." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow

# Install root dependencies
Write-Host "Installing root dependencies..." -ForegroundColor Cyan
npm install

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
Set-Location backend
npm install
Set-Location ..

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
Set-Location frontend
npm install
Set-Location ..

# Install ML service dependencies
Write-Host "Installing ML service dependencies..." -ForegroundColor Cyan
Set-Location ml-service
python -m pip install -r requirements.txt
Set-Location ..

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "    Setup Complete!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "To start the application, run:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "Or start services individually:" -ForegroundColor Yellow
Write-Host "  Terminal 1: cd ml-service && python app.py" -ForegroundColor Cyan
Write-Host "  Terminal 2: cd backend && npm run dev" -ForegroundColor Cyan
Write-Host "  Terminal 3: cd frontend && npm start" -ForegroundColor Cyan
Write-Host ""
Write-Host "Access the application at:" -ForegroundColor Yellow
Write-Host "  Frontend:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "  Backend:   http://localhost:5000" -ForegroundColor Cyan
Write-Host "  ML Service: http://localhost:5001" -ForegroundColor Cyan
Write-Host ""
