import * as React from 'react'

import * as Api from '../../../api/api'
import * as Types from '../../../api/types'
import { ProjectItem } from './ProjectItem';

type ProjectProps = {

}

type ProjectState = {
    data: Types.Project[] | "loading"
    serverData: Types.Project[]
    expandedProject: number[]
}

export class Projects extends React.Component<ProjectProps, ProjectState>{
    constructor(props: ProjectProps) {
        super(props)

        this.state = {
            data: "loading",
            serverData: [],
            expandedProject: []
        }
    }

    async componentDidMount() {
        if (this.state.data !== "loading") return

        let data = await Api.getProjects()
        this.setState({ data: data.sort((a, b) => a.position - b.position) })
    }

    changePosition(to: 1 | -1, id: number) {
        if (this.state.data === "loading") return
        let newData = [...this.state.data]
        let dIndex = this.state.data.findIndex(da => da.id === id)
        let position = newData[dIndex].position

        let td = this.state.data.findIndex(da => da.position === position + to)
        if (td === -1) return

        newData[dIndex].position = position + to
        newData[td].position = position

        this.setState({ data: newData.sort((a, b) => a.position - b.position) })
    }

    deleteItem(id: number) {
        if (this.state.data === "loading") return
        let data = this.state.data.filter(d => d.id === id)
        this.setState({ data: data })
    }

    render() {
        if (this.state.data === "loading") return null
        return <>
            {this.state.data.map(data =>
                <ProjectItem
                    key={data.id}
                    project={data}
                    changePosition={(id, to) => this.changePosition(to, id)}
                    delete={(id) => this.deleteItem(id)}
                />
            )}
        </>
    }
}