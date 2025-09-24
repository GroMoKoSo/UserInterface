import { IconArrowsLeftRight, IconChevronRight, IconLogout, IconUserScan } from '@tabler/icons-react';
import { Avatar, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import classes from './UserButton.module.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SessionContext } from '@/utils/authentication/Authwrapper.js';
import { KEYCLOAK_URL, KEYCLOAK_REALM } from '@/types/constants.js';

export function UserButton({ name, email }: { name?: string, email?: string }) {

    const navigate = useNavigate();
    const sessionContext = useContext(SessionContext)
    const keycloak = sessionContext?.keycloak;
    const setUser = sessionContext?.setUser;

    const handleProfileClick = () => {
        window.location.href = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/account/#/`;
    };

    const handleLogoutClick = () => {
        keycloak?.logout();
    }

    return (
        <Menu position='right' trigger="hover" openDelay={100} closeDelay={400}>
            <Menu.Target>

                <UnstyledButton className={classes.user}>
                    <Group>
                        <Avatar
                            src="https://avatars.githubusercontent.com/u/128429825?v=4"
                            radius="xl"
                        />

                        <div style={{ flex: 1 }}>
                            <Text size="sm" fw={500}>
                                {name || "Guest User"}
                            </Text>

                            <Text c="dimmed" size="xs">
                                {email || "guest@example.com"}
                            </Text>
                        </div>

                        <IconChevronRight size={14} stroke={1.5} />
                    </Group>
                </UnstyledButton>

            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>User Profile</Menu.Label>
                <Menu.Item
                    leftSection={<IconUserScan size={14} />}
                    onClick={handleProfileClick}
                >
                    View Profile
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconLogout size={14} />}
                    onClick={handleLogoutClick}
                >
                    Logout
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Dev Tools</Menu.Label>
                <Menu.Item
                    leftSection={<IconArrowsLeftRight size={14} />}
                    onClick={() => {
                        const currentRole = sessionStorage.getItem('role');
                        const newRole = currentRole === 'admin' ? 'user' : 'admin';
                        sessionStorage.setItem('role', newRole);
                        window.location.reload();
                    }}
                >
                    Toggle Admin/User role
                </Menu.Item>

            </Menu.Dropdown>

        </Menu>
    );
}
