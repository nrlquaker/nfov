import { getMenuItem } from '../../utils/general-utils'

export default class DocumentMenu {
    public updateFor(extension: string): void {
        const isPng = extension === '.png'
        getMenuItem('Export to png...').enabled = !isPng
        getMenuItem('Close').enabled = true
    }

    public onClose(): void {
        getMenuItem('Export to png...').enabled = false
        getMenuItem('Close').enabled = false
    }
}
