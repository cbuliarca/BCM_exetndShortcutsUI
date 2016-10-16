Gestures:

/*
 * Gestures
 */

/*
 * Option Overrides
 */

m_PenWidth = 6
m_NodePenWidth = 4
m_PenColor = 0000FF

m_EnabledIcon = 1

/*
 * Init for Additional Scripts
 */

SetWinDelay, 2  ; For EasyWindowDrag.ahk

; Windows which gestures are disabled in.  Search below for "#if" or "G_Blacklisted()".
GroupAdd, Blacklist, ahk_class VMPlayerFrame
GroupAdd, Blacklist, ahk_class SynergyDesk
GroupAdd, Blacklist, ahk_class TSSHELLWND
GroupAdd, Blacklist, ahk_class TaskSwitcherWnd  ; Aero Alt+Tab
GroupAdd, Blacklist, Sun VirtualBox ahk_class QWidget

; Use WinClose instead of !{F4} with these windows.
GroupAdd, WinCloseGroup, ahk_class ConsoleWindowClass
GroupAdd, WinCloseGroup, ahk_class AutoHotkey

/*
 * END OF INIT/CONFIG SECTION
 */
return

G_Blacklisted()
{
    MouseGetPos,,, MouseWinId
    return WinExist("ahk_group Blacklist ahk_id " MouseWinId)
}
