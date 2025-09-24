import { ScrollArea } from '@mantine/core';
import { LinksGroup } from './components/SidebarLink/SidebarLink.view.js';
import { UserButton } from './components/UserButton/UserButton.view.js';
import classes from './Sidebar.module.css';
import { SidebarTitle } from './components/SidebarTitle/SidebarTitle.view.js';
import { MenuItemT, routes, RouteT } from '@/utils/authentication/routes.js';
import { SessionContext } from '@/utils/authentication/Authwrapper.js';
import { useContext } from 'react';


export function Sidebar() {

    const sessionContext = useContext(SessionContext);

    const links = sessionContext?.permittedRoutes
        .filter((r): r is RouteT & { menu: MenuItemT } => r.menu !== undefined)
        .map((item, index) => <LinksGroup key={index} icon={item.menu.icon} label={item.menu.label} path={item.path} />);

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
