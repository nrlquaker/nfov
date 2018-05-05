import { ipcRenderer } from 'electron'
import * as React from 'react'
import { ChangeEvent } from 'react'
// @ts-ignore: no type definition
import { Label } from 'react-desktop/macOs'
import { getFontName, setFontName } from '../../../../fs/storage'

export default class FontNameSelection extends React.Component {
    public render(): JSX.Element {
        const divStyle = {
            display: 'flex',
            padding: '4px 0'
        }

        const labelStyle = {
            paddingRight: '6px'
        }

        const fontName = getFontName()
        ipcRenderer.send('font-changed', fontName)
        return (
            <div style={divStyle}>
                <Label style={labelStyle}>Font:</Label>
                <select defaultValue={fontName} onChange={this.handleChange}>
                    <option>BlockZone</option>
                    <option>ProFontWindows</option>
                    <option>Px437 AmstradPC1512-2y</option>
                    <option>Px437 ATI 8x14</option>
                    <option>Px437 ATI 8x16</option>
                    <option>Px437 ATI 8x8-2y</option>
                    <option>Px437 CompaqThin 8x16</option>
                    <option>Px437 IBM BIOS-2y</option>
                    <option>Px437 IBM CGAthin-2y</option>
                    <option>Px437 IBM Conv-2y</option>
                    <option>Px437 IBM ISO8</option>
                    <option>Px437 IBM MDA</option>
                    <option>Px437 IBM PS/2thin1</option>
                    <option>Px437 IBM PS/2thin2</option>
                    <option>Px437 IBM PS/2thin3</option>
                    <option>Px437 IBM PS/2thin4</option>
                    <option>Px437 IBM VGA8</option>
                    <option>Px437 IBM VGA9</option>
                    <option>Px437 TandyNew TV-2y</option>
                    <option>Px437 TandyOld TV-2y</option>
                    <option>Px437 Verite 8x16</option>
                    <option>Px437 Verite 8x8-2y</option>
                    <option>Px437 VGA SquarePx</option>
                    <option>Px437 Wyse700a-2y</option>
                    <option>Px437 Wyse700b-2y</option>
                    <option>PxPlus IBM CGAthin-2y</option>
                    <option>PT Mono</option>
                </select>
            </div>
        )
    }

    private handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const fontName = e.target.value
        setFontName(fontName)
        ipcRenderer.send('font-changed', fontName)
    }
}
