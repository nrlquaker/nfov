import { ipcRenderer } from 'electron'
import '../settings/disable-drag-n-drop'
import '../settings/window-settings'
import * as storage from './storage'

document.addEventListener('DOMContentLoaded', () => {
    const textCp = document.getElementById('cp_text') as HTMLInputElement
    const textColor = storage.getTextColor()
    textCp.value = textColor
    ipcRenderer.send('text-color-changed', textColor)

    const bgCp = document.getElementById('cp_bg') as HTMLInputElement
    const bgColor = storage.getBgColor()
    bgCp.value = bgColor
    ipcRenderer.send('bg-color-changed', bgColor)

    const linkCp = document.getElementById('cp_link') as HTMLInputElement
    const linkColor = storage.getLinkColor()
    linkCp.value = linkColor
    ipcRenderer.send('link-color-changed', linkColor)

    const selectionCp = document.getElementById('cp_selection') as HTMLInputElement
    const selectionColor = storage.getSelectionColor()
    selectionCp.value = selectionColor
    ipcRenderer.send('selection-color-changed', selectionColor)

    const fontSelector = document.getElementById('font_selector') as HTMLSelectElement
    const fontName = storage.getFontName()
    fontSelector.value = fontName
    ipcRenderer.send('font-changed', fontName)

    fontSelector.addEventListener('change', () => {
        storage.setFontName(fontSelector.value)
        ipcRenderer.send('font-changed', fontSelector.value)
    })

    const fontSizeSelector = document.getElementById('font_size_selector') as HTMLSelectElement
    const fontSize = storage.getFontSize()
    fontSizeSelector.value = fontSize
    ipcRenderer.send('font-size-changed', fontSize)

    fontSizeSelector.addEventListener('change', () => {
        storage.setFontSize(fontSizeSelector.value)
        ipcRenderer.send('font-size-changed', fontSizeSelector.value)
    })
})

function updateTextColor(jscolor: string): void {
    storage.setTextColor('#' + jscolor)
    ipcRenderer.send('text-color-changed', '#' + jscolor)
}

function updateBgColor(jscolor: string): void {
    storage.setBgColor('#' + jscolor)
    ipcRenderer.send('bg-color-changed', '#' + jscolor)
}

function updateLinkColor(jscolor: string): void {
    storage.setLinkColor('#' + jscolor)
    ipcRenderer.send('link-color-changed', '#' + jscolor)
}

function updateSelectionColor(jscolor: string): void {
    storage.setSelectionColor('#' + jscolor)
    ipcRenderer.send('selection-color-changed', '#' + jscolor)
}

ipcRenderer.on('close-file', (_: any) => {
    ipcRenderer.send('close-file')
})

ipcRenderer.on('open-file', (_: any, msg: string) => {
    ipcRenderer.send('open-file', msg)
})

ipcRenderer.on('export-to-png', (_: any, msg: string) => {
    ipcRenderer.send('export-to-png', msg)
})
