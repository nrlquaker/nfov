import { app, Menu } from 'electron'
import { openFile } from './menu-clicks'

export function buildMenu(): Electron.Menu {
    const template: Electron.MenuItemConstructorOptions[] = [
        {
            label: 'File',
            submenu: [{ label: 'Open...', accelerator: 'CmdOrCtrl+O', click: openFile() }]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'pasteandmatchstyle' },
                { role: 'delete' },
                { role: 'selectall' }
            ]
        },
        {
            role: 'help',
            submenu: []
        }
    ]

    if (process.platform === 'darwin') {
            template.unshift({
                label: app.getName(),
                submenu: [
                    { role: 'about' },
                    { type: 'separator' },
                    { role: 'services', submenu: [] },
                    { type: 'separator' },
                    { role: 'hide' },
                    { role: 'hideothers' },
                    { role: 'unhide' },
                    { type: 'separator' },
                    { role: 'quit' }
                ]
            },
        },
    return Menu.buildFromTemplate(template)
}
