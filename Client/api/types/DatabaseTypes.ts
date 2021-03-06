export type Project = {
    id: number
    name: string
    link: string
    description: string
    position: number
    visible: boolean
}

export type CubeSolve = {
    id: number
    scramble: string
    time: number
    puzzle_type: string
    penalty: "" | "+2" | "DNF"
    time_stamp_solved: number
}

export type Experience = {
    id: number
    company: string
    position: string
    start_year: number
    end_year: number
    description: string
}