import * as React from 'react'
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'

import { Sidebar } from './Components/Sidebar/Sidebar'
import { Login } from './Components/Login/Login'
import { TableRows } from './Components/Tables/Tables'

import * as Types from './api/types'

type MainState = {
    
}

export class MainRouter extends React.Component<{}, MainState>{
    constructor(props: {}) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <BrowserRouter>
                <div className="page">
                    <Switch>
                        <Route exact path="/login" component={() => <Login />} />
                        <Route path=""><>
                            <div className="admin-content">
                                <Sidebar />
                                <div className="admin-table-content">
                                    <div className="admin-header" />
                                    <Switch>
                                        <Route path="/:table" component={({ match }: any) => <Tables table={match.params['table']} />} />
                                    </Switch>
                                </div>
                            </div>
                        </></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}