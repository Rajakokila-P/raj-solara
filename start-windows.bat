@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  if exist "C:\Program Files\nodejs\node.exe" (
    "C:\Program Files\nodejs\node.exe" scripts\serve.cjs
  ) else (
    echo Node.js was not found. Install Node.js and reopen this file.
  )
) else (
  node scripts\serve.cjs
)
pause
