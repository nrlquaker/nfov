import * as React from 'react'
import { ChangeEvent, Component, HTMLAttributes } from 'react'
// @ts-ignore: no type definition
import { Checkbox } from 'react-desktop/macOs'
import { getWindowCentering, setWindowCentering } from '../../../fs/storage'

export default class General extends Component {
    public render(): JSX.Element {
        const divStyle = {
            padding: '4px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        } as HTMLAttributes<HTMLDivElement>

        return (
            <div style={divStyle}>
                <Checkbox
                    label='Center window when opening file'
                    onChange={this.handleChange}
                    defaultChecked={getWindowCentering()} />
            </div>
        )
    }

    private handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const windowCentering = Boolean(e.target.checked)
        setWindowCentering(windowCentering)
    }
}
