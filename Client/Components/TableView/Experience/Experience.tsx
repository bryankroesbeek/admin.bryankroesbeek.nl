import * as React from 'react'

import * as Api from '../../../api/api'
import * as Types from '../../../api/types'
import { ExperienceItem } from './ExperienceItem';

type ExperienceProps = {

}

type ExperienceState = {
    data: Types.Experience[] | "loading"
}

export class ExperienceComponent extends React.Component<ExperienceProps, ExperienceState>{
    constructor(props: ExperienceProps) {
        super(props)

        this.state = {
            data: "loading",
        }
    }

    async componentDidMount() {
        if (this.state.data !== "loading") return

        let data = await Api.getExperience()
        this.setState({ data: data })
    }

    async deleteItem(id: number) {
        if (this.state.data === "loading") return

        await Api.deleteRow("experience", id)

        let newPos = 0
        let data = this.state.data.filter(d => d.id !== id)
        this.setState({ data: data })
    }

    render() {
        if (this.state.data === "loading") return null
        return <>
            {this.state.data.map(data =>
                <ExperienceItem
                    key={data.id}
                    experience={data}
                    delete={(id) => this.deleteItem(id)}
                />
            )}
            <button className="tables-create-new" onClick={async () => {
                if (this.state.data === "loading") return

                let item = await Api.createRow<Types.Experience>("experience")
                let data = [...this.state.data, item]
                this.setState({ data: data })
            }}>Create new</button>
        </>
    }
}