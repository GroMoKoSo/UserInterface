import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { DashboardPage } from './pages/Common/Dashboard/Dashboard.page';
import { Sidebar } from './components/sidebar/Sidebar.container';
import { Container, Stack } from '@mantine/core';
import { ManageUsersPage } from './pages/User/ManageUsers/ManageUsers.page';
import { ApisPage } from './pages/Api/Apis.page';
import { ManageGroupsPage } from './pages/Group/ManageGroups/ManageGroups.page';
import { PublicGroupsPage } from './pages/Group/PublicGroups/PublicGroups.page';
import path from 'path';
import { UserDetailsPage } from './pages/User/UserDetails/UsersDetails.page';
import { GroupDetailsPage } from './pages/Group/GroupDetails/GroupDetails.page';
import { LoginPage } from './pages/Common/Login/Login.page';
import { ProfilePage } from './pages/Common/Profile/Profile.page';
import { NotFoundPage } from './pages/Common/NotFound/NotFound.page';

function Layout() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <Stack
                m={'xl'}
                align="flex-start"
                justify="flex-start"
                gap="xl"
                w="100%"
            >

                <Outlet /> {/* This renders the routed content */}

            </Stack>
        </div>
    );
}

declare global {
    interface Window {
        ENV?: { BASE_URL?: string };
    }
}


const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Layout />, // Wrap routes with Layout
            children: [
                // Common routes
                {
                    path: '/',
                    element: <DashboardPage />,
                },
                {
                    path: '/dashboard',
                    element: <DashboardPage />,
                },
                {
                    path: '/me',
                    element: <ProfilePage />,
                },
                // User routes
                {
                    path: '/users',
                    element: <ManageUsersPage />
                },
                {
                    path: '/users/:id',
                    element: <UserDetailsPage />
                },
                // Group routes
                {
                    path: '/groups',
                    element: <ManageGroupsPage />,
                },
                {
                    path: '/groups/public',
                    element: <PublicGroupsPage />,
                },
                {
                    path: '/groups/:id',
                    element: <GroupDetailsPage />,
                },
                // API routes
                // currently disabled due to incomplete implementation
                // {
                //     path: '/apis',
                //     element: <ApisPage />,
                // },
                // Forward unknown routes to NotFound
                {
                    path: '*',
                    element: <Navigate to="/not-found" replace />,
                },
            ],
        },
        // Route NOT wrapped in Layout
        {
            path: '/login',
            element: <LoginPage />,
        },
        // Fallback for unknown routes outside Layout
        {
            path: '/not-found',
            element: <NotFoundPage />,
        },
        {
            path: '*',
            element: <Navigate to="/not-found" replace />,
        },
    ],
    {
        basename: window.ENV?.BASE_URL ?? "/test-router"
    }
);

export function Router() {
    return <RouterProvider router={router} />;
}
