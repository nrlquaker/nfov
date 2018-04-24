import * as toBuffer from 'blob-to-buffer'
// @ts-ignore: no type definitions
import * as domtoimage from 'dom-to-image'
import { Point, remote, screen, shell } from 'electron'
import * as fs from 'fs'

export function saveImage(fileName: string): Promise<string> {
    const container = document.getElementById('app_container')
    return domtoimage.toBlob(container).then((blob: Blob) => {
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

export function setFileMenuItemsEnable(enable: boolean): void {
    const menu = remote.Menu.getApplicationMenu()
    menu!.items[1].submenu!.items[1].enabled = enable
    menu!.items[1].submenu!.items[2].enabled = enable
}

export function calculateCenterFor(windowSize: number[]): Point {
    const screenWidth = screen.getPrimaryDisplay().workAreaSize.width
    const screenHeight = screen.getPrimaryDisplay().workArea.height
    const x = Math.floor((screenWidth - windowSize[0]) / 2)
    const y = Math.floor((screenHeight - windowSize[1]) / 2)
    return { x, y }
}
