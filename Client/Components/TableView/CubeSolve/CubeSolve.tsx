import * as React from 'react'
import * as lodash from 'lodash'

import * as Api from '../../../api/api'
import * as Types from '../../../api/types'

type CubeSolveProps = {}

type CubeSolveState = {
    data: Types.CubeSolve[] | "loading"
}

export class CubeSolve extends React.Component<CubeSolveProps, CubeSolveState>{
    constructor(props: CubeSolveProps) {
        super(props)

        this.state = {
            data: "loading"
        }
    }

    async componentDidMount() {
        if (this.state.data !== "loading") return
        let data = await Api.getResources<Types.CubeSolve[]>(`/api/cube_solve/all`)
        this.setState({ data: data })
    }

    render() {
        if (this.state.data === "loading") return null
        return <>
            {
                this.state.data.map(data => <div key={data.id}>
                    YEET
                </div>)
            }
        </>
    }
}