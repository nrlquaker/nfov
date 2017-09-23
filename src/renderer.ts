import anchorme from 'anchorme'
import { ipcRenderer, remote, shell } from 'electron'
import { basename } from 'path'
import { loadFile } from './fs/load-file'
import { setText, setTitle } from './ui/document/document'
import * as userPreferences from './ui/preferences/user-preferences'
import './ui/settings/window-settings'

const container = document.getElementById('app-container')

document.addEventListener('drop', (e) => {
    e.preventDefault()
    e.stopPropagation()
    const fileName = e.dataTransfer.files[0].path.toLowerCase()
    if (fileName.endsWith('nfo') || fileName.endsWith('diz')) {
        ipcRenderer.send('open-file', fileName)
    }
})
document.addEventListener('dragover', (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'copy'
})

ipcRenderer.on('open-file', (_: any, filePath: string) => {
    setTitle(`${basename(filePath)} - ${remote.app.getName()}`)
    container!.scrollIntoView()
    setText(anchorme(loadFile(filePath)))
    openLinksInExternalBrowser()
    setCloseDocumentEnable(true)
})

ipcRenderer.on('close-file', () => {
    setTitle(remote.app.getName())
    setText('')
    setCloseDocumentEnable(false)
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

ipcRenderer.on('font-changed', (_: any, fontName: string) => {
    userPreferences.setFont(fontName)
})

ipcRenderer.on('font-size-changed', (_: any, fontSize: string) => {
    userPreferences.setFontSize(fontSize)
})

function setCloseDocumentEnable(enable: boolean) {
    const menu = remote.Menu.getApplicationMenu()
    menu.items[1].submenu!.items[1].enabled = enable
}

function openLinksInExternalBrowser() {
    const links = document.querySelectorAll('a[href]')
    Array.prototype.forEach.call(links, (link: Element) => {
        const url = link.getAttribute('href')
        if (url!.indexOf('http') === 0) {
            link.addEventListener('click', (e) => {
                e.preventDefault()
                shell.openExternal(url!)
            })
        }
    })
}
