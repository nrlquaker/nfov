import * as settings from 'electron-settings'

export function setBgColor(bgColor: string): void {
    settings.set('bgColor', bgColor, { prettify: true })
}

export function getBgColor(): string {
    return settings.get('bgColor', '#000000') as string
}

export function setTextColor(textColor: string): void {
    settings.set('textColor', textColor, { prettify: true} )
}

export function getTextColor(): string {
    return settings.get('textColor', '#FFFFFF') as string
}

export function setLinkColor(linkColor: string): void {
    settings.set('linkColor', linkColor, { prettify: true })
}

export function getLinkColor(): string {
    return settings.get('linkColor', '#01FF70') as string
}

export function setSelectionColor(selectionColor: string): void {
    settings.set('selectionColor', selectionColor, { prettify: true })
}

export function getSelectionColor(): string {
    return settings.get('selectionColor', '#7FDBFF') as string
}

export function setFontName(fontName: string): void {
    settings.set('fontName', fontName, { prettify: true })
}

export function getFontName(): string {
    return settings.get('fontName', 'Px437 IBM PS/2thin2') as string
}

export function setFontSize(fontSize: string): void {
    settings.set('fontSize', fontSize, { prettify: true })
}

export function getFontSize(): string {
    return settings.get('fontSize', '13') as string
}
