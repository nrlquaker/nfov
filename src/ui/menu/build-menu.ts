import { app, Menu } from 'electron'
import * as clicks from './menu-clicks'

export default function buildMenu(isDevMode: boolean): Electron.Menu {
    const template: Electron.MenuItemConstructorOptions[] = [
        {
            label: app.getName(),
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                {
                    label: 'Preferences',
                    accelerator: 'Cmd+,',
                    click: clicks.openPreferences()
                },
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
                {
                    label: 'Open...',
                    accelerator: 'Cmd+O',
                    click: clicks.openFile()
                },
                {
                    label: 'Export to png...',
                    accelerator: 'Cmd+E',
                    click: clicks.exportToPng(),
                    enabled: false
                },
                {
                    label: 'Close',
                    accelerator: 'Cmd+W',
                    click: clicks.closeFile(),
                    enabled: false
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'selectall' }
            ]
        },
        {
            label: 'View',
            submenu: [{ role: 'togglefullscreen' }]
        },
        {
            role: 'window',
            submenu: [
                { role: 'minimize' },
                { role: 'close' },
                { role: 'toggledevtools', accelerator: 'Cmd+I', visible: isDevMode }
            ]
        },
        {
            role: 'help',
            submenu: [
                { label: 'Open homepage...', click: clicks.openHomepage() },
                { label: 'Repor issue...', click: clicks.reportIssue() }
            ]
        }
    ]
    return Menu.buildFromTemplate(template)
}
