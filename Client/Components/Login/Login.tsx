import * as React from 'react'
import * as ReactDom from 'react-dom'
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'

import * as Api from '../../api/api'

type LoginProps = {}

type LoginState = {
    username: string
    password: string
    loginState: "" | "failed" | "succes"
}

export class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props)

        this.state = {
            username: null,
            password: null,
            loginState: ""
        }
    }

    async login(input: React.FormEvent<HTMLFormElement>) {
        input.preventDefault()

        let data = JSON.stringify({
            username: this.state.username,
            password: this.state.password
        })

        let res = await Api.postResources("/api/authentication/login", data)
        if (!res.ok) {
            this.setState({ ...this.state, loginState: "failed" })
            return
        }

        this.setState({loginState: "succes"})
    }

    render() {
        if (this.state.loginState === "succes") return <Redirect to="/" />

        return (
            <div className="login-block">
                <div className="login-content">
                    <div className="login-title">
                        <h2 className={`title-text ${this.state.loginState}`}>Login</h2>
                    </div>
                    <form className="login-form" onSubmit={e => this.login(e)} >
                        <div className="login-fields">
                            <div className="username-container">
                                <input
                                    className="login-username"
                                    type="text"
                                    placeholder="Username"
                                    onChange={e => this.setState({ ...this.state, username: e.target.value })}
                                />
                            </div>
                            <div className="password-container">
                                <input
                                    className="login-password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={e => this.setState({ ...this.state, password: e.target.value })}
                                />
                            </div>
                            <input className="login-submit" type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}