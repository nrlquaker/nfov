// @ts-ignore: no type definition
import { addBypassChecker } from 'electron-compile'
import { extname } from 'path'
import { supportedBinFiles, supportedImageFiles } from '../ui/settings/supported-files'

// Needed for ansilove.js and images
addBypassChecker((filePath: string) => {
    const extension = extname(filePath).toLowerCase()
    return supportedBinFiles.includes(extension) ||
        supportedImageFiles.includes(extension)
})
