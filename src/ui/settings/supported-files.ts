export function isFileSupported(fileName: string): boolean {
    const name = fileName.toLowerCase()
    return name.endsWith('nfo') || name.endsWith('diz')
}
