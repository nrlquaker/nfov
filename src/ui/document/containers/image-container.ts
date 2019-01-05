import AsciiAwareContainer from './ascii-aware-container'

export default class ImageContainer extends AsciiAwareContainer {
    private container = document.getElementById('image_container')!

    public show(): void {
        super.show()
        this.container.style.display = 'block'
    }

    public hide(): void {
        this.container.style.display = 'none'
    }

    public clear(): void {
        this.container.innerHTML = ''
        this.container.style.width = '0'
    }
}
