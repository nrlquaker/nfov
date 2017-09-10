import { dialog } from 'electron'
import { ClickHandler } from './click-handler'

export function openFile(): ClickHandler {
    return (_, browserWindow) => {
        dialog.showOpenDialog(
            browserWindow,
            {
                filters: [{ name: 'nfo', extensions: ['nfo', 'diz'] }],
                properties: ['openFile']
            },
            (filePaths: string[]) => {
                if (filePaths === undefined) return
                browserWindow.webContents.send('open-file', filePaths[0])
            }
        )
    }
}
