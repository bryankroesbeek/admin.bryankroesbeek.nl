import * as React from 'react'
import * as lodash from 'lodash'

import * as Api from '../../api/api'
import { TableColumns } from '../../api/types'
import { Projects } from './Project/Project'
import { CubeSolve } from './CubeSolve/CubeSolve';
import { ExperienceComponent } from './Experience/Experience';

type TableViewProps = {
    table: string
}

type TableViewState = {

}

export class TableView extends React.Component<TableViewProps, TableViewState>{
    constructor(props: TableViewProps) {
        super(props)

        this.state = {

        }
    }

    render() {
        return <div className="table-data">
            <div className="table-columns">
                {this.renderTable()}
            </div>
        </div>
    }

    renderTable() {
        if (this.props.table === "CubeSolve")
            return <CubeSolve />

        if (this.props.table === "Project")
            return <Projects />

        if (this.props.table === "Experience")
            return <ExperienceComponent />
    }
}