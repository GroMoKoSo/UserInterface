import { SimpleUserT, SimpleGroupT, AggregatedUserT } from '@/types/Types';
import { getAllGroups } from '@/utils/api/GroupApiService';
import { Accordion, Button, Group, Select } from '@mantine/core';
import { useEffect, useState } from 'react';

import accordionClasses from "./UserGroups.module.css"
import { getAggregatedUser } from '@/utils/api/UserApiService';

type UserGroupMembershipT = NonNullable<AggregatedUserT['groupMemberships']>[number];


export default function GroupFields({ user: User }: { user: SimpleUserT | null }) {

    useEffect(() => {
        const groups: SimpleGroupT[] = getAllGroups();
        const tempUserGroups: UserGroupMembershipT[] = User ? getAggregatedUser(User.id)?.groupMemberships ?? [] : [];
        setUserGroups(tempUserGroups);
        
        const tempGroupNames: string[] = groups.map((group: SimpleGroupT) => group.name);
        setGroupNames(tempGroupNames);
    }, [])

    const [userGroups, setUserGroups] = useState<UserGroupMembershipT[]>([]);
    const [groupNames, setGroupNames] = useState<string[]>([]);


    const items = userGroups.map((groupWrapper) => (
        <Accordion.Item
            key={groupWrapper.group.id}
            value={groupWrapper.group.name}
            color='blue'
        >
            <Accordion.Control>{groupWrapper.group.name}</Accordion.Control>
            <Accordion.Panel>
                <Group
                    justify='space-between'
                    align='flex-end'
                >

                    <Select
                        label="Role"
                        placeholder="Pick a role"
                        data={['Admin', 'User']}
                        defaultValue={groupWrapper.roleInGroup}
                    />
                    <Button
                        color='red'
                    >
                        Remove from group
                    </Button>
                </Group>
            </Accordion.Panel>
        </Accordion.Item>
    ));

    return (
        <>
            <Accordion variant="separated" classNames={accordionClasses}>
                {items}
            </Accordion>


            <Accordion
                variant="separated"
                classNames={{
                    ...accordionClasses,
                    root: `${accordionClasses.root} ${accordionClasses.greenRoot}`, // 👈 add extra class
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
                                data={['Admin', 'User']}
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