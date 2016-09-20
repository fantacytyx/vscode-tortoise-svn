'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as child_process from 'child_process';
import * as path from 'path';
import * as glob from 'glob';

interface ActionQuickPickItem extends vscode.QuickPickItem {
    action: string
}
interface QuickPickItemForPath extends vscode.QuickPickItem {
    isDir: boolean
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
    let actions: string[] = ['update', 'commit', 'revert', 'cleanup', 'log', 'add', 'diff', 'blame', 'lock', 'unlock'];
    actions.forEach((command) => {
        let action = command;
        let disposable = vscode.commands.registerCommand(`tortoise-svn.${command}`, () => {
            tortoiseCommand.exec(action, vscode.workspace.rootPath);
        });

        context.subscriptions.push(disposable);
    });

    /* add command tortoise-svn... that need something choose*/
    let actionQuickPickItems = actions.map(action => {
        return {
            label: 'svn: ' + action,
            description: '',
            action: action
        };
    });
    let disposableNeedChoose = vscode.commands.registerCommand('tortoise-svn...', () => {
        // exec every time on command trigger
        getQuickPickItemsFromDir(vscode.workspace.rootPath, quickPickItems => {
            // show dor or file paths
            vscode.window.showQuickPick<QuickPickItemForPath>(quickPickItems).then((path) => {
                if (path) {
                    // show actions
                    actionQuickPickItems.forEach((actionQuickPickItem) => {
                        actionQuickPickItem.description = path.label;
                    });
                    vscode.window.showQuickPick<ActionQuickPickItem>(actionQuickPickItems).then((action) => {
                        if (action) {
                            tortoiseCommand.exec(action.action, path.description);
                        }
                    });
                }
            });
        });
    });
    context.subscriptions.push(disposableNeedChoose);
}

/**
 * 获取目录下的所有文件夹和文件的绝对路径
 * 
 * @param {string} dirPath
 * @param {Function} callback
 */
function getQuickPickItemsFromDir(dirPath: string, callback: Function): void {
    let quickPickItems: QuickPickItemForPath[] = [{
        label: '$workspace',
        description: dirPath,
        isDir: true
    }];
    glob('**/', { cwd: dirPath }, (err, dirPaths) => {
        if (err) throw err;
        dirPaths.forEach(dir => {
            quickPickItems.push({
                label: dir,
                description: path.join(vscode.workspace.rootPath, dir),
                isDir: true
            });
        });

        glob('**', { cwd: dirPath, nodir: true }, (err, filePaths) => {
            if (err) throw err;

            filePaths.forEach(file => {
                quickPickItems.push({
                    label: file,
                    description: '',
                    isDir: false
                });
            });

            callback && callback(quickPickItems);
        })
    });
}
// this method is called when your extension is deactivated
export function deactivate() {
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