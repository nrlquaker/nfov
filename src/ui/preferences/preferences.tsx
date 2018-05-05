import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

const render = () => {
    // tslint:disable-next-line:no-require-imports
    const { Preferences } = require('./components/preferences')
    ReactDOM.render(
        <AppContainer><Preferences /></AppContainer>,
        document.getElementById('container')
    )
}

render()
// @ts-ignore: no type definition
if (module.hot) { module.hot.accept(render) }
