echo "
tell application \"System Events\" to keystroke \"g\" using {command down, shift down}
delay 0.2
tell application \"System Events\" to keystroke \"v\" using command down
delay 0.02
tell application \"System Events\" to key code 36
tell application \"System Events\" to key code 125
tell application \"System Events\" to key code 51
tell application \"System Events\" to key code 36
" | osascript