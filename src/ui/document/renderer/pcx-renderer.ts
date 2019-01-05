import { ipcRenderer } from 'electron'
import * as fs from 'fs'
// @ts-ignore: no type definition
import * as pcx from 'pcx-js'
import DocumentRenderer from './document-renderer'

export default class PcxRenderer implements DocumentRenderer {
    private container = document.getElementById('image_container')! as HTMLCanvasElement

    public render(filePath: string): void {
        const buffer = fs.readFileSync(filePath)
        const myPcx = new pcx(buffer)
        const pcxData = myPcx.decode()
        const width = pcxData.width
        const height = pcxData.height
        const canvas = document.createElement('canvas')
        canvas.style.verticalAlign = 'bottom'
        canvas.style.display = 'inline-block'
        const context = canvas.getContext('2d')!
        context.canvas.width = width
        context.canvas.height = height
        const imageData = new ImageData(width, height)
        imageData.data.set(pcxData.pixelArray)
        context.putImageData(imageData, 0, 0)
        this.container.appendChild(canvas)
        ipcRenderer.send('window-size-changed', width, height)
    }
}
