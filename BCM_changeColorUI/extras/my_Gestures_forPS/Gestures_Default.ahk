DefaultGestures:    ; Init section for default gestures.
    ; Default_D_R never closes these windows:
    GroupAdd, CloseBlacklist, ahk_class Progman         ; Desktop
    GroupAdd, CloseBlacklist, ahk_class Shell_TrayWnd   ; Taskbar
return

; Brightness:
Default_U:
    SetTitleMatchMode, RegEx
    if WinActive("ahk_class Photoshop")
        GetKeyState, state, SC056 ;the Left Backslash to subsrtact
        If state = D
        {
            var:=subStr( subStr( a_scriptDir, 1, ( sP:=inStr( a_scriptDir, "\", 0, 0 ) - 1 ) ), 1, sP )"\scripts\~chBrightnessSubstr.jsx"
            varInfo:= "- BRIGHTNESS"
        }
        Else
        {
            var:=subStr( subStr( a_scriptDir, 1, ( sP:=inStr( a_scriptDir, "\", 0, 0 ) - 1 ) ), 1, sP )"\scripts\~chBrightness.jsx"
            varInfo:= "+ BRIGHTNESS"
        }
        Run Photoshop.exe %var%
        CornerNotify(0.2, varInfo, "", "vc hc")
    return
Default_U_D: ;alternate substract
    SetTitleMatchMode, RegEx
    if WinActive("ahk_class Photoshop")
        var:=subStr( subStr( a_scriptDir, 1, ( sP:=inStr( a_scriptDir, "\", 0, 0 ) - 1 ) ), 1, sP )"\scripts\~chBrightnessSubstr.jsx"
        Run Photoshop.exe %var%
        varInfo:= "- BRIGHTNESS"
        CornerNotify(0.2, varInfo, "", "vc hc")
    return

; Satuartion:
Default_UR:
    SetTitleMatchMode, RegEx
    if WinActive("ahk_class Photoshop")
        GetKeyState, state, SC056 ;the Left Backslash to subsrtact
        If state = D
        {
            var:=subStr( subStr( a_scriptDir, 1, ( sP:=inStr( a_scriptDir, "\", 0, 0 ) - 1 ) ), 1, sP )"\scripts\~chSaturationSubstr.jsx"
            varInfo:= "- SATURATION"
        }
        Else
        {
            var:=subStr( subStr( a_scriptDir, 1, ( sP:=inStr( a_scriptDir, "\", 0, 0 ) - 1 ) ), 1, sP )"\scripts\~chSaturation.jsx"
            varInfo:= "+ SATURATION"
        }
        Run Photoshop.exe %var%
        CornerNotify(0.2, varInfo, "", "vc hc")

    return
Default_UR_DL:
    SetTitleMatchMode, RegEx
    if WinActive("ahk_class Photoshop")
        var:=subStr( subStr( a_scriptDir, 1, ( sP:=inStr( a_scriptDir, "\", 0, 0 ) - 1 ) ), 1, sP )"\scripts\~chSaturationSubstr.jsx"
        Run Photoshop.exe %var%
        varInfo:= "- SATURATION"
        CornerNotify(0.2, varInfo, "", "vc hc")
    return

; Hue:
Default_R:
    SetTitleMatchMode, RegEx
    if WinActive("ahk_class Photoshop")
        GetKeyState, state, SC056 ;the Left Backslash to subsrtact
        If state = D
		{
            var:=subStr( subStr( a_scriptDir, 1, ( sP:=inStr( a_scriptDir, "\", 0, 0 ) - 1 ) ), 1, sP )"\scripts\~chHueSubstr.jsx"
            varInfo:= "- HUE"
        }
        Else
        {
            var:=subStr( subStr( a_scriptDir, 1, ( sP:=inStr( a_scriptDir, "\", 0, 0 ) - 1 ) ), 1, sP )"\scripts\~chHue.jsx"
            varInfo:= "+ HUE"
        }
        Run Photoshop.exe %var%
        CornerNotify(0.2, varInfo, "", "vc hc")
    return
Default_R_L:
    SetTitleMatchMode, RegEx
    if WinActive("ahk_class Photoshop")
        var:=subStr( subStr( a_scriptDir, 1, ( sP:=inStr( a_scriptDir, "\", 0, 0 ) - 1 ) ), 1, sP )"\scripts\~chHueSubstr.jsx"
        Run Photoshop.exe %var%
        varInfo:= "- HUE"
        CornerNotify(0.2, varInfo, "", "vc hc")
    return

;Red:
Default_UL:
    SetTitleMatchMode, RegEx
    if WinActive("ahk_class Photoshop")
        GetKeyState, state, SC056 ;the Left Backslash to subsrtact
        If state = D
		{    
            var:=subStr( subStr( a_scriptDir, 1, ( sP:=inStr( a_scriptDir, "\", 0, 0 ) - 1 ) ), 1, sP )"\scripts\~chRedSubstr.jsx"
            varInfo:= "- RED"
        }
        Else    
        {
            var:=subStr( subStr( a_scriptDir, 1, ( sP:=inStr( a_scriptDir, "\", 0, 0 ) - 1 ) ), 1, sP )"\scripts\~chRed.jsx"
            varInfo:= "+ RED"
        }
        Run Photoshop.exe %var%
        CornerNotify(0.2, varInfo, "", "vc hc")
    return
Default_UL_DR:
    SetTitleMatchMode, RegEx
    if WinActive("ahk_class Photoshop")
        var:=subStr( subStr( a_scriptDir, 1, ( sP:=inStr( a_scriptDir, "\", 0, 0 ) - 1 ) ), 1, sP )"\scripts\~chRedSubstr.jsx"
        Run Photoshop.exe %var%
        varInfo:= "- RED"
        CornerNotify(0.2, varInfo, "", "vc hc")
    return

;Green:
Default_L:
    SetTitleMatchMode, RegEx
    if WinActive("ahk_class Photoshop")
        GetKeyState, state, SC056 ;the Left Backslash to subsrtact
        If state = D
		{    
            var:=subStr( subStr( a_scriptDir, 1, ( sP:=inStr( a_scriptDir, "\", 0, 0 ) - 1 ) ), 1, sP )"\scripts\~chGreenSubstr.jsx"
            varInfo:= "- GREEN"
        }
        Else
        { 
            var:=subStr( subStr( a_scriptDir, 1, ( sP:=inStr( a_scriptDir, "\", 0, 0 ) - 1 ) ), 1, sP )"\scripts\~chGreen.jsx"
            varInfo:= "+ GREEN"
        }
        Run Photoshop.exe %var%
        CornerNotify(0.2, varInfo, "", "vc hc")
    return
Default_L_R:
    SetTitleMatchMode, RegEx
    if WinActive("ahk_class Photoshop")
        var:=subStr( subStr( a_scriptDir, 1, ( sP:=inStr( a_scriptDir, "\", 0, 0 ) - 1 ) ), 1, sP )"\scripts\~chGreenSubstr.jsx"
        Run Photoshop.exe %var%
        varInfo:= "- GREEN"
        CornerNotify(0.2, varInfo, "", "vc hc")
    return

;Blue:
Default_DL:
    SetTitleMatchMode, RegEx
    if WinActive("ahk_class Photoshop")
        GetKeyState, state, SC056 ;the Left Backslash to subsrtact
        If state = D
		{
            var:=subStr( subStr( a_scriptDir, 1, ( sP:=inStr( a_scriptDir, "\", 0, 0 ) - 1 ) ), 1, sP )"\scripts\~chBlueSubstr.jsx"
            varInfo:= "- BLUE"
        }
        Else
        { 
            var:=subStr( subStr( a_scriptDir, 1, ( sP:=inStr( a_scriptDir, "\", 0, 0 ) - 1 ) ), 1, sP )"\scripts\~chBlue.jsx"
            varInfo:= "+ BLUE"
        }
        Run Photoshop.exe %var%
        CornerNotify(0.2, varInfo, "", "vc hc")
    return
Default_DL_UR:
    SetTitleMatchMode, RegEx
    if WinActive("ahk_class Photoshop")
        var:=subStr( subStr( a_scriptDir, 1, ( sP:=inStr( a_scriptDir, "\", 0, 0 ) - 1 ) ), 1, sP )"\scripts\~chBlueSubstr.jsx"
        Run Photoshop.exe %var%
        varInfo:= "- BLUE"
        CornerNotify(0.2, varInfo, "", "vc hc")
    return

;Change ProcentUI:
Default_DR:
    SetTitleMatchMode, RegEx
    if WinActive("ahk_class Photoshop")
        var:=subStr( subStr( a_scriptDir, 1, ( sP:=inStr( a_scriptDir, "\", 0, 0 ) - 1 ) ), 1, sP )"\scripts\~chProcUI.jsx"
        Run Photoshop.exe %var%
    return
