export function setViewerColors(textColor: string, backgroundColor: string) {
    const container = document.getElementById('app-container')
    const body = document.getElementById('body')
    container!.style.color = textColor
    container!.style.backgroundColor = backgroundColor
    body!.style.backgroundColor = backgroundColor
}

export function setViewerFont(fontName: string) {
    const container = document.getElementById('app-container')
    container!.style.fontFamily = fontName
}
