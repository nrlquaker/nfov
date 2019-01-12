import '../extensions/string'

/**
 * Remaps glyphs to their unicode equivalents
 */
export default class ControlCharactersRemaper {
    public remap(data: string): string {
        return data
            .replaceAll('\u0001', '\u263A') //   1 ☺
            .replaceAll('\u0002', '\u263B') //   2 ☻
            .replaceAll('\u0003', '\u2665') //   3 ♥
            .replaceAll('\u0004', '\u2666') //   4 ♦
            .replaceAll('\u0005', '\u2663') //   5 ♣
            .replaceAll('\u0006', '\u2660') //   6 ♠
            .replaceAll('\u0007', '\u2022') //   7 •
            .replaceAll('\u0008', '\u25D8') //   8 ◘
            // .replaceAll('\u0009', '\u25CB') //   9 ○ HT (Horizontal Tabulation)
            // .replaceAll('\u000A', '\u25D9') //  10 ◙ LF (Line Feed)
            .replaceAll('\u000B', '\u2642') //  11 ♂
            .replaceAll('\u000C', '\u2640') //  12 ♀
            // .replaceAll('\u000D', '\u266A') //  13 ♪ CR (Carriage Return)
            .replaceAll('\u000E', '\u266B') //  14 ♫
            .replaceAll('\u000F', '\u263C') //  15 ☼
            .replaceAll('\u0010', '\u25BA') //  16 ►
            .replaceAll('\u0011', '\u25C4') //  17 ◄
            .replaceAll('\u0012', '\u2195') //  18 ↕
            .replaceAll('\u0013', '\u203C') //  19 ‼
            .replaceAll('\u0014', '\u00B6') //  20 ¶
            .replaceAll('\u0015', '\u00A7') //  21 §
            .replaceAll('\u0016', '\u25AC') //  22 ▬
            .replaceAll('\u0017', '\u21A8') //  23 ↨
            .replaceAll('\u0018', '\u2191') //  24 ↑
            .replaceAll('\u0019', '\u2193') //  25 ↓
            .replaceAll('\u001A', '\u2192') //  26 →
            .replaceAll('\u001B', '\u2190') //  27 ←
            .replaceAll('\u001C', '\u221F') //  28 ∟
            .replaceAll('\u001D', '\u2194') //  29 ↔
            .replaceAll('\u001E', '\u25B2') //  30 ▲
            .replaceAll('\u001F', '\u25BC') //  31 ▼
            .replaceAll('\u007F', '\u2302') // 127 ⌂
    }
}
