import { readFileSync } from 'fs'
import { decode } from 'iconv-lite'
import '../extensions/string'

export default function loadFile(filePath: string): string {
    const fileContent = readFileSync(filePath)
    const data = decode(fileContent, 'cp437')
    return data.replaceAll('<', '&lt') // escape tags
}
