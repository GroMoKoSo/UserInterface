import { SimpleUserT, SimpleGroupT, AggregatedUserT, GroupRolesT, GROUP_ROLES } from '@/types/Types';
import { getAllGroups } from '@/utils/api/GroupApiService';
import { Accordion, Button, Group, Select } from '@mantine/core';
import { Key, useEffect, useState } from 'react';
import { UserGroupMembershipT } from './UserGroupsField.view';
import { MyLoader } from '@/components/MyLoader/MyLoader.view';


export function renderGroupAccordionItems({ form }: { form: any }) {

    const items = form.values.groupMemberships.map((userGroupMembership: UserGroupMembershipT | null, index: number) => {
        return <GroupAccordionItem key={index} userGroupMembership={userGroupMembership} index={index} />
    });

    function GroupAccordionItem({ userGroupMembership, index }: { userGroupMembership: UserGroupMembershipT | null, index: number }) {

        if (!userGroupMembership) {
            return <MyLoader />;
        }

        const base = `groupMemberships.${index}`;

        return (
            <Accordion.Item
                key={userGroupMembership.group.name}
                value={userGroupMembership.group.name}
                color='blue'
            >
                <Accordion.Control>{userGroupMembership.group.name}</Accordion.Control>
                <Accordion.Panel>
                    <Group
                        justify='space-between'
                        align='flex-end'
                    >

                        <Select
                            label="Role"
                            placeholder="Pick a role"
                            data={GROUP_ROLES}
                            {...form.getInputProps(`${base}.roleInGroup`)}
                            defaultValue={GROUP_ROLES[0]}
                        />
                        <Button
                            color='red'
                            onClick={() => {

                                form.removeListItem('groupMemberships', index);
                            }}
                        >
                            Remove from group
                        </Button>
                    </Group>
                </Accordion.Panel>
            </Accordion.Item>
        )
    }

    return items;
}

