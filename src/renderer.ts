import { ipcRenderer, remote } from 'electron'
import { basename } from 'path'
import { loadFile } from './fs/load-file'
import { Contract } from './processes-contract'
import { setText, setTitle } from './ui/document/document'
import './ui/drag-n-drop/drag-n-drop'
import './ui/settings/default-settings'
import './ui/settings/window-settings'

ipcRenderer.on(Contract.OPEN_FILE, (_: any, filePath: string) => {
    setTitle(`${basename(filePath)} - ${remote.app.getName()}`)
    setText(loadFile(filePath))
})

ipcRenderer.on(Contract.CLOSE_FILE, () => {
    setTitle(remote.app.getName())
    setText('')
})
