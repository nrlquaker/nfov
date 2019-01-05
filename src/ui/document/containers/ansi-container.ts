import AsciiAwareContainer from './ascii-aware-container'

export default class AnsiContainer extends AsciiAwareContainer {
    private ansiContainer = document.getElementById('ansi_container')!

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
