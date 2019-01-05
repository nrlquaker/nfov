import { detectFileType, FileType } from '../../settings/supported-files'
import AnsiRenderer from './ansi-renderer'
import AsciiRenderer from './ascii-renderer'
import DocumentRenderer from './document-renderer'
import PcxRenderer from './pcx-renderer'

export default function createRendererFor(extension: string): DocumentRenderer {
    switch (detectFileType(extension)) {
        case FileType.Ascii:
            return new AsciiRenderer()
        case FileType.Ansi:
            return new AnsiRenderer()
        default:
            return new PcxRenderer()
    }
}
