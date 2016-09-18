#README

tortoise-svn is a simple extension for VSCode to use TortoiseSVN.

## Features

tortoise-svn provides commands to open TortoiseSVN window for the workspace rootPath for update, commit, log, revert, clear, add, diff, blame, lock and unlock. 
tortoise-svn provides dropdown to select TortoiseSVN action and target dir or file.

**It runs only on Windows and needs the TortoiseSVN and TortoiseSVN command line tools (TortoiseProc.exe).**
### add commands

* tortoise-svn.update : Open __update__ for the workspace rootPath
* tortoise-svn.commit : Open __commit__ for the workspace rootPath
* tortoise-svn.log : Open __log__ for the workspace rootPath
* tortoise-svn.revert : Open __revert__ for the workspace rootPath
* tortoise-svn.clear : Open __clear__ for the workspace rootPath
* tortoise-svn.add : Open __add__ for the workspace rootPath
* tortoise-svn.diff : Open __diff__ for the workspace rootPath
* tortoise-svn.blame : Open __blame__ for the workspace rootPath
* tortoise-svn.lock : Open __lock__ for the workspace rootPath
* tortoise-svn.unlock : Open __unlock__ for the workspace rootPath
* tortoise-svn.unlock : Open __unlock__ for the workspace rootPath
* tortoise-svn... : show __dropdown__ for to select target dir or file,then show a new  __dropdown__  to select TortoiseSVN action and

### add keybindings

* `alt+s u` : "onCommand:tortoise-svn.update"
* `alt+s c` : "onCommand:tortoise-svn.commit"
* `alt+s l` : "onCommand:tortoise-svn.log"
* `alt+s r` : "onCommand:tortoise-svn.revert"
* `alt+s d` : "onCommand:tortoise-svn.diff"
* `alt+s m` : "onCommand:tortoise-svn..."

## Requirements

If TortoiseSVN is not installed at `C:\\Program Files\\TortoiseSVN\\bin\\TortoiseProc.exe`, specify the correct path
by setting property `TortoiseSVN.tortoiseSVNProcExePath` in user `settings.json`. 

## Extension Settings

This extension contributes the following settings:

* `TortoiseSVN.autoCloseUpdateDialog` : enable/disable auto close dialog when no errors, conflicts and merges.
* `TortoiseSVN.tortoiseSVNProcExePath` : specify the correct `TortoiseProc.exe` path

## Links

[Change log](https://github.com/fantacytyx/vscode-tortoise-svn/blob/master/CHANGELOG.md)

[Source on GitHub](https://github.com/fantacytyx/vscode-tortoise-svn)

[MIT](https://github.com/fantacytyx/vscode-tortoise-svn/blob/master/LICENSE)

**Enjoy!**