import AsciiAwareContainer from './ascii-aware-container'

export default class PcxContainer extends AsciiAwareContainer {
    private pcxContainer = document.getElementById('pcx_container')! as HTMLCanvasElement

    public show(): void {
        super.show()
        this.pcxContainer.style.display = 'block'
    }

    public hide(): void {
        this.pcxContainer.style.display = 'none'
    }

    public clear(): void {
        this.pcxContainer.height = 0
        this.pcxContainer.width = 0
    }
}
