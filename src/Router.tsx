import { Stack } from '@mantine/core';
import { createBrowserRouter, Navigate, Outlet, RouteObject, RouterProvider } from 'react-router-dom';
import { Sidebar } from './components/sidebar/Sidebar.container.js';
import { NotFoundPage } from './pages/Common/NotFound/NotFound.page.js';
import { BASE_URL } from './types/constants.js';
import { routes, routesAsRouteObject, RouteT } from './utils/authentication/routes.js';
import { useContext } from 'react';
import { SessionContext } from './utils/authentication/Authwrapper.js';
import { SystemRolesT } from './types/Types.js';

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

export function Router() {

    const sessionContext = useContext(SessionContext);
    const permitted_routes: RouteT[] = sessionContext?.permittedRoutes ?? [];

    const routesWithSidebar: RouteObject[] = routesAsRouteObject(
        permitted_routes.filter((r) => r.showSidebar)
    );

    const routesWithoutSidebar: RouteObject[] = routesAsRouteObject(
        permitted_routes.filter((r) => !r.showSidebar)
    );

    const router = createBrowserRouter(
        [
            {
                path: '/',
                element: <Layout />, // adds sidebar to pages
                children: [
                    ...routesWithSidebar,
                    {
                        path: '*',
                        element: <Navigate to="/not-found" replace />,
                    },
                ],
            },
            // Route NOT wrapped in Layout
            ...routesWithoutSidebar,
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
            basename: BASE_URL
        }
    );


    return <RouterProvider router={router} />;
}
