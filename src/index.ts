import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import './compile/bypass-checker'
import { getBgColor } from './fs/storage'
import buildMenu from './ui/menu/build-menu'
import { showExportDialog, showOpenDialog } from './utils/dialogs'
import { calculateCenterFor } from './utils/general-utils'

const isDevMode = process.execPath.match(/[\\/]electron/)
let mainWindow: Electron.BrowserWindow | null = null
let preferencesWindow: Electron.BrowserWindow | null = null
let lastOpenedFile: string

function createMainWindow(): void {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 800,
        show: false,
        zoomToPageWidth: true,
        backgroundColor: getBgColor()
    })
    mainWindow.loadURL(`file://${__dirname}/index.html`)
    if (isDevMode) {
        mainWindow.webContents.openDevTools()
    }
    mainWindow.on('ready-to-show', () => {
        mainWindow!.show()
    })
    mainWindow.on('close', () => {
        mainWindow = null
        preferencesWindow = null
        app.quit()
    })
}

function createPreferencesWindow(): void {
    preferencesWindow = new BrowserWindow({
        width: 370,
        height: 280,
        frame: false,
        show: false,
        titleBarStyle: 'hidden',
        movable: true,
        resizable: false,
        maximizable: false,
        title: 'Preferences'
    })
    preferencesWindow.loadURL(`file://${__dirname}/ui/preferences/preferences.html`)
    preferencesWindow.on('close', (e: Electron.Event) => {
        if (preferencesWindow !== null) {
            e.preventDefault()
            preferencesWindow.hide()
        }
    })
}

ipcMain.on('open-preferences', () => {
    preferencesWindow!.show()
})

app.on('ready', () => {
    Menu.setApplicationMenu(buildMenu(!!isDevMode))
    createMainWindow()
    createPreferencesWindow()
    app.on('open-file', (_, filePath) => {
        openFile(filePath)
    })
})

app.on('will-finish-launching', () => {
    app.once('open-file', (_, filePath) => {
        app.on('ready', () => {
            // Can't open file right away, because mainWindow is null
            // at that point. Saving url and opening it in ready event
            // causes the window size to be wrong.
            setTimeout(() => openFile(filePath), 500)
        })
    })
})

app.on('window-all-closed', () => app.quit())

ipcMain.on('bg-color-changed', (_: any, color: string) => {
    mainWindow!.webContents.send('bg-color-changed', color)
})

ipcMain.on('text-color-changed', (_: any, color: string) => {
    mainWindow!.webContents.send('text-color-changed', color)
})

ipcMain.on('link-color-changed', (_: any, color: string) => {
    mainWindow!.webContents.send('link-color-changed', color)
})

ipcMain.on('selection-color-changed', (_: any, color: string) => {
    mainWindow!.webContents.send('selection-color-changed', color)
})

ipcMain.on('font-changed', (_: any, fontName: string) => {
    mainWindow!.webContents.send('font-changed', fontName)
})

ipcMain.on('font-size-changed', (_: any, fontSize: string) => {
    mainWindow!.webContents.send('font-size-changed', fontSize)
})

ipcMain.on('font-smooting-changed', (_: any, enabled: boolean) => {
    mainWindow!.webContents.send('font-smooting-changed', enabled)
})

ipcMain.on('open-file', (_: any, filePath: string) => {
    openFile(filePath)
})

ipcMain.on('show-open-dialog', () => {
    showOpenDialog(mainWindow!).then((fileName) => openFile(fileName))
})

ipcMain.on('show-export-dialog', () => {
    showExportDialog(mainWindow!, lastOpenedFile).then((fileName) => {
        mainWindow!.webContents.send('export-to-png', fileName)
    })
})

ipcMain.on('close-file', () => {
    mainWindow!.webContents.send('close-file')
})

ipcMain.on('window-size-changed', (_: any, width: number, height: number) => {
    mainWindow!.setContentSize(width, height, true)
    const center = calculateCenterFor(mainWindow!.getSize())
    mainWindow!.setPosition(center.x, center.y, true)
})

function openFile(filePath: string): void {
    lastOpenedFile = filePath
    mainWindow!.webContents.send('open-file', filePath)
}
