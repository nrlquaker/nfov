import { basename, extname } from 'path'
import { setFileMenuItemsEnable } from '../../utils/general-utils'
import DocumentMode from './document-mode'
import createRendererFor from './renderer/renderer-factory'

export default class Doc {
    private appName: string
    private documentMode = new DocumentMode()

    constructor(appName: string) {
        this.appName = appName
    }

    public open(filePath: string): void {
        this.setTitle(basename(filePath))
        const extension = extname(filePath).toLowerCase()
        this.documentMode.setModeFor(extension)
        const renderer = createRendererFor(extension)
        renderer.render(filePath)
        setFileMenuItemsEnable(true)
    }

    public close(): void {
        this.documentMode.resetMode()
        this.setTitle(this.appName)
        setFileMenuItemsEnable(false)
    }

    private setTitle(title: string): void {
        document.title = title
    }
}
