import { ipcRenderer, remote } from 'electron'
import { Doc } from './ui/document/doc'
import * as documentStyle from './ui/document/document-style'
import './ui/document/enable-drag-and-drop'
import './ui/settings/window-settings'
import { saveImage } from './utils/general-utils'

const doc = new Doc(remote.app.getName(), document)

ipcRenderer.on('open-file', (_: any, filePath: string) => {
    doc.open(filePath)
    remote.app.addRecentDocument(filePath)
})

ipcRenderer.on('close-file', () => {
    doc.close()
})

ipcRenderer.on('export-to-png', (_: any, fileName: string) => {
    saveImage(fileName).then(() => remote.app.dock.downloadFinished(fileName))
})

ipcRenderer.on('open-preferences', () => {
    ipcRenderer.send('open-preferences')
})

ipcRenderer.on('bg-color-changed', (_: any, color: string) => {
    documentStyle.setBgColor(color)
})

ipcRenderer.on('text-color-changed', (_: any, color: string) => {
    documentStyle.setTextColor(color)
})

ipcRenderer.on('link-color-changed', (_: any, color: string) => {
    documentStyle.setLinkColor(color)
})

ipcRenderer.on('selection-color-changed', (_: any, color: string) => {
    documentStyle.setSelectionColor(color)
})

ipcRenderer.on('font-changed', (_: any, fontName: string) => {
    documentStyle.setFont(fontName)
})

ipcRenderer.on('font-size-changed', (_: any, fontSize: string) => {
    documentStyle.setFontSize(fontSize)
})

ipcRenderer.on('font-smooting-changed', (_: any, enabled: boolean) => {
    documentStyle.enableFontSmoothing(enabled)
})
