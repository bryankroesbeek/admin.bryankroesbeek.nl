import * as React from 'react'
import * as lodash from 'lodash'

import * as Api from '../../api/api'
import { TableColumns } from '../../api/types'

import { Table } from './Table'

type TableProps = {
    table: string
}

type TableState = {
    columns: TableColumns | "loading"
    data: any[] | "loading"
}

export class Tables extends React.Component<TableProps, TableState>{
    constructor(props: TableProps) {
        super(props)

        this.state = {
            columns: "loading",
            data: "loading"
        }
    }

    async componentDidMount() {
        if (this.state.columns !== "loading") return
        if (this.state.data !== "loading") return


        let columns = await Api.getColumns(this.props.table)
        let data = await Api.getResources<any[]>(`/api/${this.props.table}api/all`)

        this.setState({ columns: columns, data: data.sort((a, b) => a.position - b.position) })
    }

    async deleteItem(id: number) {
        if (this.state.data === "loading") return

        let newData = [...this.state.data]
        let filteredData = newData.filter((d: any) => d.id !== id)
        this.setState({ data: filteredData })
    }

    updateItem(data: any) {
        if (this.state.data === "loading") return

        let itemIndex = this.state.data.findIndex(d => d.id === data.id)
        let newData = [...this.state.data]

        newData[itemIndex] = data
        this.setState({ data: newData })
    }

    changePosition(newPos: number, oldPos: number) {
        if (this.state.data === "loading") return

        let oldItemIndex = this.state.data.findIndex(d => d.position === newPos)
        let currentItemIndex = this.state.data.findIndex(d => d.position === oldPos)
        if (oldItemIndex < 0 || currentItemIndex < 0) return

        let data = [...this.state.data]
        data[oldItemIndex] = { ...data[oldItemIndex], position: oldPos }
        data[currentItemIndex] = { ...data[currentItemIndex], position: newPos }

        this.setState({ data: data.sort((a, b) => a.position - b.position) })
    }

    render() {
        if (this.state.columns === "loading") return null
        if (this.state.data === "loading") return null

        return <div className="table-data">
            <div className="table-columns">
                {
                    this.state.data.map((data, index) =>
                        <Table
                            key={data.id}
                            changePosition={(newPos: number, oldPos: number) => this.changePosition(newPos, oldPos)}
                            delete={(id: number) => this.deleteItem(id)}
                            update={(data: any) => this.updateItem(data)}
                            data={{ ...data, position: index + 1 }}
                            columns={this.state.columns === "loading" ? null : this.state.columns}
                        />
                    )
                }
            </div>
            <button className="tables-create-new" onClick={async () => {
                if (this.state.data === "loading") return
                let obj = await Api.createRow(lodash.snakeCase(this.props.table))
                let newData = [...this.state.data]
                newData.push(await obj.json())
                this.setState({ data: newData })
            }}>Create new</button>
        </div>
    }
}