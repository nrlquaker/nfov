import { ipcRenderer } from 'electron'
import * as fs from 'fs'
// @ts-ignore: no type definition
import * as pcx from 'pcx-js'
import DocumentRenderer from './document-renderer'

export default class PcxRenderer implements DocumentRenderer {
    private pcxContainer = document.getElementById('pcx_container')! as HTMLCanvasElement

    public render(filePath: string): void {
        this.pcxContainer.innerHTML = ''
        const buffer = fs.readFileSync(filePath)
        const myPcx = new pcx(buffer)
        const pcxData = myPcx.decode()
        const width = pcxData.width
        const height = pcxData.height
        const ctx = this.pcxContainer.getContext('2d')!
        ctx.canvas.width = width
        ctx.canvas.height = height
        const imageData = new ImageData(width, height)
        imageData.data.set(pcxData.pixelArray)
        ctx.putImageData(imageData, 0, 0)
        ipcRenderer.send(
            'window-size-changed',
            this.pcxContainer.scrollWidth,
            this.pcxContainer.clientHeight
        )
    }
}
