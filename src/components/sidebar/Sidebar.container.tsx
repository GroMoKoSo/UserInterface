import {
    IconUser,
    IconGauge,
    IconApi,
    IconUsersGroup,
    IconUsersPlus,
} from '@tabler/icons-react';
import { Code, Group, ScrollArea, Title } from '@mantine/core';
import { LinksGroup } from './components/SidebarLink/SidebarLink.view';
import { UserButton } from './components/UserButton/UserButton.view';
import classes from './Sidebar.module.css';
import { link } from 'fs';
import { SidebarTitle } from './components/SidebarTitle/SidebarTitle.view';

const mockdata = [
    { label: 'Dashboard', icon: IconGauge, link: '/' },
    { label: "My Api's", icon: IconApi, link: '/apis' },
    { label: 'Public Groups', icon: IconUsersPlus, link: '/groups/public' },
    { label: 'Manage Users', icon: IconUser, link: '/users' },
    { label: 'Manage Groups', icon: IconUsersGroup, link: '/groups' },
    
];

export function Sidebar() {
    const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

    return (
        <nav className={classes.navbar}>
            <div className={classes.header}>
                <SidebarTitle 
                    title={'GroMoKoSo'}
                    version={'0.0.1'}
                />
            </div>

            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>
                    {links}
                </div>
            </ScrollArea>

            <div className={classes.footer}>
                <UserButton />
            </div>
        </nav>
    );
}
