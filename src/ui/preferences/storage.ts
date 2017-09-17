import * as storage from 'electron-json-storage'

export function setBgColor(bgColor: string): void {
    storage.set('bgcolor', bgColor, empty)
}

export function getBgColor(callback: (bgColor: string) => void): void {
    storage.has('bgcolor', (_, hasKey) => {
        if (!hasKey) {
            callback('#000000')
        } else {
            storage.get('bgcolor', (_, data: string) => callback(data))
        }
    })
}

export function setTextColor(textColor: string): void {
    storage.set('textcolor', textColor, empty)
}

export function getTextColor(callback: (textColor: string) => void): void {
    storage.has('textcolor', (_, hasKey) => {
        if (!hasKey) {
            callback('#FFFFFF')
        } else {
            storage.get('textcolor', (_, data: string) => callback(data))
        }
    })
}

function empty(): void {
    // empty
}
