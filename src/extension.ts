'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as child_process from 'child_process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "tortoisesvn" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let actions: string[] = ['update', 'commit', 'revert', 'clear', 'log', 'add', 'diff', 'blame', 'lock', 'unlock'];
    actions.forEach((command) => {
        let tortoiseCommand = new TortoiseCommand(command, vscode.workspace.rootPath);
        let disposable = vscode.commands.registerCommand(`tortoiseSVN.${command}`, (fileUri: vscode.Uri) => {
            // The code you place here will be executed every time your command is executed

            // vscode.window.showInformationMessage(command);
            tortoiseCommand.exec(fileUri);

        });

        context.subscriptions.push(disposable);
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}

class TortoiseCommand {
    private tortoiseSVNProcExePath: string;
    constructor(private action: string, private targetPath?: string) {
        this.tortoiseSVNProcExePath = this._getTortoiseSVNProcExePath();
    }
    private _getTortoiseSVNProcExePath(): string {
        return vscode.workspace.getConfiguration('tortoiseSVN').get('tortoiseSVNProcExePath').toString();
    }
    private _getTargetPath(fileUri: vscode.Uri): string {
        if (this.targetPath) {
            return this.targetPath;
        }

        let fileName = '';
        if (fileUri && fileUri.fsPath) {
            fileName = fileUri.fsPath;
        } else {
            if (!vscode.window.activeTextEditor || !vscode.window.activeTextEditor.document) {
                fileName = vscode.workspace.rootPath;
            } else {
                fileName = vscode.window.activeTextEditor.document.fileName;
            }
        }
        return fileName;
    }
    private _getCommand(fileUri: vscode.Uri) {
        let closeonend = vscode.workspace.getConfiguration('tortoiseSVN').get('autoCloseUpdateDialog') ? 3 : 0;
        return `"${this.tortoiseSVNProcExePath}" /command:${this.action} /path:"${this._getTargetPath(fileUri)}" /closeonend:${closeonend}`;
    }
    exec(fileUri: vscode.Uri) {
        child_process.exec(this._getCommand(fileUri), (error, stdout, stderr) => {
            console.log(error);
            console.log(stdout);
            console.log(stderr);
        });
    }
}