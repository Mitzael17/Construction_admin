export interface FilesResponse {
    directories: string[],
    files: {name: string, link: string}[]
}