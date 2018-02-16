import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import { getBgColor } from './fs/storage'
import { buildMenu } from './ui/menu/build-menu'

const isDevMode = process.execPath.match(/[\\/]electron/)
let mainWindow: Electron.BrowserWindow | null = null
let preferencesWindow: Electron.BrowserWindow | null = null
let filePathToOpen: string

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
        if (filePathToOpen) {
            openFile(filePathToOpen)
        }
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
        filePathToOpen = filePath
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

ipcMain.on('export-to-png', (_: any, fileName: string) => {
    mainWindow!.webContents.send('export-to-png', fileName)
})

ipcMain.on('close-file', () => {
    mainWindow!.webContents.send('close-file')
})

function openFile(filePath: string): void {
    mainWindow!.webContents.send('open-file', filePath)
}
