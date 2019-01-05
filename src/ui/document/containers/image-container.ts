import AsciiAwareContainer from './ascii-aware-container'

export default class ImageContainer extends AsciiAwareContainer {
    private ansiContainer = document.getElementById('image_container')!

    public show(): void {
        super.show()
        this.ansiContainer.style.display = 'block'
    }

    public hide(): void {
        this.ansiContainer.style.display = 'none'
    }

    public clear(): void {
        this.ansiContainer.innerHTML = ''
    }
}
