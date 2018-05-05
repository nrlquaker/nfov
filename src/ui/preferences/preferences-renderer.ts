import { ipcRenderer } from 'electron'
import '../settings/disable-drag-n-drop'
import '../settings/window-settings'

ipcRenderer.on('close-file', () => ipcRenderer.send('close-file'))

ipcRenderer.on('show-open-dialog', () => ipcRenderer.send('show-open-dialog'))

ipcRenderer.on('show-export-dialog', () => ipcRenderer.send('show-export-dialog'))
