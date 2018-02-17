import { ipcMain, shell } from 'electron'
import { ClickHandler } from './click-handler'

export function openFile(): ClickHandler {
    return (_, browserWindow) => emit(browserWindow, 'show-open-dialog')
}

export function exportToPng(): ClickHandler {
    return (_, browserWindow) => emit(browserWindow, 'show-export-dialog')
}

export function closeFile(): ClickHandler {
    return (_, browserWindow) => emit(browserWindow, 'close-file')
}

export function openPreferences(): ClickHandler {
    return (_, browserWindow) => emit(browserWindow, 'open-preferences')
}

export function toggleDevTools(): ClickHandler {
    return (_, focusedWindow) => {
        if (focusedWindow) {
            focusedWindow.webContents.toggleDevTools()
        }
    }
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
