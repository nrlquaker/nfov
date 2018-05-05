import { ipcRenderer } from 'electron'
import * as React from 'react'
import { ChangeEvent } from 'react'
// @ts-ignore: no type definition
import { Checkbox } from 'react-desktop/macOs'
import { getFontSmoothing, setFontSmoothing } from '../../../../fs/storage'

export default class FontSmoothingCheckbox extends React.Component {
    public render(): JSX.Element {
        const divStyle = {
            padding: '4px 0'
        }

        const fontSmoothing = getFontSmoothing()
        ipcRenderer.send('font-smooting-changed', fontSmoothing)

        return (
            <div style={divStyle}>
                <Checkbox
                    label='Font smoothing'
                    onChange={this.handleChange}
                    defaultChecked={fontSmoothing} />
            </div>
        )
    }

    private handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fontSmoothing = Boolean(e.target.checked)
        setFontSmoothing(fontSmoothing)
        ipcRenderer.send('font-smooting-changed', fontSmoothing)
    }
}
