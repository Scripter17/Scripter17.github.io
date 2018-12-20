@echo off
set a=Scripter17.github.io\externalLibraries
cd ..\..
copy "browser-elements\browserElements.js" "%a%\browserElements.js"
copy "jwBulkDOM\jwBulkDOM.js" "%a%\jwBulkDOM.js"
::copy "" "%a%\"
pause >nul