import { setBgColor } from '../ascii-document-style'
import Container from './container'

export default abstract class AsciiAwareContainer implements Container {
    public show(): void {
        setBgColor('#000000')
    }
    public abstract hide(): void
    public abstract clear(): void
}
