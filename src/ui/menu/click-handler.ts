export type ClickHandler = (
    menuItem: Electron.MenuItem,
    browserWindow: Electron.BrowserWindow,
    event: Electron.Event
) => void
