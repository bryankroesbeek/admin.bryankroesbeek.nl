import * as React from 'react'
import * as lodash from 'lodash'

import * as Api from '../../api/api'
import { TableColumns } from '../../api/types'

type TableProps = {
    data: any
    columns: TableColumns
    delete: (id: number) => void
    changePosition?: (newPos: number, oldPos: number) => void
    update: (data: any) => void
}

type TableState = {
    serverData: any
    currentData: any
    expand: boolean
    executingRequest: boolean
}

export class Table extends React.Component<TableProps, TableState>{
    constructor(props: TableProps) {
        super(props)

        this.state = {
            serverData: { ...props.data },
            currentData: { ...props.data },
            expand: false,
            executingRequest: false
        }
    }

    componentDidMount() {
        setInterval(() => {
            if (this.state.executingRequest) return
            if (JSON.stringify(this.state.serverData) === JSON.stringify(this.state.currentData)) return

            this.setState({ executingRequest: true }, async () => {
                let table = lodash.snakeCase(this.props.columns.name)
                await Api.updateRow(table, this.state.currentData)
                this.setState({ executingRequest: false, serverData: this.state.currentData })
            })
        }, 1000)
    }

    componentDidUpdate() {
        if (JSON.stringify(this.props.data) === JSON.stringify(this.state.currentData)) return
        this.setState({ currentData: this.props.data })
    }

    changePosition(type: "up" | "down") {
        let oldPos = this.state.serverData.position
        if (type === "up") this.props.changePosition(oldPos - 1, oldPos)
        else this.props.changePosition(oldPos + 1, oldPos)
    }

    render() {
        return <div className="table-item">
            <div className="table-item-contents">{this.renderColumnItem()}</div>
            <button className="table-row-action-button" onClick={() => this.setState({ expand: !this.state.expand })}>{this.state.expand ? '-' : '+'}</button>
            {
                this.props.columns.columns.filter(c => lodash.snakeCase(c.name) === "position") ? <>
                    <button className="table-row-action-button" onClick={() => this.changePosition("up")}><span className="position-changer">⋀</span></button>
                    <button className="table-row-action-button" onClick={() => this.changePosition("down")}><span className="position-changer">⋁</span></button>
                </> : null
            }
            <button className="table-row-action-button" onClick={() => this.deleteItem(this.state.serverData)}>×</button>
        </div>
    }

    renderColumnItem() {
        if (this.state.expand)
            return this.props.columns.columns.map((c, count) => {
                if (lodash.snakeCase(c.name) === "id") return null
                return <div key={`column-item-${count}`} className="column-item">
                    <label className="column-item-name">{c.name}</label>
                    {this.input(c.type, this.state.currentData[lodash.snakeCase(c.name)], c.name)}
                </div>
            })

        return this.props.columns.columns.filter(i => lodash.snakeCase(i.name) === "name").map((c, count) =>
            <div key={`column-item-${count}`} className="column-item">
                <label className="column-item-name">{c.name}</label>
                {this.input(c.type, this.state.currentData[lodash.snakeCase(c.name)], c.name)}
            </div>
        )
    }

    input(type: string, value: any, name: string): JSX.Element {
        if (type.includes('varchar')) return <input className="column-item-value" type="text" value={value} onChange={(d) => this.changeAndPush(name, { ...this.state.currentData }, d.target.value)} />
        if (type.includes('text')) return <textarea className="column-item-value large" value={value} onChange={(d) => this.changeAndPush(name, { ...this.state.currentData }, d.target.value)} />
        if (type.includes('int')) return <input className="column-item-value" disabled={true} type="number" value={value} onChange={(d) => this.changeAndPush(name, { ...this.state.currentData }, Number(d.target.value))} />
        if (type.includes('bit')) return <button className="column-item-button" onClick={() => this.changeAndPush(name, { ...this.state.currentData }, !value)}>{value ? "✓" : ""}</button>
        return null
    }

    changeAndPush<T>(column: string, data: any, value: T) {
        data[lodash.snakeCase(column)] = value
        this.props.update(data)
    }

    async deleteItem(data: any) {
        await Api.deleteRow(this.props.columns.name, data.id)
        this.props.delete(this.state.serverData.id)
    }
}