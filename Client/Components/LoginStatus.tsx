import * as React from 'react'
import * as ReactDom from 'react-dom'
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'

import * as Api from '../api/api'

type LoginStatusProps = {}

type LoginStatusState = {
    loginState: "" | "login" | "logged_in"
}

export class LoginStatus extends React.Component<LoginStatusProps, LoginStatusState> {
    constructor(props: LoginStatusProps) {
        super(props)

        this.state = {
            loginState: ""
        }
    }

    componentDidMount() {
        setInterval(async () => {
            let path = document.location.pathname

            let res = await Api.getResources<{ status: "login" | "logged_in" }>("/api/authentication/login_status")
            this.setState({ loginState: res.status })
        }, 10000)
    }

    render() {
        if (this.state.loginState === "login") {
            if (document.location.pathname !== "/login") return <Redirect to="/login" />
        }
        return null
    }
}