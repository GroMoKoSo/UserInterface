import { SimpleGroupT, AggregatedUserT, GROUP_ROLES, GroupRolesT, SimpleUserT } from '@/types/Types';
import { getAllGroups } from '@/utils/api/GroupApiService';
import { Accordion, Button, Group, Select, Skeleton, Space } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';

import accordionClasses from "./UserGroupsField.module.css"
import { getAggregatedUser } from '@/utils/api/UserApiService';

import { MyLoader } from '@/components/MyLoader/MyLoader.view';
import { useAggregatedUserForm } from '../../../useUserForm';
import { renderGroupAccordionItems } from './GroupAccordionItem.view';
import { AddGroupAccordion } from './AddGroupAccordion';
import { userFormContext } from '@/components/UserFormPage/UserFormPage';

export type UserGroupMembershipT = NonNullable<AggregatedUserT['groupMemberships']>[number];


export default function UserGroupsField({ user }: { user: AggregatedUserT | null }) {

    const { form, mode } = useContext(userFormContext)
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
                (g) => !form.values.groupMemberships.map((gm: { group: { name: any; }; }) => gm.group.name).includes(g.name)
            );
            setPossibleGroups(filtered);
        }
        fetchGroups();
    }, [form?.values.groupMemberships]);

    if (!form || form === undefined) {
        return <MyLoader />;
    }

    if (!user && mode === "edit") {
        return (
            <>
                <Skeleton height={50} />
                <Skeleton height={50} mt={"md"}/>
                <Skeleton height={50} mt={"md"}/>
            </>
        )
    }

    return (
        <>
            <Accordion variant="separated" classNames={accordionClasses}>
                {items}
            </Accordion>


            <AddGroupAccordion possibleGroups={possibleGroups} />
        </>
    );
}