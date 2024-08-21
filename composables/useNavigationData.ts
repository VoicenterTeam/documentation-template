import type { NavItem } from '@nuxt/content'
import type { RouteLocationRaw } from 'vue-router'

export interface INavigationMapped {
    to: RouteLocationRaw
    label: string
    icon: string
    labelClass?: string
    iconClass?: string
    children?: Array<INavigationMapped>
}

export const useNavigationMappedData = (navigation: Ref<NavItem[]> | undefined, filterPath: string) => {
    const { ui } = useAppConfig()

    const NAV_ICONS = {
        root: ui.icons.navRoot,
        folder: ui.icons.navFolder,
        page: ui.icons.navPage
    }

    const navigationListMapped = computed(() => {
        return mapNavigation(navigation?.value || [], filterPath, true)
    })

    function mapNavigation (navigation: Array<NavItem>, path: string, isRoot: boolean) {
        const navDocsItems = navigation.find(i => i._path === path)?.children || []
        return mapContentNavigation(navDocsItems, isRoot)
    }

    function mapContentNavigation (navigation: NavItem[], isRoot = false): Array<INavigationMapped> {

        return navigation.map((navLink) => {
            if (navLink.children) {
                return {
                    icon: NAV_ICONS.folder,
                    to: navLink._path,
                    label: navLink.title,
                    children: mapContentNavigation(navLink.children)
                }
            }

            return {
                icon: navLink.icon || (isRoot ? NAV_ICONS.root : NAV_ICONS.page),
                to: navLink._path,
                label: navLink.title
            }
        })
    }

    return {
        navigationListMapped
    }

}
