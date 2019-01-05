import { ipcRenderer } from 'electron'
import DocumentRenderer from './document-renderer'

export default class ImageRenderer implements DocumentRenderer {
    private container = document.getElementById('image_container')!

    public render(filePath: string): void {
        const img = new Image()
        img.src = escape(filePath)
        img.style.verticalAlign = 'bottom'
        img.onload = () => ipcRenderer.send('window-size-changed', img.width, img.height)
        this.container.appendChild(img)
    }
}
