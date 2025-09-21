import { GROUP_ROLES, GroupRolesT, SimpleGroupT } from '@/types/Types';
import { Accordion, Button, Group, Select } from '@mantine/core';
import accordionClasses from "./UserGroupsField.module.css"
import { userFormContext } from '../UserFields';
import { useContext, useState } from 'react';

export function AddGroupAccordion({possibleGroups}: {possibleGroups: SimpleGroupT[]}) {

    const form = useContext(userFormContext)
    const [selection, setSelection] = useState<{ group: SimpleGroupT | null; role: GroupRolesT | null }>({
        group: null,
        role: null
    });

    return (
        <Accordion
                variant="separated"
                classNames={{
                    ...accordionClasses,
                    root: `${accordionClasses.root} ${accordionClasses.greenRoot}`,
                }}
                mt={"md"}
                // defaultValue={"add-group"}
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
                                data={possibleGroups.map(g => g.name)}
                                value={selection.group?.name || null}
                                onChange={(val) => {
                                    const group = possibleGroups.find(g => g.name === val) || null;
                                    setSelection((s) => ({ ...s, group }));
                                }}
                            />

                            <Select
                                label="Role"
                                placeholder="Pick a role"
                                data={GROUP_ROLES}
                                value={selection.role || null}
                                onChange={(val) => {
                                    const role = (GROUP_ROLES.find(r => r === val)) || null;
                                    setSelection((s) => ({ ...s, role }));
                                }}
                            />

                            <Button
                                color='green'
                                onClick={() => {
                                    form?.insertListItem("groupMemberships", {group: selection.group, role: selection.role})
                                    setSelection({group: null, role: null})
                                }}
                            >
                                Add to User
                            </Button>
                        </Group>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
    )
}