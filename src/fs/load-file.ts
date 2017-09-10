import { readFileSync } from 'fs'
import { decode } from 'iconv-lite'
import { mapIsoToUtf } from './encoding/iso-to-utf-mapper'

export function loadFile(filePath: string): string {
    const content = readFileSync(filePath)
    const data = decode(content, 'iso-8859-1')
    return mapIsoToUtf(data)
}
