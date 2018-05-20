import { ipcRenderer, remote } from 'electron'
import * as asciiDocumentStyle from './ui/document/ascii-document-style'
import Doc from './ui/document/doc'
import './ui/document/enable-drag-and-drop'
import './ui/settings/window-settings'
import { saveImage } from './utils/general-utils'

const doc = new Doc(remote.app.getName())

ipcRenderer.on('open-file', (_: any, filePath: string) => {
    doc.open(filePath)
    remote.app.addRecentDocument(filePath)
})

ipcRenderer.on('show-open-dialog', () => ipcRenderer.send('show-open-dialog'))

ipcRenderer.on('show-export-dialog', () => ipcRenderer.send('show-export-dialog'))

ipcRenderer.on('export-to-png', () => ipcRenderer.send('export-to-png'))

ipcRenderer.on('close-file', () => doc.close())

ipcRenderer.on('export-to-png', (_: any, fileName: string) => {
    saveImage(fileName).then(() => remote.app.dock.downloadFinished(fileName))
})

ipcRenderer.on('open-preferences', () => ipcRenderer.send('open-preferences'))

ipcRenderer.on('bg-color-changed', (_: any, color: string) => {
    asciiDocumentStyle.setBgColor(color)
})

ipcRenderer.on('text-color-changed', (_: any, color: string) => {
    asciiDocumentStyle.setTextColor(color)
})

ipcRenderer.on('link-color-changed', (_: any, color: string) => {
    asciiDocumentStyle.setLinkColor(color)
})

ipcRenderer.on('selection-color-changed', (_: any, color: string) => {
    asciiDocumentStyle.setSelectionColor(color)
})

ipcRenderer.on('font-changed', (_: any, fontName: string) => {
    asciiDocumentStyle.setFont(fontName)
})

ipcRenderer.on('font-size-changed', (_: any, fontSize: string) => {
    asciiDocumentStyle.setFontSize(fontSize)
})

ipcRenderer.on('font-smooting-changed', (_: any, enabled: boolean) => {
    asciiDocumentStyle.enableFontSmoothing(enabled)
})

ipcRenderer.on('links-highlighting-changed', (_: any, enabled: boolean) => {
    asciiDocumentStyle.enableLinksHighlighting(enabled)
})
