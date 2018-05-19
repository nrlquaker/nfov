import { ipcRenderer } from 'electron'
import * as React from 'react'
import { Component, HTMLAttributes } from 'react'
// @ts-ignore: no type definition
import { Label, Window } from 'react-desktop/macOs'
import * as storage from '../../../../fs/storage'
import ColorPicker from './color-picker'
import FontNameSelection from './font-name-selection'
import FontSizeSelection from './font-size-selection'
import FontSmoothingCheckbox from './font-smoothing-checkbox'

export default class ASCII extends Component {
    public render(): JSX.Element {
        const divStyle = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '170px'
        }

        const containerStyle = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        } as HTMLAttributes<HTMLDivElement>

        return (
            <div style={containerStyle}>
                <FontNameSelection />
                <FontSizeSelection />
                <FontSmoothingCheckbox />
                <div style={divStyle}>
                    <Label>Text color:</Label>
                    <ColorPicker
                        color={storage.getTextColor()}
                        onChange={this.updateTextColor} />
                </div>
                <div style={divStyle}>
                    <Label>Background color:</Label>
                    <ColorPicker
                        color={storage.getBgColor()}
                        onChange={this.updateBgColor} />
                </div>
                <div style={divStyle}>
                    <Label>Link color:</Label>
                    <ColorPicker
                        color={storage.getLinkColor()}
                        onChange={this.updateLinkColor} />
                </div>
                <div style={divStyle}>
                    <Label>Selection color:</Label>
                    <ColorPicker
                        color={storage.getSelectionColor()}
                        onChange={this.updateSelectionColor} />
                </div>
            </div>
        )
    }

    private updateTextColor = (color: string) => {
        storage.setTextColor(color)
        ipcRenderer.send('text-color-changed', color)
    }

    private updateBgColor = (color: string) => {
        storage.setBgColor(color)
        ipcRenderer.send('bg-color-changed', color)
    }

    private updateLinkColor = (color: string) => {
        storage.setLinkColor(color)
        ipcRenderer.send('link-color-changed', color)
    }

    private updateSelectionColor = (color: string) => {
        storage.setSelectionColor(color)
        ipcRenderer.send('selection-color-changed', color)
    }
}
