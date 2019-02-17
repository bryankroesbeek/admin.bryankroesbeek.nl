import * as React from 'react'

import * as Api from '../../../api/api'
import * as Types from '../../../api/types'

type ExperienceItemProps = {
    experience: Types.Experience
    delete: (id: number) => void
}

type ExperienceItemState = {
    experience: Types.Experience
    serverExperience: Types.Experience
    executingRequest: boolean
    expanded: boolean
    deleted: boolean
}

export class ExperienceItem extends React.Component<ExperienceItemProps, ExperienceItemState>{
    constructor(props: ExperienceItemProps) {
        super(props)

        this.state = {
            experience: this.props.experience,
            serverExperience: this.props.experience,
            executingRequest: false,
            expanded: false,
            deleted: false
        }
    }

    // static getDerivedStateFromProps(newProps: ExperienceItemProps, prevState: ExperienceItemState) {
    //     let newState: ExperienceItemState = { ...prevState, project: { ...prevState.project, position: newProps.experience.position } }
    //     return newState
    // }

    componentDidMount() {
        setInterval(() => {
            if (this.state.deleted) return
            if (this.state.executingRequest) return

            let jsonExperience = JSON.stringify(this.state.experience)
            let jsonServerExperience = JSON.stringify(this.state.serverExperience)
            if (jsonExperience === jsonServerExperience) return

            this.setState({ executingRequest: true }, async () => {
                let res = await Api.putResources(`/api/experience/${this.state.experience.id}/update`, this.state.experience)
                let proj: Types.Experience = await res.json()

                this.setState({ serverExperience: proj, executingRequest: false })
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
                {this.renderInput("Company",
                    <input
                        className="column-item-value"
                        type="text"
                        value={this.state.experience.company}
                        onChange={v => {
                            this.setState({ experience: { ...this.state.experience, company: v.target.value } })
                        }}
                    />
                )}
                {this.state.expanded ? <>
                    {this.renderInput("Position",
                        <input
                            className="column-item-value"
                            type="text"
                            value={this.state.experience.position}
                            onChange={v => {
                                this.setState({ experience: { ...this.state.experience, position: v.target.value } })
                            }}
                        />
                    )}
                    {this.renderInput("Description",
                        <textarea
                            className="column-item-value large"
                            value={this.state.experience.description || ""}
                            onChange={v => {
                                this.setState({ experience: { ...this.state.experience, description: v.target.value } })
                            }}
                        />
                    )}
                    {this.renderInput("Start Year",
                        <input
                            className="column-item-value"
                            type="number"
                            value={this.state.experience.start_year}
                            onChange={v => {
                                this.setState({ experience: { ...this.state.experience, start_year: v.target.valueAsNumber } })
                            }}
                        />
                    )}
                    {this.renderInput("End Year",
                        <input
                            className="column-item-value"
                            type="number"
                            value={this.state.experience.end_year}
                            onChange={v => {
                                this.setState({ experience: { ...this.state.experience, end_year: v.target.valueAsNumber } })
                            }}
                        />
                    )}
                </> : null}
            </div>

            <button className="table-row-action-button" onClick={() => this.setState({ expanded: !this.state.expanded })}>{this.state.expanded ? '-' : '+'}</button>
            <button className="table-row-action-button" onClick={() => this.delete(this.state.experience.id)}>×</button>
        </div>
    }
}