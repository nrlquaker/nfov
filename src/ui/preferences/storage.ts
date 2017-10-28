import * as storage from 'electron-json-storage'
import { DefaultSettings } from './default-settings'

export function setBgColor(bgColor: string): void {
    storage.set('bgcolor', bgColor, empty)
}

export function getBgColor(callback: (bgColor: string) => void): void {
    storage.has('bgcolor', (_, hasKey) => {
        if (!hasKey) {
            callback(DefaultSettings.getBgColor())
        } else {
            storage.get('bgcolor', (__, data: string) => callback(data))
        }
    })
}

export function setTextColor(textColor: string): void {
    storage.set('textcolor', textColor, empty)
}

export function getTextColor(callback: (textColor: string) => void): void {
    storage.has('textcolor', (_, hasKey) => {
        if (!hasKey) {
            callback(DefaultSettings.getTextColor())
        } else {
            storage.get('textcolor', (__, data: string) => callback(data))
        }
    })
}

export function setLinkColor(linkColor: string): void {
    storage.set('linkcolor', linkColor, empty)
}

export function getLinkColor(callback: (linkcolor: string) => void): void {
    storage.has('linkcolor', (_, hasKey) => {
        if (!hasKey) {
            callback(DefaultSettings.getLinkColor())
        } else {
            storage.get('linkcolor', (__, data: string) => callback(data))
        }
    })
}

export function setFontName(fontName: string): void {
    storage.set('fontName', fontName, empty)
}

export function getFontName(callback: (fontName: string) => void): void {
    storage.has('fontName', (_, hasKey) => {
        if (!hasKey) {
            callback(DefaultSettings.getFontName())
        } else {
            storage.get('fontName', (__, data: string) => callback(data))
        }
    })
}

export function setFontSize(fontSize: string): void {
    storage.set('fontSize', fontSize, empty)
}

export function getFontSize(callback: (fontSize: string) => void): void {
    storage.has('fontSize', (_, hasKey) => {
        if (!hasKey) {
            callback(DefaultSettings.getFontSize())
        } else {
            storage.get('fontSize', (__, data: string) => callback(data))
        }
    })
}

function empty(): void {
    // empty
}
