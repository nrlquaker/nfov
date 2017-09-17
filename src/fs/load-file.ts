import { readFileSync } from 'fs'
import { decode } from 'iconv-lite'
import { mapIsoToUtf } from './encoding/iso-to-utf-mapper'

export function loadFile(filePath: string): string {
    const fileContent = readFileSync(filePath)
    const data = decode(fileContent, 'win1252')
    const properData = mapIsoToUtf(data)
    return properData.replaceAll('<', '&lt') // escape tags
}
