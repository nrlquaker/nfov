import * as React from 'react'

export default class App extends React.Component {
    private preStyle = {
        padding: '1em'
    }

    private divStyle = {
        verticalAlign: 'bottom'
    }

    public render(): JSX.Element {
        return (
            <>
                <pre id='text_container' style={this.preStyle}></pre>
                <div id='image_container' style={this.divStyle}></div>
            </>
        )
    }
}
