import { IconChevronRight } from '@tabler/icons-react';
import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import classes from './UserButton.module.css';
import { useNavigate } from 'react-router-dom';

export function UserButton() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/profile');
    };

    return (
        <UnstyledButton className={classes.user} onClick={handleClick}>
            <Group>
                <Avatar
                    src="https://avatars.githubusercontent.com/u/128429825?v=4"
                    radius="xl"
                />

                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        Leon Schäfer
                    </Text>

                    <Text c="dimmed" size="xs">
                        leon.schaefer@web.de
                    </Text>
                </div>

                <IconChevronRight size={14} stroke={1.5} />
            </Group>
        </UnstyledButton>
    );
}
