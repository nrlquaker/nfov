import { ipcRenderer } from 'electron'
import DocumentRenderer from './document-renderer'

export default class AnsiRenderer implements DocumentRenderer {
    private container = document.getElementById('image_container')!

    public render(filePath: string): void {
        // needed because sometimes scroll is not reseted
        this.container.scrollIntoView()
        const isRetina = window.devicePixelRatio > 1
        // @ts-ignore: loaded in html
        AnsiLove.splitRender(escape(filePath), (canvases: HTMLCanvasElement[], _: any) => {
            this.container.style.width = canvases[0].style.width
            canvases.forEach((canvas: HTMLCanvasElement) => {
                canvas.style.verticalAlign = 'bottom'
                canvas.style.display = 'block'
                this.container.appendChild(canvas)
            })
            ipcRenderer.send(
                'window-size-changed',
                this.container.scrollWidth,
                this.container.clientHeight
            )
        }, 27, { 'bits': '8', '2x': isRetina ? 1 : 0 })
    }
}
