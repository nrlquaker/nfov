import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import { enableLiveReload } from 'electron-compile'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
import './compile/bypass-checker'
import { getBgColor, getWindowCentering } from './fs/storage'
import buildMenu from './ui/menu/build-menu'
import { showExportDialog, showOpenDialog } from './utils/dialogs'
import { getWindowBoundsCentered } from './utils/screen-utils'

const isDevMode = process.execPath.match(/[\\/]electron/)
let mainWindow: Electron.BrowserWindow | null = null
let preferencesWindow: Electron.BrowserWindow | null = null
let lastOpenedFile: string

if (isDevMode) {
    enableLiveReload({ strategy: 'react-hmr' })
}

async function createMainWindow(): Promise<void> {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 800,
        backgroundColor: getBgColor(),
        resizable: false,
        zoomToPageWidth: true,
        show: false,
    })
    mainWindow.loadURL(`file://${__dirname}/index.html`)
    if (isDevMode) {
        await installExtension(REACT_DEVELOPER_TOOLS)
        mainWindow.webContents.openDevTools()
    }
    mainWindow.on('ready-to-show', () => mainWindow!.show())
    mainWindow.on('close', () => {
        mainWindow = null
        preferencesWindow = null
        app.quit()
    })
}

function createPreferencesWindow(): void {
    preferencesWindow = new BrowserWindow({
        title: 'Preferences',
        width: 375,
        height: 342,
        backgroundColor: '#ECECEC',
        resizable: false,
        maximizable: false,
        show: false
    })
    preferencesWindow.loadURL(`file://${__dirname}/ui/preferences/preferences.html`)
    preferencesWindow.on('close', (e: Electron.Event) => {
        if (preferencesWindow !== null) {
            e.preventDefault()
            preferencesWindow.hide()
        }
    })
}

ipcMain.on('open-preferences', () => preferencesWindow!.show())

app.on('ready', () => {
    Menu.setApplicationMenu(buildMenu(!!isDevMode))
    createMainWindow()
    createPreferencesWindow()
    app.on('open-file', (_, filePath) => openFile(filePath))
})

app.on('will-finish-launching', () => {
    app.once('open-file', (_, filePath) => {
        app.once('ready', () => {
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

ipcMain.on('links-highlighting-changed', (_: any, enabled: boolean) => {
    mainWindow!.webContents.send('links-highlighting-changed', enabled)
})

ipcMain.on('open-file', (_: any, filePath: string) => openFile(filePath))

ipcMain.on('close-file', () => mainWindow!.webContents.send('close-file'))

ipcMain.on('show-open-dialog', () => {
    showOpenDialog(mainWindow!).then((fileName) => openFile(fileName))
})

ipcMain.on('show-export-dialog', () => {
    showExportDialog(mainWindow!, lastOpenedFile).then((fileName) => {
        mainWindow!.webContents.send('export-to-png', fileName)
    })
})

ipcMain.on('window-size-changed', (_: any, width: number, height: number) => {
    const rect = getWindowBoundsCentered(width, height)
    mainWindow!.setContentSize(rect.width, rect.height, true)
    if (getWindowCentering()) {
        mainWindow!.setPosition(rect.x, rect.y, true)
    }
})

function openFile(filePath: string): void {
    lastOpenedFile = filePath
    if (mainWindow!.isMinimized()) {
        mainWindow!.restore()
    }
    mainWindow!.webContents.send('open-file', filePath)
}
