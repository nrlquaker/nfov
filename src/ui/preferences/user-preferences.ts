const body = document.getElementById('body')
const container = document.getElementById('app-container')

export function setTextColor(textColor: string) {
    container!.style.color = textColor
}

export function setBgColor(backgroundColor: string) {
    body!.style.backgroundColor = backgroundColor
    container!.style.backgroundColor = backgroundColor
}

export function setFont(fontName: string) {
    container!.style.fontFamily = `"${fontName}"`
}

export function setFontSize(fontSize: string) {
    container!.style.fontSize = `${fontSize}px`
}
