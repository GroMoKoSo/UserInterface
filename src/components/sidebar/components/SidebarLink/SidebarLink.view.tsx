import { useState } from 'react';
import { IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import { Box, Collapse, Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import classes from './SidebarLink.module.css';
import { useNavigate } from 'react-router-dom';

interface LinksGroupProps {
    icon: React.FC<any>;
    label: string;
    initiallyOpened?: boolean;
    link: string;
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, link }: LinksGroupProps) {

    const navigate = useNavigate()

    return (
        <>
            <UnstyledButton onClick={() => navigate(link)} className={classes.control}>
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

