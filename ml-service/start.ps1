# Start ML service with Python 3.11 virtual environment
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$pythonExe = Join-Path $scriptPath "venv311\Scripts\python.exe"
$appPath = Join-Path $scriptPath "app.py"

& $pythonExe $appPath
