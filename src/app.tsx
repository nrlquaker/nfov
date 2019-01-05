import * as React from 'react'

export default class App extends React.Component {
    private preStyle = {
        padding: '1em'
    }

    public render(): JSX.Element {
        return (
            <>
                <pre id='ascii_container' style={this.preStyle}></pre>
                <div id='ansi_container'></div>
                <canvas id='pcx_container'></canvas>
                <div id='image_container'></div>
            </>
        )
    }
}
