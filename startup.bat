@echo off
cd projekt

start cmd /k start-database.bat

timeout /t 30
start cmd /k start-backend.bat

start cmd /c start-frontend.bat