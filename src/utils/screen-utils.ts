import { Rectangle, screen } from 'electron'

export function getWindowBoundsCentered(width: number, height: number): Rectangle {
    const screenWidth = screen.getPrimaryDisplay().workAreaSize.width
    const screenHeight = screen.getPrimaryDisplay().workAreaSize.height
    const w = width > screenWidth ? screenWidth : width
    const h = height > screenHeight - screen.getMenuBarHeight() ?
        screenHeight - screen.getMenuBarHeight() : height
    const x = Math.floor((screenWidth - w) / 2)
    const y = Math.floor((screenHeight - h + screen.getMenuBarHeight()) / 2)
    return { width: w, height: h, x, y }
}
