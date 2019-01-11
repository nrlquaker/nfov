import { basename, extname } from 'path'
import DocumentMenu from './document-menu'
import DocumentMode from './document-mode'
import createRendererFor from './renderer/renderer-factory'

export default class Doc {
    private appName: string
    private documentMode = new DocumentMode()
    private menu = new DocumentMenu()

    constructor(appName: string) {
        this.appName = appName
    }

    public open(filePath: string): void {
        this.setTitle(basename(filePath))
        const extension = extname(filePath).toLowerCase()
        this.documentMode.setModeFor(extension)
        const renderer = createRendererFor(extension)
        renderer.render(filePath)
        this.menu.updateFor(extension)
    }

    public close(): void {
        this.documentMode.resetMode()
        this.setTitle(this.appName)
        this.menu.onClose()
    }

    private setTitle(title: string): void {
        document.title = title
    }
}
