import { DashboardPage } from "@/pages/Common/Dashboard/Dashboard.page.js"
import { LoginPage } from "@/pages/Common/Login/Login.page.js"
import { NotFoundPage } from "@/pages/Common/NotFound/NotFound.page.js"
import { ProfilePage } from "@/pages/Common/Profile/Profile.page.js"
import { GroupDetailsPage } from "@/pages/Group/GroupDetails/GroupDetails.page.js"
import { ManageGroupsPage } from "@/pages/Group/ManageGroups/ManageGroups.page.js"
import { NewGroupPage } from "@/pages/Group/NewGroup/NewGroup.js"
import { PublicGroupsPage } from "@/pages/Group/PublicGroups/PublicGroups.page.js"
import { ManageUsersPage } from "@/pages/User/ManageUsers/ManageUsers.page.js"
import { NewUserPage } from "@/pages/User/NewUser/NewUser.page.js"
import { UserDetailsPage } from "@/pages/User/UserDetails/UsersDetails.page.js"
import { IconGauge, IconUser, IconUsersGroup, IconUsersPlus } from "@tabler/icons-react"
import { RouteObject } from "react-router-dom"


export type RouteT = {
    path: string,
    element: React.ReactNode,
    menu?: MenuItemT,
    showSidebar: boolean,
    adminOnly: boolean
}

export type MenuItemT = {
    label: string,
    icon: React.FC<any>,
}

export const routes: RouteT[] = [
    { path: '/',                element: <DashboardPage />,         showSidebar: true,  adminOnly: false, menu: { label: 'Dashboard',       icon: IconGauge } },
    { path: '/dashboard',       element: <DashboardPage />,         showSidebar: true,  adminOnly: false },
    { path: '/profile',         element: <ProfilePage />,           showSidebar: true,  adminOnly: false,},
    { path: '/groups/public',   element: <PublicGroupsPage />,      showSidebar: true,  adminOnly: false, menu: { label: 'Public Groups',   icon: IconUsersPlus } },
    { path: '/groups',          element: <ManageGroupsPage />,      showSidebar: true,  adminOnly: true,  menu: { label: 'Manage Groups',          icon: IconUsersGroup } },
    { path: '/groups/new',      element: <NewGroupPage />,          showSidebar: true, adminOnly: true },
    { path: '/groups/:name',    element: <GroupDetailsPage />,      showSidebar: true, adminOnly: false },
    { path: '/users',           element: <ManageUsersPage />,       showSidebar: true,  adminOnly: true,  menu: { label: 'Manage Users',           icon: IconUser } },
    { path: '/users/new',       element: <NewUserPage />,           showSidebar: true, adminOnly: true },
    { path: '/users/:username', element: <UserDetailsPage />,       showSidebar: true, adminOnly: true },
    { path: '/login',           element: <LoginPage />,             showSidebar: false, adminOnly: false },
    { path: '/not-found',       element: <NotFoundPage />,          showSidebar: false, adminOnly: false },
]

export const routesAsRouteObject = (routes: RouteT[]): RouteObject[] => 
    routes.map((r) => ({ path: r.path, element: r.element }))
