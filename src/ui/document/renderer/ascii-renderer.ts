import anchorme from 'anchorme'
import { ipcRenderer } from 'electron'
import loadFile from '../../../fs/load-file'
import * as storage from '../../../fs/storage'
import { openLinksInExternalBrowser } from '../../../utils/general-utils'
import anchormeOptions from '../anchorme-options'
import { setLinkColor } from '../ascii-document-style'
import DocumentRenderer from './document-renderer'

export default class AsciiRenderer implements DocumentRenderer {
    private asciiContainer = document.getElementById('ascii_container')!

    public render(filePath: string): void {
        this.setText(anchorme(loadFile(filePath), anchormeOptions))
        setLinkColor(storage.getLinkColor())
        openLinksInExternalBrowser()
        this.asciiContainer.scrollIntoView()
        ipcRenderer.send(
            'window-size-changed',
            this.asciiContainer.scrollWidth,
            this.asciiContainer.clientHeight
        )
    }

    // Trim trailing spaces before newlines
    private setText(text: string): void {
        this.asciiContainer.innerHTML = text.replace(/[^\S\r\n]+$/gm, '')
    }
}
