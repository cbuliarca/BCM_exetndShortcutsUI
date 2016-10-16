WScript.Sleep 500
Set WshShell = WScript.CreateObject("WScript.Shell")

WshShell.SendKeys "^v"
WshShell.SendKeys "~"