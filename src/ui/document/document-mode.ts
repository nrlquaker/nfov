import { getBgColor } from '../../fs/storage'
import { detectFileType, FileType } from '../settings/supported-files'
import { setBgColor } from './ascii-document-style'

export default class DocumentMode {
    private asciiContainer = document.getElementById('ascii_container')!
    private ansiContainer = document.getElementById('ansi_container')!

    constructor() {
        this.setAsciMode()
    }

    public setModeFor(extension: string): void {
        switch (detectFileType(extension)) {
            case FileType.ASCII:
                this.setAsciMode()
                break
            case FileType.ANSI:
                this.setAnsiMode()
                break
        }
    }

    private setAnsiMode(): void {
        setBgColor('#000000')
        this.asciiContainer.style.display = 'none'
        this.ansiContainer.style.display = 'block'
    }

    private setAsciMode(): void {
        setBgColor(getBgColor())
        this.ansiContainer.style.display = 'none'
        this.asciiContainer.style.display = 'inline-block'
    }
}
