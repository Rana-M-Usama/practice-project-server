
@echo off
title Git By Rana M Usama

:start

color 0a
cls

echo.
echo 1. Push Your Changes.
echo 2. Pull Changes From Master.
echo 3. Pull A Specific Branch.
echo 4. List Local Branches.
echo 5. Switch Branch.
echo 0. Exit

echo.
set /p option="Enter An Option: "

if %option%==0 goto end
if %option%==1 goto pushchanges
if %option%==2 goto pullchanges
if %option%==3 goto pullspecific
if %option%==4 goto listbranches
if %option%==5 goto switchbranch

color 0c

echo.
echo Invalid Option. . .
timeout /t 2 /nobreak >nul
goto start

:pushchanges

echo.
set /p comment="Enter Comment: "
echo.
echo Pushing Changes. . .
git add .
git commit -m "%comment%"
git push
echo.
pause
goto start

:pullchanges

echo.
echo Pulling Changes From Master. . .
echo.
git pull origin master
:askmas
echo.
set /p askm="If Conflicts Occur Then First Solve Conflicts And Press y Else Press n: "
if %askm%==n goto mp
if %askm%==y goto mco
goto askmas
:mco
git add .
git commit -m "Resolved Conflicts From Branch Master"
:mp
echo.
echo Pushing Changes. . .
echo.
git push
echo.
pause
goto start

:pullspecific

echo.
set /p sBranch="Enter Branch Name: "
echo.
echo Pulling Branch %sBranch%. . .
echo.
git pull origin %sBranch%
:asknow
echo.
set /p ask="If Conflicts Occur Then First Solve Conflicts And Press y Else Press n: "
if %ask%==n goto pch
if %ask%==y goto ych
goto asknow
:ych
echo.
echo Commiting Changes. . .
git add .
git commit -m "Resolved Conflicts From Branch %sBranch%"
:pch
echo.
echo Pushing Changes. . .
echo.
git push
echo.
pause
goto start

:listbranches

echo.
echo Listing All Branches. . .
git branch
echo.
pause
goto start

:switchbranch

echo.
set /p sb="Enter Branch Name To Switch: "
echo.
echo Switching To Branch %sb%
echo.
git checkout %sb%
echo.
pause
goto start

:end

echo.
echo Press Any Key To Exit. . .
pause >nul
exit
