import * as React from 'react'
import * as Api from '../../api/api'
import { } from '../../api/types'
import { Link } from 'react-router-dom';

type SidebarProps = {

}

type SidebarState = {
    sideElements: string[] | "loading"
}

export class Sidebar extends React.Component<SidebarProps, SidebarState> {
    constructor(props: SidebarProps) {
        super(props)

        this.state = {
            sideElements: "loading"
        }
    }

    componentDidMount() {
        if (this.state.sideElements !== "loading") return

        Api.getTables()
            .then(t => this.setState({ sideElements: t }))
    }

    render() {
        if (this.state.sideElements === "loading") return null
        return (<div className="admin-sidebar">
            <div className="admin-header">
                <div className="admin-title">Bryan Kroesbeek</div>
            </div>
            <div className="sidebar-items">
                {
                    this.state.sideElements.map((tableName, count) => <Link to={`/${tableName}`} className="sidebar-item-link" key={`item-${count}`}>
                        <div className="table-name">{tableName}</div>
                    </Link>)
                }
            </div>
        </div>)
    }
}