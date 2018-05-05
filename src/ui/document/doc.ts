import { ipcRenderer } from 'electron'
import { basename, extname } from 'path'
import * as storage from '../../fs/storage'
import { setFileMenuItemsEnable } from '../../utils/general-utils'
import DocumentMode from './document-mode'
import createRendererFor from './renderer/renderer-factory'

export default class Doc {
    private appName: string
    private asciiContainer: HTMLElement
    private ansiContainer: HTMLElement
    private documentMode: DocumentMode

    constructor(appName: string) {
        this.appName = appName
        this.asciiContainer = document.getElementById('ascii_container')!
        this.ansiContainer = document.getElementById('ansi_container')!
        this.documentMode = new DocumentMode()
        this.updateColors()
    }

    public open(filePath: string): void {
        this.setTitle(`${basename(filePath)} - ${this.appName}`)
        const extension = extname(filePath).toLowerCase()
        this.documentMode.setModeFor(extension)
        const renderer = createRendererFor(extension)
        renderer.render(filePath)
        setFileMenuItemsEnable(true)
    }

    public close(): void {
        this.ansiContainer.innerHTML = ''
        this.asciiContainer.innerHTML = ''
        this.setTitle(this.appName)
        setFileMenuItemsEnable(false)
    }

    private setTitle(title: string): void {
        document.title = title
    }

    private updateColors(): void {
        // bg color is updated in DocumentMode
        ipcRenderer.send('text-color-changed', storage.getTextColor())
        ipcRenderer.send('link-color-changed', storage.getLinkColor())
        ipcRenderer.send('selection-color-changed', storage.getSelectionColor())
    }
}
