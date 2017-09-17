import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import { buildMenu } from './ui/menu/build-menu'

const isDevMode = process.execPath.match(/[\\/]electron/)
let mainWindow: Electron.BrowserWindow | null = null
let preferencesWindow: Electron.BrowserWindow | null = null

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 540,
        height: 800,
        show: false,
        zoomToPageWidth: true
    })
    mainWindow.loadURL(`file://${__dirname}/index.html`)
    if (isDevMode) {
        mainWindow.webContents.openDevTools()
    }
    mainWindow.on('ready-to-show', () => mainWindow!.show())
    mainWindow.on('close', () => {
        mainWindow = null
        preferencesWindow = null
        app.quit()
    })
}

function createPreferencesWindow() {
    preferencesWindow = new BrowserWindow({
        width: 370,
        height: 300,
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
    Menu.setApplicationMenu(buildMenu())
    createMainWindow()
    createPreferencesWindow()
})
app.on('window-all-closed', () => app.quit())

ipcMain.on('bg-color-changed', (_: any, message: string) => {
    mainWindow!.webContents.send('bg-color-changed', message)
})

ipcMain.on('text-color-changed', (_: any, message: string) => {
    mainWindow!.webContents.send('text-color-changed', message)
})

ipcMain.on('open-file', (_: any, filePath: string) => {
    mainWindow!.webContents.send('open-file', filePath)
})

ipcMain.on('close-file', () => {
    mainWindow!.webContents.send('close-file')
})
