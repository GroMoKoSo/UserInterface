import { SimpleUserT, SimpleGroupT, AggregatedUserT, GroupRolesT, GROUP_ROLES } from '@/types/Types';
import { getAllGroups } from '@/utils/api/GroupApiService';
import { Accordion, Button, Group, Select } from '@mantine/core';
import { useEffect, useState } from 'react';

import accordionClasses from "./UserGroups.module.css"
import { UserGroupMembershipT } from './GroupFields';

export default function GroupField({ userGroupMembership }: { userGroupMembership: UserGroupMembershipT }) {
    const [selectedRole, setSelectedRole] = useState<GroupRolesT>(userGroupMembership.roleInGroup);


    return (
        <Accordion.Item
            key={userGroupMembership.group.id}
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
                        value={selectedRole}
                        onChange={(value) => setSelectedRole(value as GroupRolesT)}
                    />
                    <Button
                        color='red'
                    >
                        Remove from group
                    </Button>
                </Group>
            </Accordion.Panel>
        </Accordion.Item>
    )
}