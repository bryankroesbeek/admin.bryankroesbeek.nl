import * as React from 'react'

import * as Api from '../../../api/api'
import * as Types from '../../../api/types'

type ProjectItemProps = {
    project: Types.Project
    delete: (id: number) => void
    changePosition: (id: number, to: 1 | -1) => void
}

type ProjectItemState = {
    project: Types.Project
    serverProject: Types.Project
    executingRequest: boolean
    expanded: boolean
    deleted: boolean
}

export class ProjectItem extends React.Component<ProjectItemProps, ProjectItemState>{
    constructor(props: ProjectItemProps) {
        super(props)

        this.state = {
            project: this.props.project,
            serverProject: this.props.project,
            executingRequest: false,
            expanded: false,
            deleted: false
        }
    }

    static getDerivedStateFromProps(newProps: ProjectItemProps, prevState: ProjectItemState) {
        let newState: ProjectItemState = { ...prevState, project: { ...prevState.project, position: newProps.project.position } }
        return newState
    }

    componentDidMount() {
        setInterval(() => {
            if (this.state.deleted) return
            if (this.state.executingRequest) return

            let jsonProject = JSON.stringify(this.state.project)
            let jsonServerProject = JSON.stringify(this.state.serverProject)
            if (jsonProject === jsonServerProject) return

            this.setState({ executingRequest: true }, async () => {
                let res = await Api.putResources(`/api/project/${this.state.project.id}/update`, this.state.project)
                let proj: Types.Project = await res.json()

                this.setState({ serverProject: proj, executingRequest: false })
            })
        }, 1000)
    }

    delete(id: number) {
        this.setState({ deleted: true }, () => {
            this.props.delete(id)
        })
    }

    renderInput<T>(inputTitle: string, element: T) {
        return <div className="column-item">
            <label className="column-item-name">{inputTitle}</label>
            {element}
        </div>
    }

    render() {
        return <div className="table-item">
            <div className="table-item-contents">
                {this.renderInput("Name",
                    <input
                        className="column-item-value"
                        type="text"
                        value={this.state.project.name}
                        onChange={v => {
                            this.setState({ project: { ...this.state.project, name: v.target.value } })
                        }}
                    />
                )}
                {this.state.expanded ? <>
                    {this.renderInput("Link",
                        <input
                            className="column-item-value"
                            type="text"
                            value={this.state.project.link}
                            onChange={v => {
                                this.setState({ project: { ...this.state.project, link: v.target.value } })
                            }}
                        />
                    )}
                    {this.renderInput("Description",
                        <textarea
                            className="column-item-value large"
                            value={this.state.project.description}
                            onChange={v => {
                                this.setState({ project: { ...this.state.project, description: v.target.value } })
                            }}
                        />
                    )}
                    {this.renderInput("Visible",
                        <button
                            className="column-item-button"
                            onClick={v => {
                                this.setState({ project: { ...this.state.project, visible: !this.state.project.visible } })
                            }}
                        >{this.state.project.visible ? "✓" : ""}</button>

                    )}
                </> : null}
            </div>

            <button className="table-row-action-button" onClick={() => this.setState({ expanded: !this.state.expanded })}>{this.state.expanded ? '-' : '+'}</button>
            <button className="table-row-action-button" onClick={() => this.props.changePosition(this.state.project.id, -1)}><span className="position-changer">⋀</span></button>
            <button className="table-row-action-button" onClick={() => this.props.changePosition(this.state.project.id, 1)}><span className="position-changer">⋁</span></button>
            <button className="table-row-action-button" onClick={() => this.delete(this.state.project.id)}>×</button>
        </div>
    }
}