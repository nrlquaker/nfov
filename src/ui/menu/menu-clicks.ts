import { dialog, Menu } from 'electron'
import { Contract } from '../../processes-contract'
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
                if (filePaths === undefined) return
                browserWindow.webContents.send(Contract.OPEN_FILE, filePaths[0])
            }
        )
    }
}

export function closeFile(): ClickHandler {
    return (_, browserWindow) => {
        setCloseDocumentEnable(false)
        browserWindow.webContents.send(Contract.CLOSE_FILE)
    }
}

function setCloseDocumentEnable(enable: boolean) {
    const menu = Menu.getApplicationMenu()
    menu.items[1].submenu!.items[1].enabled = enable
}
