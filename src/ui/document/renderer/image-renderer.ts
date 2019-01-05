import { ipcRenderer } from 'electron'
import DocumentRenderer from './document-renderer'

export default class ImageRenderer implements DocumentRenderer {
    private imageContainer = document.getElementById('image_container')!

    public render(filePath: string): void {
        // TODO remove cleaning
        this.imageContainer.innerHTML = ''
        const img = new Image()
        img.src = filePath
        img.style.verticalAlign = 'bottom'
        img.onload = () => ipcRenderer.send('window-size-changed', img.width, img.height)
        this.imageContainer.appendChild(img)
    }
}
