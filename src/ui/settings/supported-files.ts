export function isFileSupported(fileName: string): boolean {
    return fileName.endsWith('nfo') || fileName.endsWith('diz')
}
