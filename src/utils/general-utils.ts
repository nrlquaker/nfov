import * as toBuffer from 'blob-to-buffer'
// @ts-ignore: no type definitions
import * as domtoimage from 'dom-to-image'
import { MenuItem, remote, shell } from 'electron'
import * as fs from 'fs'

export function saveImage(fileName: string): Promise<string> {
    return domtoimage.toBlob(document.body).then((blob: Blob) => {
        toBuffer(blob, (__: any, buffer: Buffer) => {
            fs.writeFile(fileName, buffer)
        })
    })
}

export function openLinksInExternalBrowser(): void {
    const links = document.querySelectorAll('a[href]')
    for (const link of links) {
        const url = link.getAttribute('href')
        if (url!.indexOf('http') === 0) {
            link.addEventListener('click', (e) => {
                e.preventDefault()
                shell.openExternal(url!)
            })
        }
    }
}

export function getMenuItem(label: string): MenuItem {
    const menu = remote.Menu.getApplicationMenu()
    for (const item of menu!.items) {
        const menuItem = item!.submenu!.items.find((i) => i.label === label)
        if (menuItem) return menuItem
    }
    throw new Error(`Menu item with label '${label}' is not found`)
}
