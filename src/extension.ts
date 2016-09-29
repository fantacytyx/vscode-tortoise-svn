'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as child_process from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import * as glob from 'glob';

const DIRECTORY_ACTIONS: string[] = ['update', 'commit', 'revert', 'cleanup', 'log', 'add', 'diff', 'lock', 'unlock'];
const FILE_ACTIONS: string[] = ['update', 'commit', 'revert', 'cleanup', 'log', 'add', 'blame', 'diff', 'lock', 'unlock'];

interface SvnQuickPickItem extends vscode.QuickPickItem {
    action?: string;
    path: string;
}

interface UriInfo extends vscode.Uri {
    path: string;
    isDirectory: boolean;
    isFile: boolean;
    getActionQuickPickItem(): SvnQuickPickItem[];
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // console.log('Congratulations, your extension "tortoisesvn" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    /* add command tortoiseSVN actions that only useful workspace(vscode.workspace.rootPath)*/
    let tortoiseCommand = new TortoiseCommand();
    DIRECTORY_ACTIONS.forEach((action) => {
        let disposable = vscode.commands.registerCommand(`workspace tortoise-svn ${action}`, () => {
            tortoiseCommand.exec(action, vscode.workspace.rootPath);
        });

        context.subscriptions.push(disposable);
    });

    FILE_ACTIONS.forEach((action) => {
        let disposable = vscode.commands.registerCommand(`file tortoise-svn ${action}`, () => {
            let path: string = vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.uri.fsPath;
            if (!path) {
                vscode.window.showWarningMessage('only can be used when open a file on text editor');
                return;
            } else {
                tortoiseCommand.exec(action, path);
            }
        });

        context.subscriptions.push(disposable);
    });

    /* add command tortoise-svn... that need something choose*/
    let actionQuickPickItems = FILE_ACTIONS.map(action => {
        return {
            label: 'svn ' + action,
            description: '',
            action: action
        };
    });
    let disposableNeedChoose = vscode.commands.registerCommand('tortoise-svn ...', (uri: vscode.Uri) => {
        let uriInfo = new UriInfo(uri && uri.fsPath);
        let actionQuickPickItems = uriInfo.getActionQuickPickItem()
        vscode.window.showQuickPick<SvnQuickPickItem>(actionQuickPickItems).then((quickPickItem) => {
            if (quickPickItem) {
                tortoiseCommand.exec(quickPickItem.action, quickPickItem.path);
            }
        });
    });
    context.subscriptions.push(disposableNeedChoose);

    let disposableDropdown = vscode.commands.registerCommand('tortoise-svn ...(select path)', (uri: vscode.Uri) => {
        // exec every time on command trigger
        getQuickPickItemsFromDir(vscode.workspace.rootPath).then(quickPickItems=>{
            return vscode.window.showQuickPick<SvnQuickPickItem>(quickPickItems);
        }).then(path=>{
            if (!path) {
                return;
            }
            let uriInfo = new UriInfo(path.path);
            let actionQuickPickItems = uriInfo.getActionQuickPickItem()
            vscode.window.showQuickPick<any>(actionQuickPickItems).then((action) => {
                if (action) {
                    tortoiseCommand.exec(action.action, action.path);
                }
            });
        });
        context.subscriptions.push(disposableDropdown);
    });
}

/**
 * 获取目录下的所有文件夹和文件的绝对路径
 * 
 * @param {string} dirPath
 * @param {Function} callback
 */
function getQuickPickItemsFromDir(dirPath: string): Promise<SvnQuickPickItem[]> {
    return new Promise<SvnQuickPickItem[]>((resolve, reject) => {
        let quickPickItems: SvnQuickPickItem[] = [{
            label: dirPath,
            description: dirPath,
            path: dirPath
        }];
        let ignore = vscode.workspace.getConfiguration('TortoiseSVN').get('files.exclude');
        glob('**', { cwd: dirPath, mark: true, ignore: ignore }, (err, paths) => {
            if (err) throw err;
            paths.forEach(file => {
                var lastSep = file.lastIndexOf('/') + 1;
                if (lastSep === file.length) {
                    lastSep = 0;
                }
                quickPickItems.push({
                    label: file.substring(lastSep),
                    description: file.substr(0, lastSep),
                    path: path.join(vscode.workspace.rootPath, file)
                });
            });

            resolve(quickPickItems);
        });
    });

}


// this method is called when your extension is deactivated
export function deactivate() {
}

class UriInfo implements UriInfo {
    constructor(uri?: string) {
        let path: string;
        if (uri) {
            path = uri;
        } else {
            path = vscode.workspace.rootPath;
        }

        let stat: fs.Stats = fs.statSync(path);
        Object.assign<this, any>(
            this,
            {
                path: path,
                isFile: stat.isFile(),
                isDirectory: stat.isDirectory()
            }
        );
    }

    public getActionQuickPickItem(): SvnQuickPickItem[] {
        let quickPickItems: string[];
        if (this.isFile) {
            quickPickItems = FILE_ACTIONS;
        } else if (this.isDirectory) {
            quickPickItems = DIRECTORY_ACTIONS;
        }
        return quickPickItems.map<SvnQuickPickItem>(action => {
            return {
                label: 'svn ' + action,
                description: this.path,
                path: this.path,
                action: action
            }
        });
    }
}

class TortoiseCommand {
    private tortoiseSVNProcExePath: string;
    constructor() {
        this.tortoiseSVNProcExePath = this._getTortoiseSVNProcExePath();
    }
    private _getTortoiseSVNProcExePath(): string {
        return vscode.workspace.getConfiguration('TortoiseSVN').get('tortoiseSVNProcExePath').toString();
    }
    private _getTargetPath(fileUri: string): string {
        let path = '';
        if (fileUri) {
            path = fileUri;
        } else {
            if (!vscode.window.activeTextEditor || !vscode.window.activeTextEditor.document) {
                path = vscode.workspace.rootPath;
            } else {
                path = vscode.window.activeTextEditor.document.fileName;
            }
        }
        return path;
    }
    private _getCommand(action: string, fileUri: string) {
        let closeonend = vscode.workspace.getConfiguration('TortoiseSVN').get('autoCloseUpdateDialog') ? 3 : 0;
        return `"${this.tortoiseSVNProcExePath}" /command:${action} /path:"${this._getTargetPath(fileUri)}" /closeonend:${closeonend}`;
    }
    exec(action: string, fileUri: string) {
        child_process.exec(this._getCommand(action, fileUri), (error, stdout, stderr) => {
            console.log(error);
            console.log(stdout);
            console.log(stderr);
        });
    }
}