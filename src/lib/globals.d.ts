declare namespace Electron {
    interface MenuItem {
        readonly accelerator?: Electron.Accelerator
        readonly submenu?: Electron.Menu
        readonly role?: string
        readonly type: 'normal' | 'separator' | 'submenu' | 'checkbox' | 'radio'
    }
}
