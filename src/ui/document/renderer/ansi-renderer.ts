import { ipcRenderer } from 'electron'
import DocumentRenderer from './document-renderer'

export default class AnsiRenderer implements DocumentRenderer {
    private ansiContainer = document.getElementById('ansi_container')!

    public render(filePath: string): void {
        this.ansiContainer.innerHTML = ''
        const isRetina = window.devicePixelRatio > 1
        // @ts-ignore: loaded in html
        AnsiLove.splitRender(filePath, (canvases: HTMLCanvasElement[], _: any) => {
            this.ansiContainer.style.width = canvases[0].style.width
            canvases.forEach((canvas: HTMLCanvasElement) => {
                canvas.style.verticalAlign = 'bottom'
                this.ansiContainer.appendChild(canvas)
            })
            ipcRenderer.send(
                'window-size-changed',
                this.ansiContainer.scrollWidth,
                this.ansiContainer.clientHeight
            )
        }, 27, { 'bits': '8', '2x': isRetina ? 1 : 0 })
    }
}
