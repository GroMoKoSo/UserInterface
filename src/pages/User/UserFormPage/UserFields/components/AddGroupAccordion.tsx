import { GROUP_ROLES, GroupMemershipT, GroupRolesT, SimpleGroupT } from '@/types/Types.js';
import { Accordion, Button, Group, Select, useMantineColorScheme } from '@mantine/core';
import accordionClasses from "./UserGroupsField.module.css";
import { useContext } from 'react';
import { useForm } from '@mantine/form';
import { userFormContext } from '../../UserFormPage.js';

export function AddGroupAccordion({ possibleGroups }: { possibleGroups: SimpleGroupT[] }) {

    const {form} = useContext(userFormContext)
    const { colorScheme } = useMantineColorScheme();

    const addGroupForm = useForm<{ group: string | null, roleInGroup: GroupRolesT | null }>({
        initialValues: {
            group: null,
            roleInGroup: null
        },
        validate: {
            group: (v: any) => (v ? null : "Group is required"),
            roleInGroup: (v: any) => (v ? null : "Role is required")
        }
    })

    if (!form) {
        return null;
    }

    function onSubmit() {
        if (!form) {
            return;
        }
        if (!addGroupForm.validate().hasErrors) {
            const fullGroup = possibleGroups.find(g => g.name === addGroupForm.getValues().group);
            const role = addGroupForm.getValues().roleInGroup;
            form.insertListItem("groupMemberships", {group: fullGroup, roleInGroup: role} as GroupMemershipT[0]);
            addGroupForm.reset();
        }
    }


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
                            data={possibleGroups.map(g => (g.name ))}
                            {...addGroupForm.getInputProps("group")}
                        />

                        <Select
                            label="Role"
                            placeholder="Pick a role"
                            data={GROUP_ROLES}
                            {...addGroupForm.getInputProps("roleInGroup")}
                        />

                        <Button
                            color={colorScheme === 'dark' ? 'green' : 'green'}
                            variant={colorScheme === 'dark' ? 'filled' : 'filled'}
                            onClick={onSubmit}
                        >
                            Add to User
                        </Button>
                    </Group>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>

    )
}