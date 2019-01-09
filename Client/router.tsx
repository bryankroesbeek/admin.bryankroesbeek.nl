import * as React from 'react'
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'

import { Sidebar } from './Components/Sidebar/Sidebar'
import { Login } from './Components/Login/Login'

import * as Types from './api/types'
import { TableView } from './Components/TableView/TableView'
import { LoginStatus } from './Components/LoginStatus'

type MainState = {

}

export class MainRouter extends React.Component<{}, MainState>{
    constructor(props: {}) {
        super(props)

        this.state = {}
    }

    renderAdminPage() {
        return <div className="admin-content">
            <Sidebar />
            <div className="admin-table-content">
                <div className="admin-header" />
                <Switch>
                    <Route path="/:table" component={({ match }: any) =>
                        <TableView
                            key={`table-${match.params['table']}`}
                            table={match.params['table']}
                        />
                    } />
                </Switch>
            </div>
        </div>
    }

    render() {
        return <BrowserRouter><>
            <div className="page">
                <Switch>
                    <Route exact path="/login" component={() => <Login />} />
                    <Route>
                        {this.renderAdminPage()}
                    </Route>
                </Switch>
            </div>
            <LoginStatus />
        </></BrowserRouter>

    }
}