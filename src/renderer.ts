import { ipcRenderer, remote } from 'electron'
import { Doc } from './ui/document/doc'
import './ui/document/enable-drag-and-drop'
import * as userPreferences from './ui/preferences/user-preferences'
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
    userPreferences.setBgColor(color)
})

ipcRenderer.on('text-color-changed', (_: any, color: string) => {
    userPreferences.setTextColor(color)
})

ipcRenderer.on('link-color-changed', (_: any, color: string) => {
    userPreferences.setLinkColor(color)
})

ipcRenderer.on('font-changed', (_: any, fontName: string) => {
    userPreferences.setFont(fontName)
})

ipcRenderer.on('font-size-changed', (_: any, fontSize: string) => {
    userPreferences.setFontSize(fontSize)
})
