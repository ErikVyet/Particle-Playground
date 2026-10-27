
export interface INavigation {
    id: string,
    label: string,
    path?: string,
    subs?: INavigation[]
}