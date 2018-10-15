import { ipcRenderer } from 'electron'
import { isFileSupported } from '../../ui/settings/supported-files'

document.addEventListener('drop', (e) => {
    e.preventDefault()
    e.stopPropagation()
    const fileName = e.dataTransfer!.files[0].path
    if (isFileSupported(fileName)) {
        ipcRenderer.send('open-file', fileName)
    }
})

document.addEventListener('dragover', (e) => {
    e.preventDefault()
    e.stopPropagation()
    const isFile = e.dataTransfer!.types[0] === 'Files'
    e.dataTransfer!.dropEffect = isFile ? 'copy' : 'none'
})
