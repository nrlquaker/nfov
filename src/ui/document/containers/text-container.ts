import * as storage from '../../../fs/storage'
import { setBgColor } from '../ascii-document-style'
import Container from './container'

export default class TextContainer implements Container {
    private container = document.getElementById('text_container')!

    public show(): void {
        setBgColor(storage.getBgColor())
        this.container.style.display = 'inline-block'
    }

    public hide(): void {
        this.container.style.display = 'none'
    }

    public clear(): void {
        this.container.innerHTML = ''
    }
}
