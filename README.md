#README

tortoise-svn is a simple extension for VSCode to use TortoiseSVN.

## Features

tortoise-svn provides commands to open TortoiseSVN window for workspace rootPath for update, commit, log, revert, cleanup, add, diff, blame, lock and unlock. 

tortoise-svn provides `dropdown` to select TortoiseSVN action and provides `dropdown` to select target dir or file.

**It runs only on Windows and needs the `TortoiseSVN` and TortoiseSVN command line tools (TortoiseProc.exe).**

### Commands

#### For the workspace rootPath
* `Workspace: SVN Update` : open TortoiseSVN `update` window
* `Workspace: SVN Commit` : open TortoiseSVN `commit` window
* `Workspace: SVN Log` : open TortoiseSVN `log` window
* `Workspace: SVN Revert` : open TortoiseSVN `revert` window
* `Workspace: SVN Cleanup` : open TortoiseSVN `cleanup` window
* `Workspace: SVN Add` : open TortoiseSVN `add` window
* `Workspace: SVN Diff` : open TortoiseSVN `diff` window
* `Workspace: SVN Lock` : open TortoiseSVN `lock` window
* `Workspace: SVN Unlock` : open TortoiseSVN `unlock` window

#### For the file which open in text editor and has focus
* `File: SVN Update` : open TortoiseSVN `update` window
* `File: SVN Commit` : open TortoiseSVN `commit` window
* `File: SVN Log` : open TortoiseSVN `log` window
* `File: SVN Revert` : open TortoiseSVN `revert` window
* `File: SVN Cleanup` : open TortoiseSVN `cleanup` window
* `File: SVN Add` : open TortoiseSVN `add` window
* `File: SVN Diff` : open TortoiseSVN `diff` window
* `File: SVN Lock` : open TortoiseSVN `lock` window
* `File: SVN Unlock` : open TortoiseSVN `unlock` window

#### Others
* SVN ... (Select Action) : show a `dropdown` to select TortoiseSVN action to execute.
    - Apply to the current file when trigger `SVN ... (Select Action) ` command use editor context menu.   
    - Apply to the select file/directory when trigger `SVN ... (Select Action) ` command use explorer context menu.   
    - Apply to the workspace when trigger `SVN ... (Select Action) ` command use command panel(F1/ctrl+shift+p).   

* SVN ... (Select Path) : show a `dropdown` to select target `directory` or `file`,then show a new  `dropdown` to select TortoiseSVN action to execute.

### Keybindings

* `alt+s u` : "Workspace: SVN Update"
* `alt+s c` : "Workspace: SVN Commit"
* `alt+s l` : "Workspace: SVN Log"
* `alt+s r` : "Workspace: SVN Revert"
* `alt+s d` : "Workspace: SVN Diff"
* `alt+s m` : "SVN ... (Select Path)"

## Requirements

If TortoiseSVN is not installed at `C:\\Program Files\\TortoiseSVN\\bin\\TortoiseProc.exe`, specify the correct path
by setting property `TortoiseSVN.tortoiseSVNProcExePath` in user `settings.json`. 

## Extension Settings

This extension contributes the following settings:

* `TortoiseSVN.autoCloseUpdateDialog` : enable/disable auto close dialog when no errors, conflicts and merges.
* `TortoiseSVN.tortoiseSVNProcExePath` : specify the correct `TortoiseProc.exe` path
* `TortoiseSVN.showPath.exclude` : setting  glob pattern to exclude files and folders. exclude will disable when specify a empty array

## Change Log
### Version 0.0.5
* `select path`: support setting glob pattern to exclude files
* `select path`: improvement performance

### Version 0.0.4
* support apply command to the select file/directory on explorer by use context menu item `SVN ... (Select Action) `
* add new commands for current focusing file
* directory remove `blame` command
* modify command name and command title
* remove menu `tortoise-svn log in workspace` to `explorer/context` and `editor/context` 
* improve keybindings configuration
* some bug fixed

### Version 0.0.3
* add command `tortoise-svn...` which can select TortoiseSVN action and target dir or file
* add menu `tortoise-svn...` to `explorer/context` and `editor/context` 
* add `keybindings` `alt+s m`: tortoise-svn...

### Version 0.0.2
* add more menu

### Version 0.0.1
* Initial release

## Links

[Change log](https://github.com/fantacytyx/vscode-tortoise-svn/blob/master/CHANGELOG.md)

[Source on GitHub](https://github.com/fantacytyx/vscode-tortoise-svn)

[MIT](https://github.com/fantacytyx/vscode-tortoise-svn/blob/master/LICENSE)

**Enjoy!**