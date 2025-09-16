import { UserT, GroupT } from '@/types/Types';
import { getAllGroups } from '@/utils/GroupApiHelper';
import { Accordion, Button, Group, Select } from '@mantine/core';
import { useEffect, useState } from 'react';

import accordionClasses from "./UserGroups.module.css"

type GroupWrapperT = {
    group: GroupT;
    role: "Admin" | "User";
}

export default function UserGroups({ user: User }: { user: UserT | null }) {
    useEffect(() => {

        const groups: GroupT[] = getAllGroups();
        const groupIds: number[] = User?.groups.map(g => g.id) || [];

        const tempUserGroups: GroupWrapperT[] = groups.filter((group: GroupT) => groupIds.includes(group.id)).map(g => ({group: g, role: User?.groups.find(ug => ug.id === g.id)?.role || "User"}));
        setUserGroups(tempUserGroups);
        
        const tempGroupNames: string[] = groups.map((group: GroupT) => group.name);
        setGroupNames(tempGroupNames);
    }, [])

    const [userGroups, setUserGroups] = useState<GroupWrapperT[]>([]);
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
                        defaultValue={groupWrapper.role}
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