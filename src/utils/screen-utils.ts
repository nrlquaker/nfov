import { Rectangle, screen } from 'electron'

export function getWindowBoundsCentered(width: number, height: number): Rectangle {
    const workArea = screen.getPrimaryDisplay().workArea
    const workAreaWidth = workArea.width - workArea.x
    const workAreaHeight = workArea.height - workArea.y
    const w = width > workAreaWidth ? workAreaWidth : width
    const h = height > workAreaHeight ? workAreaHeight : height
    const x = Math.floor((workArea.x - w + workArea.width) / 2)
    const y = Math.floor((workArea.y - h + workArea.height) / 2)

    return { width: w, height: h, x, y }
}
