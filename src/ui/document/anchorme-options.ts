const extensionsToExclude = ['.audio', '.date', '.link', '.xxx', '.zip']

const anchormeOptions = {
    exclude: (URLObj: any) => {
        const url = URLObj.raw.toLowerCase()
        for (const extension of extensionsToExclude) {
            if (url.endsWith(extension)) return true
        }
        return false
    }
}

export default anchormeOptions
