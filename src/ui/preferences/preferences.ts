import { ipcRenderer } from 'electron'
import '../settings/window-settings'
import * as storage from './storage'
import { setViewerFont } from './user-preferences'

document.addEventListener('DOMContentLoaded', () => {
    const textCp = document.getElementById('cp_text') as HTMLInputElement
    storage.getTextColor((color: string) => {
        textCp.value = color
        ipcRenderer.send('text-color-changed', color)
    })

    const bgCp = document.getElementById('cp_bg') as HTMLInputElement
    storage.getBgColor((color: string) => {
        (bgCp.value = color)
        ipcRenderer.send('bg-color-changed', color)
    })

    setViewerFont('Terminus (TTF)')
})

function updateTextColor(jscolor: string) {
    storage.setTextColor('#' + jscolor)
    ipcRenderer.send('text-color-changed', '#' + jscolor)
}

function updateBgColor(jscolor: string) {
    storage.setBgColor('#' + jscolor)
    ipcRenderer.send('bg-color-changed', '#' + jscolor)
}

ipcRenderer.on('close-file', (_: any) => {
    ipcRenderer.send('close-file')
})

ipcRenderer.on('open-file', (_: any, msg: string) => {
    ipcRenderer.send('open-file', msg)
})
