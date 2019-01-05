import * as storage from '../../../fs/storage'
import { setBgColor } from '../ascii-document-style'
import Container from './container'

export default class AsciiContainer implements Container {
    private asciiContainer = document.getElementById('ascii_container')!

    public show(): void {
        setBgColor(storage.getBgColor())
        this.asciiContainer.style.display = 'inline-block'
    }

    public hide(): void {
        this.asciiContainer.style.display = 'none'
    }

    public clear(): void {
        this.asciiContainer.innerHTML = ''
    }
}
