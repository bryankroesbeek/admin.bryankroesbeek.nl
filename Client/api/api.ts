import { Project, TableColumns } from "./types";

export function getResources<T>(url: string) {
    return fetch(url)
        .then(r => r.json())
        .then(res => res as T)
}

export function postResources<T>(url: string, body: T) {
    let headers = new Headers()
    headers.append('content-type', 'application/json')
    return fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    })
}

export function putResources<T>(url: string, body: T) {
    let headers = new Headers()
    headers.append('content-type', 'application/json')
    return fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body)
    })
}

export function deleteResources<T>(url: string, body: T) {
    let headers = new Headers()
    headers.append('content-type', 'application/json')
    return fetch(url, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(body)
    })
}

export function getProjects(): Promise<Project[]> {
    return getResources<Project[]>('/api/project/all')
}

export function getTables(): Promise<string[]> {
    return getResources<string[]>('/api/database/tables')
}

export function getColumns(table: string): Promise<TableColumns> {
    return getResources<TableColumns>(`/api/${table}/columns`)
}

export function createRow(table: string): Promise<any> {
    return postResources(`/api/${table}/create`, {})
}

export function updateRow(table: string, data: any): Promise<any> {
    return putResources(`/api/${table}/${data.id}/update`, JSON.stringify(data))
}

export function deleteRow(table: string, id: number): Promise<any> {
    return deleteResources(`/api/${table}/${id}`, {})
}