export const supportedFiles = ['nfo', 'diz', 'asc']

export function isFileSupported(fileName: string): boolean {
    const name = fileName.toLowerCase()
    for (const file of supportedFiles) {
        if (name.endsWith(file)) return true
        continue
    }
    return false
}
