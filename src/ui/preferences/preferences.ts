import { ipcRenderer } from 'electron'
import '../settings/window-settings'

function updateTextColor(jscolor: string) {
    ipcRenderer.send('text-color-changed', '#' + jscolor)
}

function updateBgColor(jscolor: string) {
    ipcRenderer.send('bg-color-changed', '#' + jscolor)
}

ipcRenderer.on('close-file', (_: any) => {
    ipcRenderer.send('close-file')
})

ipcRenderer.on('open-file', (_: any, msg: string) => {
    ipcRenderer.send('open-file', msg)
})
