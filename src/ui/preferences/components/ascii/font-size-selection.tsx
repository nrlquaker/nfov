import { ipcRenderer } from 'electron'
import * as React from 'react'
import { ChangeEvent } from 'react'
// @ts-ignore: no type definition
import { Label } from 'react-desktop/macOs'
import { getFontSize, setFontSize } from '../../../../fs/storage'

export default class FontSizeSelection extends React.Component {
    public render(): JSX.Element {
        const divStyle = {
            display: 'flex',
            padding: '4px 0'
        }

        const labelStyle = {
            paddingRight: '6px'
        }

        return (
            <div style={divStyle}>
                <Label style={labelStyle}>Font size:</Label>
                <select defaultValue={getFontSize()} onChange={this.handleChange}>
                    {this.renderItems()}
                </select>
            </div>
        )
    }

    private renderItems(): JSX.Element[] {
        const items = []
        for (let i = 9; i < 21; i++) {
            items.push(<option key={i}>{i}</option>)
        }
        return items
    }

    private handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const fontSize = e.target.value
        setFontSize(fontSize)
        ipcRenderer.send('font-size-changed', fontSize)
    }
}
