import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider } from '@mantine/core';
import { Router } from './Router.js';
import { theme } from './theme.js';
import { Notifications } from '@mantine/notifications';
import { AuthWrapper } from './utils/authentication/Authwrapper.js';

export default function App() {
    return (
        <AuthWrapper>
            <MantineProvider theme={theme}>
                <Notifications />
                <Router />
            </MantineProvider>
        </AuthWrapper>
    );
}
