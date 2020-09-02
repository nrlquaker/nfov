const extensionsToExclude = ['.audio', '.date', '.link', '.xxx', '.zip']

const anchormeOptions = {
    exclude: (url: string) => {
        const urlLowerCase = url.toLowerCase()
        for (const extension of extensionsToExclude) {
            if (urlLowerCase.endsWith(extension)) return true
        }
        return false
    }
}

export default anchormeOptions
