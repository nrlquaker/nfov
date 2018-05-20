import { ipcRenderer } from 'electron'
import * as React from 'react'
import { ChangeEvent, Component } from 'react'
// @ts-ignore: no type definition
import { Checkbox } from 'react-desktop/macOs'
import { getLinksHighlighting, setLinksHighlighting } from '../../../../fs/storage'

export default class LinkHighlightingCheckbox extends Component {
    public render(): JSX.Element {
        const divStyle = {
            padding: '4px 0'
        }

        return (
            <div style={divStyle}>
                <Checkbox
                    label='Highlight hyperlinks and make them clickable'
                    onChange={this.updateLinksHighlighting}
                    defaultChecked={getLinksHighlighting()} />
            </div>
        )
    }

    private updateLinksHighlighting = (e: ChangeEvent<HTMLInputElement>) => {
        const linksHighlighting = Boolean(e.target.checked)
        setLinksHighlighting(linksHighlighting)
        ipcRenderer.send('links-highlighting-changed', linksHighlighting)
    }
}
