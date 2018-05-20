import { extname } from 'path'

export const supportedTextFiles = ['.nfo', '.diz', '.asc', '.txt']
export const supportedBinFiles = [
    '.ans',
    '.cia',
    '.ice',
    '.xb',
    '.pcb',
    '.bin',
    '.tnd',
    '.idf',
    '.adf'
]
export const supportedFiles = supportedTextFiles.concat(supportedBinFiles)

export enum FileType {
    ANSI,
    ASCII
}

export function isFileSupported(fileName: string): boolean {
    const extension = extname(fileName).toLowerCase()
    return supportedFiles.includes(extension)
}

export function detectFileType(extension: string): FileType {
    if (supportedTextFiles.includes(extension)) {
        return FileType.ASCII
    } else {
        return FileType.ANSI
    }
}
