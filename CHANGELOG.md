### Version 0.1.1
* when user don't set `TortoiseSVN.tortoiseSVNProcExePath`, get the `TortoiseProc.exe` path from registry 
* postpone check `TortoiseProc.exe` path until command execution

### Version 0.0.7
* fix can't revert unsaved changes
* remove unused package minimatch
* optimize activationEvents in package.json

### Version 0.0.6
* check `TortoiseProc.exe` path. If it is invaild will show a hint

### Version 0.0.5
* `select path`: support setting `glob pattern` to exclude files
* `select path`: improve performance

### Version 0.0.4
* apply command to the select file/directory on explorer by use context menu item `SVN ... (Select Action) `
* add new commands for the active file which open in text editor and has focus
* remove `blame` command when target is directory
* modify command name and command title, such as `tortoise-svn...` -->  `SVN ... (Select Path)`
* remove menu `tortoise-svn log in workspace` from `explorer/context` and `editor/context` 
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