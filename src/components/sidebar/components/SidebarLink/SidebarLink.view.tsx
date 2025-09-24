import { Box, Group, ThemeIcon, UnstyledButton } from '@mantine/core';
import classes from './SidebarLink.module.css';
import { useNavigate } from 'react-router-dom';

interface LinksGroupProps {
    icon: React.FC<any>;
    label: string;
    path: string;
}

export function LinksGroup({ icon: Icon, label, path }: LinksGroupProps) {

    const navigate = useNavigate()

    return (
        <>
            <UnstyledButton onClick={() => navigate(path)} className={classes.control}>
                <Group justify="space-between" gap={0}>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <ThemeIcon variant="light" size={30}>
                            <Icon size={18} />
                        </ThemeIcon>
                        <Box ml="md">{label}</Box>
                    </Box>
                </Group>
            </UnstyledButton>
        </>
    );
}

