import anchorme from 'anchorme'
import { getLinkColor } from '../../fs/storage'
import { openLinksInExternalBrowser } from '../../utils/general-utils'
import anchormeOptions from './anchorme-options'

const asciiContainer = document.getElementById('text_container')!
const styleSheet = document.styleSheets[0] as CSSStyleSheet
const selectionRuleIndex = 0
const fontSmoothingRuleIndex = 1

insertEmptyRules()

export function setTextColor(textColor: string): void {
    asciiContainer.style.color = textColor
}

export function setBgColor(backgroundColor: string): void {
    document.body.style.backgroundColor = backgroundColor
    asciiContainer.style.backgroundColor = backgroundColor
}

export function setLinkColor(linkColor: string): void {
    const links = document.querySelectorAll('a[href]') as NodeListOf<HTMLElement>
    for (const link of links) {
        link.style.color = linkColor
    }
}

export function setSelectionColor(selectionColor: string): void {
    styleSheet.removeRule(selectionRuleIndex)
    styleSheet.insertRule(`::selection { background: ${selectionColor}; }`, selectionRuleIndex)
}

export function setFont(fontName: string): void {
    asciiContainer.style.fontFamily = `"${fontName}"`
}

export function setFontSize(fontSize: string): void {
    asciiContainer.style.fontSize = `${fontSize}px`
}

export function enableFontSmoothing(enabled: boolean): void {
    styleSheet.removeRule(fontSmoothingRuleIndex)
    const rule = enabled ? '* { }' : '* { -webkit-font-smoothing: none; }'
    styleSheet.insertRule(rule, fontSmoothingRuleIndex)
}

export function enableLinksHighlighting(enabled: boolean): void {
    enabled ? highlightLinks() : removeLinks()
}

function insertEmptyRules(): void {
    styleSheet.insertRule('::selection { }', selectionRuleIndex)
    styleSheet.insertRule('* { }', fontSmoothingRuleIndex)
}

function highlightLinks(): void {
    asciiContainer.innerHTML = anchorme({input:asciiContainer.innerHTML, options:anchormeOptions})
    setLinkColor(getLinkColor())
    openLinksInExternalBrowser()
}

function removeLinks(): void {
    const links = document.querySelectorAll('a[href]') as NodeListOf<HTMLElement>
    for (const link of links) {
        link.replaceWith(link.innerText)
    }
}
