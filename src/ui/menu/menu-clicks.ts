import { dialog, ipcMain, Menu } from 'electron'
import { ClickHandler } from './click-handler'

export function openFile(): ClickHandler {
    return (_, browserWindow) => {
        setCloseDocumentEnable(true)
        dialog.showOpenDialog(
            browserWindow,
            {
                filters: [{ name: 'nfo', extensions: ['nfo', 'diz'] }],
                properties: ['openFile']
            },
            (filePaths: string[]) => {
                if (!filePaths) return
                emit(browserWindow, 'open-file', filePaths[0])
            }
        )
    }
}

export function closeFile(): ClickHandler {
    return (_, browserWindow) => {
        setCloseDocumentEnable(false)
        emit(browserWindow, 'close-file')
    }
}

export function openPreferences(): ClickHandler {
    return (_, browserWindow) => {
        emit(browserWindow, 'open-preferences')
    }
}

function emit(window: Electron.BrowserWindow, channel: string, arg?: string) {
    if (window) {
        window.webContents.send(channel, arg)
    } else {
        ipcMain.emit(channel, '', arg)
    }
}

function setCloseDocumentEnable(enable: boolean) {
    const menu = Menu.getApplicationMenu()
    menu.items[1].submenu!.items[1].enabled = enable
}
