import { app, Menu } from 'electron'
import { closeFile, openFile, openHomepage, openPreferences, reportIssue } from './menu-clicks'

export function buildMenu(): Electron.Menu {
    const template: Electron.MenuItemConstructorOptions[] = [
        {
            label: app.getName(),
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { label: 'Preferences', accelerator: 'Cmd+,', click: openPreferences() },
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
        {
            label: 'File',
            submenu: [
                { label: 'Open...', accelerator: 'Cmd+O', click: openFile() },
                { label: 'Close', accelerator: 'Cmd+W', click: closeFile(), enabled: false }
            ]
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
            role: 'window',
            submenu: [{ role: 'minimize' }, { role: 'close' }]
        },
        {
            role: 'help',
            submenu: [
                { label: 'Open homepage...', click: openHomepage() },
                { label: 'Repor issue...', click: reportIssue() }
            ]
        }
    ]
    return Menu.buildFromTemplate(template)
}
