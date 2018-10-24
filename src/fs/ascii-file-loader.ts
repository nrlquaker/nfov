import * as fs from 'fs'
import { decode } from 'iconv-lite'
import { Sauce, SauceParser } from 'sauce.js'
import '../extensions/string'

export default class AsciiFileLoader {
    private readonly sauceSize = 128
    private readonly commentSize = 64
    private readonly commentIdSize = 5

    public load(filePath: string): string {
        let data = this.loadFile(filePath)
        data = this.removeSauceIfNeeded(data, filePath)
        data = this.removeEOFCharacter(data)
        return data.replaceAll('<', '&lt') // escape tags
    }

    private loadFile(filePath: string): string {
        const fileContent = fs.readFileSync(filePath)
        return decode(fileContent, 'cp437')
    }

    private removeSauceIfNeeded(data: string, filePath: string): string {
        const sp = new SauceParser()
        const sauce = sp.parse(filePath)
        if (sauce) {
            data = this.removeSauce(data, sauce)
        }
        return data
    }

    private removeSauce(data: string, sauce: Sauce): string {
        const commentsSize =
            sauce.comments.length > 0
                ? sauce.comments.length * this.commentSize + this.commentIdSize
                : 0
        return data.substring(0, data.length - this.sauceSize - commentsSize)
    }

    private removeEOFCharacter(data: string): string {
        return data.substring(0, data.length - 1)
    }
}
