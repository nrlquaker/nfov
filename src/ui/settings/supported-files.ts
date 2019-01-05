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
export const supportedImageFiles = ['.pcx']
export const supportedFiles = [
    ...supportedTextFiles,
    ...supportedBinFiles,
    ...supportedImageFiles
]

export enum FileType {
    Ansi,
    Ascii,
    Pcx
}

export function isFileSupported(fileName: string): boolean {
    const extension = extname(fileName).toLowerCase()
    return supportedFiles.includes(extension)
}

export function detectFileType(extension: string): FileType {
    if (supportedTextFiles.includes(extension)) {
        return FileType.Ascii
    } else if (supportedBinFiles.includes(extension)) {
        return FileType.Ansi
    } else {
        return FileType.Pcx
    }
}
