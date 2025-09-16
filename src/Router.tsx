import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { NavbarNested } from './components/sidebar/NavbarNested/NavbarNested';
import { Container, Stack } from '@mantine/core';
import { UsersPage } from './pages/User/Users.page';
import { ApisPage } from './pages/Api/Apis.page';
import { GroupsPage } from './pages/Group/Groups.page';
import path from 'path';
import { UserDetailsPage } from './pages/User/UserDetails/UsersDetails.page';
import { GroupDetailsPage } from './pages/Group/GroupDetails/GroupDetails.page';

function Layout() {
    return (
        <div style={{ display: 'flex' }}>
            <NavbarNested />
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

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />, // Wrap routes with Layout
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/users',
                element: <UsersPage />
            },
            {
                path: '/users/:id',
                element: <UserDetailsPage />
            },
            {
                path: '/groups',
                element: <GroupsPage />,
            },
            {
                path: '/groups/:id',
                element: <GroupDetailsPage />,
            },
            {
                path: '/apis',
                element: <ApisPage />,
            },
        ],
    },
]);

export function Router() {
    return <RouterProvider router={router} />;
}
