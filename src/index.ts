import { app, BrowserWindow, Menu } from 'electron'
import { buildMenu } from './ui/menu/build-menu'

const isDevMode = process.execPath.match(/[\\/]electron/)
let mainWindow: Electron.BrowserWindow | null = null

const createWindow = async () => {
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
    Menu.setApplicationMenu(buildMenu())
    mainWindow.on('ready-to-show', () => mainWindow!.show())
    mainWindow.on('closed', () => mainWindow = null)
}

app.on('ready', createWindow)
app.on('window-all-closed', () => app.quit())
