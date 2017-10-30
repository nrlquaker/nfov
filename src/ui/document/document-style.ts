const body = document.getElementById('body')
const container = document.getElementById('app-container')
const insertionRuleIndex = 0

insertEmptyRule()

export function setTextColor(textColor: string): void {
    container!.style.color = textColor
}

export function setBgColor(backgroundColor: string): void {
    body!.style.backgroundColor = backgroundColor
    container!.style.backgroundColor = backgroundColor
}

export function setLinkColor(linkColor: string): void {
    const links = document.getElementsByTagName('a')
    for (const link of links) {
        link.style.color = linkColor
    }
}

export function setSelectionColor(selectionColor: string): void {
    const styleSheet = document.styleSheets[0] as CSSStyleSheet
    styleSheet.removeRule(insertionRuleIndex)
    styleSheet.insertRule(`::selection { background: ${selectionColor}; }`, insertionRuleIndex)
}

export function setFont(fontName: string): void {
    container!.style.fontFamily = `"${fontName}"`
}

export function setFontSize(fontSize: string): void {
    container!.style.fontSize = `${fontSize}px`
}

function insertEmptyRule(): void {
    const ss = document.styleSheets[0] as CSSStyleSheet
    ss.insertRule('::selection { }', insertionRuleIndex)
}
