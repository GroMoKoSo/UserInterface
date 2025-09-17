import { SimpleUserT, SimpleGroupT, AggregatedUserT, GROUP_ROLES } from '@/types/Types';
import { getAllGroups } from '@/utils/api/GroupApiService';
import { Accordion, Button, Group, Select } from '@mantine/core';
import { useEffect, useState } from 'react';

import accordionClasses from "./UserGroupsField.module.css"
import { getAggregatedUser } from '@/utils/api/UserApiService';
import GroupAccordionItem from './GroupAccordionItem.view';
import { MyLoader } from '@/components/MyLoader/MyLoader.view';

export type UserGroupMembershipT = NonNullable<AggregatedUserT['groupMemberships']>[number];


export default function UserGroupsField({ user }: { user: SimpleUserT | null }) {

    if (!user) {
        return <MyLoader />;
    }

    useEffect(() => {
        const groups: SimpleGroupT[] = getAllGroups();
        const aggregatedUser = getAggregatedUser(user.id);
        const tempUserGroups: UserGroupMembershipT[] = aggregatedUser?.groupMemberships || [];
        setUserGroupMembership(tempUserGroups);

        const tempGroupNames: string[] = groups.map((group: SimpleGroupT) => group.name);
        setGroupNames(tempGroupNames);
    }, [])

    const [userGroupMemberships, setUserGroupMembership] = useState<UserGroupMembershipT[]>([]);
    const [groupNames, setGroupNames] = useState<string[]>([]);


    const items = userGroupMemberships.map((userGroupMembership) => (
        <GroupAccordionItem userGroupMembership={userGroupMembership} />
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