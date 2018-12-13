import * as React from 'react'
import * as ReactDom from 'react-dom'
import { MainRouter } from './router'

class Application extends React.Component<{}, {}>{
    render() {
        return <MainRouter />
    }
}

ReactDom.render(
    <Application />,
    document.getElementById("react-app")
)