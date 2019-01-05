import { ipcRenderer } from 'electron'
import * as storage from '../../fs/storage'
import { detectFileType, FileType } from '../settings/supported-files'
import AnsiContainer from './containers/ansi-container'
import AsciiContainer from './containers/ascii-container'
import Container from './containers/container'
import PcxContainer from './containers/pcx-container'

export default class DocumentMode {
    private containers = new Map<string, Container>([
        ['ascii', new AsciiContainer()],
        ['ansi', new AnsiContainer()],
        ['pcx', new PcxContainer()]
    ])
    private currentContainer!: Container

    constructor() {
        this.setMode('ascii')
        this.updateColors()
    }

    public setModeFor(extension: string): void {
        switch (detectFileType(extension)) {
            case FileType.Ascii:
                this.setMode('ascii')
                break
            case FileType.Ansi:
                this.setMode('ansi')
                break
            default:
                this.setMode('pcx')
        }
    }

    public resetMode(): void {
        this.containers.forEach((container, _) => container.clear())
    }

    private setMode(mode: string): void {
        this.currentContainer = this.containers.get(mode)!
        this.containers.forEach((container, _) => {
            if (container !== this.currentContainer) {
                container.hide()
                container.clear()
            } else {
                container.show()
            }
        })
    }

    private updateColors(): void {
        ipcRenderer.send('text-color-changed', storage.getTextColor())
        ipcRenderer.send('link-color-changed', storage.getLinkColor())
        ipcRenderer.send('selection-color-changed', storage.getSelectionColor())
        ipcRenderer.send('font-changed', storage.getFontName())
        ipcRenderer.send('font-size-changed', storage.getFontSize())
        ipcRenderer.send('font-smooting-changed', storage.getFontSmoothing())
    }
}
