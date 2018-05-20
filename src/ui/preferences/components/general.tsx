import * as React from 'react'
import { ChangeEvent, Component } from 'react'
// @ts-ignore: no type definition
import { Checkbox } from 'react-desktop/macOs'
import { getWindowCentering, setWindowCentering } from '../../../fs/storage'

export default class General extends Component {
    public render(): JSX.Element {
        return (
            <Checkbox
                label='Center window when opening file'
                onChange={this.handleChange}
                defaultChecked={getWindowCentering()} />
        )
    }

    private handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const windowCentering = Boolean(e.target.checked)
        setWindowCentering(windowCentering)
    }
}
