import { Project, TableColumns } from "./types";

export function getResources<T>(url: string) {
    return fetch(url)
        .then(r => r.json())
        .then(res => res as T)
}

export function postResources<T>(url: string, body: T) {
    let headers = new Headers()
    headers.append('content-type', 'application/json')
    headers.append('RequestVerificationToken', document.getElementsByName("__RequestVerificationToken")[0].getAttribute("value"))
    return fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    })
}

export function putResources<T>(url: string, body: T) {
    let headers = new Headers()
    headers.append('content-type', 'application/json')
    headers.append('RequestVerificationToken', document.getElementsByName("__RequestVerificationToken")[0].getAttribute("value"))
    return fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body)
    })
}

export function deleteResources<T>(url: string, body: T) {
    let headers = new Headers()
    headers.append('content-type', 'application/json')
    headers.append('RequestVerificationToken', document.getElementsByName("__RequestVerificationToken")[0].getAttribute("value"))
    return fetch(url, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(body)
    })
}

export function getProjects(): Promise<Project[]> {
    return getResources<Project[]>('/api/projectapi/all')
}

export function getTables(): Promise<string[]> {
    return getResources<string[]>("/api/database/tables")
}

export function getColumns(table: string): Promise<TableColumns> {
    return getResources<TableColumns>(`/api/database/${table}/columns`)
}

export function createRow(table: string): Promise<any> {
    return postResources(`/api/${table}api/create`, {})
}

export function updateRow(table: string, data: any): Promise<any> {
    return putResources(`/api/${table}api/update`, JSON.stringify(data))
}

export function deleteRow(table: string, id: number): Promise<any> {
    return deleteResources(`/api/${table}api/${id}`, {})
}