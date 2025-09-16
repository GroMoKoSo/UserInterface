import {
    IconUser,
    IconGauge,
    IconApi,
    IconUsersGroup,
    IconUsersPlus,
} from '@tabler/icons-react';
import { Code, Group, ScrollArea, Title } from '@mantine/core';
import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';
import { UserButton } from '../UserButton/UserButton';
import classes from './NavbarNested.module.css';
import { link } from 'fs';

const mockdata = [
    { label: 'Dashboard', icon: IconGauge, link: '/' },
    { label: "My Api's", icon: IconApi, link: '/apis' },
    { label: 'Public Groups', icon: IconUsersPlus, link: '/groups/public' },
    { label: 'Manage Users', icon: IconUser, link: '/users' },
    { label: 'Manage Groups', icon: IconUsersGroup, link: '/groups' },
    
];

export function NavbarNested() {
    const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

    return (
        <nav className={classes.navbar}>
            <div className={classes.header}>
                <Group justify="space-between">
                    <Title order={2}>GroMoKoSo</Title>
                    <Code fw={700}>v0.0.1</Code>
                </Group>
            </div>

            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>

            <div className={classes.footer}>
                <UserButton />
            </div>
        </nav>
    );
}
