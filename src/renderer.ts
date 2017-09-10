import { ipcRenderer } from 'electron'
import { basename } from 'path'
import { loadFile } from './fs/load-file'
import { setText, setTitle } from './ui/document/document'
import './ui/drag-n-drop/drag-n-drop'
import './ui/settings/default-settings'
import './ui/settings/window-settings'

ipcRenderer.on('open-file', (_: any, filePath: string) => {
    setTitle(basename(filePath))
    setText(loadFile(filePath))
})
