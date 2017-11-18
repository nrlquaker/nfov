import anchorme from 'anchorme'
import { basename } from 'path'
import { loadFile } from '../../fs/load-file'
import * as storage from '../../fs/storage'
import { openLinksInExternalBrowser, setFileMenuItemsEnable } from '../../utils/general-utils'
import { anchormeOptions } from './anchorme-options'
import * as documentStyle from './document-style'

export class Doc {
    private appName: string
    private document: Document
    private container: HTMLElement

    constructor(appName: string, document: Document) {
        this.appName = appName
        this.document = document
        this.container = document.getElementById('app-container')!
    }

    public open(filePath: string): void {
        this.setTitle(`${basename(filePath)} - ${this.appName}`)
        this.container.scrollIntoView()
        this.setText(anchorme(loadFile(filePath), anchormeOptions))
        documentStyle.setLinkColor(storage.getLinkColor())
        openLinksInExternalBrowser()
        setFileMenuItemsEnable(true)
    }

    public close(): void {
        this.setTitle(this.appName)
        this.setText('')
        setFileMenuItemsEnable(false)
    }

    private setTitle(title: string): void {
        this.document.title = title
    }

    private setText(text: string): void {
        this.container.innerHTML = text
    }
}
