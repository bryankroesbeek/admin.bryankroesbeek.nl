export * from './types/DatabaseTypes'

export type NavItem = {
    title: string
    url: string
}

export type TableColumns = {
    name: string,
    columns: {
        name: string,
        type: string
    }[]
}

export type LoginData = {
    name: string
    pass: string
}