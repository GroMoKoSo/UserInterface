import { SimpleGroupT, AggregatedUserT, GROUP_ROLES, GroupRolesT, SimpleUserT } from '@/types/Types';
import { getAllGroups } from '@/utils/api/GroupApiService';
import { Accordion, Button, Group, Select } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';

import accordionClasses from "./UserGroupsField.module.css"
import { getAggregatedUser } from '@/utils/api/UserApiService';

import { MyLoader } from '@/components/MyLoader/MyLoader.view';
import { useAggregatedUserForm } from '../../../useUserForm';
import { renderGroupAccordionItems } from './GroupAccordionItem.view';
import { userFormContext } from '../../../UsersDetails.page';
import { AddGroupAccordion } from './AddGroupAccordion';

export type UserGroupMembershipT = NonNullable<AggregatedUserT['groupMemberships']>[number];


export default function UserGroupsField({ user }: { user: AggregatedUserT | null }) {

    if (!user) {
        return <MyLoader />;
    }

    const form = useContext(userFormContext)

    if (!form || form === undefined) {
        return <MyLoader />;
    }

    const items = renderGroupAccordionItems({ form });
    const [possibleGroups, setPossibleGroups] = useState<SimpleGroupT[]>([]);

    useEffect(() => {
        async function fetchGroups() {
            if (!form) {
                setPossibleGroups([]);
                return;
            }
            const groups = await getAllGroups();
            const filtered = groups.filter(
                (g) => !form.values.groupMemberships.map((gm) => gm.group.name).includes(g.name)
            );
            setPossibleGroups(filtered);
        }
        fetchGroups();
    }, [form?.values.groupMemberships]);

    return (
        <>
            <Accordion variant="separated" classNames={accordionClasses}>
                {items}
            </Accordion>


            <AddGroupAccordion possibleGroups={possibleGroups} />
        </>
    );
}