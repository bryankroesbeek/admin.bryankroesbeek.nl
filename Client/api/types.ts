export type NavItem = {
    title: string
    url: string
}

export type Project = {
    id: number
    description: string
    link: string
    name: string
    position: number
    visible: boolean
}

export type TableColumns = {
    name: string,
    columns: {
        name: string,
        type: string
    }[]
}