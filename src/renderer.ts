import anchorme from 'anchorme'
import { ipcRenderer, remote, shell } from 'electron'
import { basename } from 'path'
import { loadFile } from './fs/load-file'
import { setText, setTitle } from './ui/document/document'
import './ui/drag-n-drop/drag-n-drop'
import './ui/settings/default-settings'
import { setBgColor, setTextColor } from './ui/settings/settings'
import './ui/settings/window-settings'

const container = document.getElementById('app-container')

ipcRenderer.on('open-file', (_: any, filePath: string) => {
    setTitle(`${basename(filePath)} - ${remote.app.getName()}`)
    container!.scrollIntoView()
    setText(anchorme(loadFile(filePath)))
    openLinksInExternalBrowser()
})

ipcRenderer.on('close-file', () => {
    setTitle(remote.app.getName())
    setText('')
})

ipcRenderer.on('open-preferences', () => {
    ipcRenderer.send('open-preferences')
})

ipcRenderer.on('bg-color-changed', (_: any, msg: string) => {
    setBgColor(msg)
})

ipcRenderer.on('text-color-changed', (_: any, msg: string) => {
    setTextColor(msg)
})

function openLinksInExternalBrowser() {
    const links = document.querySelectorAll('a[href]')
    Array.prototype.forEach.call(links, (link: Element) => {
        const url = link.getAttribute('href')
        if (url!.indexOf('http') === 0) {
            link.addEventListener('click', (e) => {
                e.preventDefault()
                shell.openExternal(url)
            })
        }
    })
}
