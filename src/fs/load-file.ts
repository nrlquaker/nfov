import * as fs from 'fs'
import { decode } from 'iconv-lite'
import '../extensions/string'

export default function loadFile(filePath: string): string {
    const fileContent = fs.readFileSync(filePath)
    let data = decode(fileContent, 'cp437')
    if (isSaucePresent(filePath)) {
        data = removeSauce(data)
    }
    data = removeEOFCharacter(data)
    return data.replaceAll('<', '&lt') // escape tags
}

// http://www.acid.org/info/sauce/sauce.htm
function isSaucePresent(filePath: string): boolean {
    const stats = fs.statSync(filePath)
    const fd = fs.openSync(filePath, 'r')
    const buffer = new Buffer(stats.size)
    fs.readSync(fd, buffer, 0, buffer.length, stats.size - 128)
    let id: string = ''
    for (let i = 0; i < 5; i++) {
        id += String.fromCharCode(buffer[i])
    }
    return id === 'SAUCE'
}

function removeSauce(data: string): string {
    return data.substring(0, data.length - 128)
}

function removeEOFCharacter(data: string): string {
    return data.substring(0, data.length - 1)
}
