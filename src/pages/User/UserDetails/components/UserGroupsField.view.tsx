import { SimpleGroupT, AggregatedUserT, GROUP_ROLES, GroupRolesT, SimpleUserT } from '@/types/Types';
import { getAllGroups } from '@/utils/api/GroupApiService';
import { Accordion, Button, Group, Select } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';

import accordionClasses from "./UserGroupsField.module.css"
import { getAggregatedUser } from '@/utils/api/UserApiService';

import { MyLoader } from '@/components/MyLoader/MyLoader.view';
import { useAggregatedUserForm } from '../useUserForm';
import { renderGroupAccordionItems } from './GroupAccordionItem.view';
import { userFormContext } from './UserFields';

export type UserGroupMembershipT = NonNullable<AggregatedUserT['groupMemberships']>[number];


export default function UserGroupsField({ user }: { user: AggregatedUserT | null }) {

    if (!user) {
        return <MyLoader />;
    }

    const form = useContext(userFormContext)

    if (!form) {
        return <MyLoader />;
    }

    const groupNames = form.values.groupMemberships.map((gm) => gm.group.name);

    const items = renderGroupAccordionItems({ form });


    return (
        <>
            <Accordion variant="separated" classNames={accordionClasses}>
                {items}
            </Accordion>


            <Accordion
                variant="separated"
                classNames={{
                    ...accordionClasses,
                    root: `${accordionClasses.root} ${accordionClasses.greenRoot}`,
                }}
                mt={"md"}
            >
                <Accordion.Item
                    key={"add-group"}
                    value='add-group'
                >
                    <Accordion.Control>Add Group</Accordion.Control>
                    <Accordion.Panel>
                        <Group
                            justify='space-between'
                            align='flex-end'
                        >
                            <Select
                                label="Group"
                                placeholder="Pick a group"
                                data={groupNames}
                            />

                            <Select
                                label="Role"
                                placeholder="Pick a role"
                                data={GROUP_ROLES}
                            />

                            <Button
                                color='green'
                            >
                                Add to User
                            </Button>
                        </Group>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </>
    );
}