import type { RouteLocationRaw } from 'vue-router'

export interface INavigationMapped {
    to: RouteLocationRaw
    label: string
    icon: string
    labelClass?: string
    iconClass?: string
    children?: Array<INavigationMapped>
}
