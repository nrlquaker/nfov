import { app, dialog, ipcMain, shell } from 'electron'
import { basename } from 'path'
import { ClickHandler } from './click-handler'

let lastOpenedFile: string

export function openFile(): ClickHandler {
    return (_, browserWindow) => {
        dialog.showOpenDialog(
            browserWindow,
            {
                filters: [{ name: 'nfo', extensions: ['nfo', 'diz'] }],
                properties: ['openFile']
            },
            (filePaths: string[]) => {
                if (!filePaths) return
                lastOpenedFile = filePaths[0]
                emit(browserWindow, 'open-file', filePaths[0])
            }
        )
    }
}

export function exportToPng(): ClickHandler {
    return (_, browserWindow) => {
        dialog.showSaveDialog(
            browserWindow,
            {
                defaultPath: `${app.getPath('downloads')}/${basename(lastOpenedFile)}.png`
            },
            (fileName: string) => {
                if (!fileName) return
                emit(browserWindow, 'export-to-png', fileName)
            }
        )
    }
}

export function closeFile(): ClickHandler {
    return (_, browserWindow) => emit(browserWindow, 'close-file')
}

export function openPreferences(): ClickHandler {
    return (_, browserWindow) => emit(browserWindow, 'open-preferences')
}

export function openHomepage(): ClickHandler {
    return () => shell.openExternal('https://github.com/nrlquaker/nfov')
}

export function reportIssue(): ClickHandler {
    return () => shell.openExternal('https://github.com/nrlquaker/nfov/issues/new')
}

function emit(window: Electron.BrowserWindow, channel: string, arg?: string): void {
    if (window) {
        window.webContents.send(channel, arg)
    } else {
        ipcMain.emit(channel, '', arg)
    }
}
