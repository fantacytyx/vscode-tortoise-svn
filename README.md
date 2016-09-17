# TortoiseSVN README

tortoisesvn is a simple extension for VSCode to use TortoiseSVN.

## Features

It provides commands to open TortoiseSVN window for the workspace rootPath for update, commit, log, revert, clear, add, diff, blame, lock and unlock. 

**It runs only on Windows and needs the TortoiseSVN and TortoiseSVN command line tools (TortoiseProc.exe).**
### add commands

* tortoiseSVN.update : Open __update__ for the workspace rootPath
* tortoiseSVN.commit : Open __commit__ for the workspace rootPath
* tortoiseSVN.log : Open __log__ for the workspace rootPath
* tortoiseSVN.revert : Open __revert__ for the workspace rootPath
* tortoiseSVN.clear : Open __clear__ for the workspace rootPath
* tortoiseSVN.add : Open __add__ for the workspace rootPath
* tortoiseSVN.diff : Open __diff__ for the workspace rootPath
* tortoiseSVN.blame : Open __blame__ for the workspace rootPath
* tortoiseSVN.lock : Open __lock__ for the workspace rootPath
* tortoiseSVN.unlock : Open __unlock__ for the workspace rootPath

### add keybindings

* `alt+s u` : "onCommand:tortoiseSVN.update"
* `alt+s c` : "onCommand:tortoiseSVN.commit"
* `alt+s l` : "onCommand:tortoiseSVN.log"
* `alt+s r` : "onCommand:tortoiseSVN.revert"
* `alt+s d` : "onCommand:tortoiseSVN.diff"

## Requirements

If TortoiseSVN is not installed at `C:\\Program Files\\TortoiseSVN\\bin\\TortoiseProc.exe`, specify the correct path
by setting property `tortoiseSVN.tortoiseSVNProcExePath` in user `settings.json`. 

## Extension Settings

This extension contributes the following settings:

* `tortoiseSVN.autoCloseUpdateDialog` : enable/disable auto close dialog when no errors, conflicts and merges.
* `tortoiseSVN.tortoiseSVNProcExePath` : specify the correct `TortoiseProc.exe` path

## Change Log 

* [Change log](https://raw.githubusercontent.com/fantacytyx/vscode-tortoise-svn/master/CHANGELOG.md)

## Source

[GitHub](https://raw.githubusercontent.com/fantacytyx/vscode-tortoise-svn)
                
## License

[MIT](https://raw.githubusercontent.com/fantacytyx/vscode-tortoise-svn/master/LICENSE)

**Enjoy!**