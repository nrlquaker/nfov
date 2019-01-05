import { ipcRenderer } from 'electron'
import * as storage from '../../fs/storage'
import { detectFileType, FileType } from '../settings/supported-files'
import Container from './containers/container'
import ImageContainer from './containers/image-container'
import TextContainer from './containers/text-container'

export default class DocumentMode {
    private containers = new Map<string, Container>([
        ['text', new TextContainer()],
        ['image', new ImageContainer()]
    ])

    constructor() {
        this.setMode('text')
        this.updateColors()
    }

    public setModeFor(extension: string): void {
        const fileType = detectFileType(extension)
        this.setMode(fileType === FileType.Ascii ? 'text' : 'image')
    }

    public resetMode(): void {
        this.containers.forEach((container, _) => container.clear())
    }

    private setMode(mode: string): void {
        this.containers.forEach((container, _) => {
            const currentContainer = this.containers.get(mode)!
            if (container !== currentContainer) {
                container.hide()
                container.clear()
            } else {
                container.clear()
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
