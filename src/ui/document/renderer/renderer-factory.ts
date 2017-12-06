import { detectFileType, FileType } from '../../settings/supported-files'
import AnsiRenderer from './ansi-renderer'
import AsciiRenderer from './ascii-renderer'
import DocumentRenderer from './document-renderer'

export default function createRendererFor(extension: string): DocumentRenderer {
    if (detectFileType(extension) === FileType.ANSI) {
        return new AnsiRenderer()
    } else {
        return new AsciiRenderer()
    }
}
