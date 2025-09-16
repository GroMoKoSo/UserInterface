import { GroupT, UserT } from "@/types/Types";
import { getAllUsers } from "@/utils/UserApiHelper";
import { Accordion, Button, Fieldset, Group, Modal, Select, Stack, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import accordionClasses from "../../../User/UserDetails/components/UserGroups.module.css"
import { MyTable } from "@/components/Table/Table";
import { useDisclosure } from "@mantine/hooks";
import {IconLink} from "@tabler/icons-react"
import { useNavigate } from "react-router-dom";


type GroupMemberT = UserT & {
    groupRole: "Admin" | "User"
};

function useAddModal() {
    const [opened, { open, close }] = useDisclosure(false);

    const element = (
        <Modal
            opened={opened}
            onClose={close}
            title="Add a User to the Group"
            overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        >
            <Button>Add User</Button>
        </Modal>
    );

    return { opened, open, close, element };
}

function useEditModal(member: GroupMemberT | null, group?: GroupT | null) {
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate()

    const element = member && group ? (
        <Modal
            opened={opened}
            onClose={close}
            title={<strong>{member.name}</strong>}
            overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        >
            <Stack>

                <Button
                    variant="light"
                    onClick={() => navigate(`/users/${member.id}`)}
                >
                    Go to User Details
                </Button>             

                <Select
                    label={`Role in ${group.name}`}
                    placeholder="Pick a role"
                    data={["Admin", "User"]}
                    defaultValue={member.groupRole}
                />



                <Button mt="md" color="green" onClick={close}>
                    Save
                </Button>

            </Stack>
        </Modal>
    ) : null;
    return { opened, open, close, element };
}

export default function GroupFields({ group }: { group: GroupT | null }) {
    const [groupMembers, setGroupMembers] = useState<GroupMemberT[]>([]);
    const [currentlyEditingMember, setCurrentlyEditingMember] = useState<GroupMemberT | null>(null);

    useEffect(() => {
        const user: UserT[] = getAllUsers();
        const temp = user
            .filter((u) => u.groups.map((g) => g.id).includes(group?.id || 0))
            .map((u) => {
                const roleHere = u.groups.find((g) => g.id === group?.id)?.role || "User";
                return { ...u, groupRole: roleHere };
            });
        setGroupMembers(temp);
    }, [group]);

    const { open: openAddModal, element: addModalEl } = useAddModal();
    const { open: openEditModal, element: editModalEl } = useEditModal(currentlyEditingMember, group);

    function handleEditClick(row: GroupMemberT) {
        setCurrentlyEditingMember(row);
        openEditModal();
    }

    if (!group) return "loading";

    return (
        <>
            {editModalEl}
            {addModalEl}

            <Fieldset legend="Group Information">
                <TextInput label="Name" placeholder="Name" value={group.name} />
            </Fieldset>

            <Fieldset legend="Group Members" mt="md" w="100%" maw={1000}>
                <MyTable<GroupMemberT>
                    data={groupMembers}
                    columns={["id", "name", "groupRole"]}
                    height="40vh"
                    onEdit={handleEditClick}
                    onDelete={() => openEditModal()}
                />

                <Button mt="xl" w="100%" variant="outline" color="green" onClick={openAddModal}>
                    Add Member
                </Button>
            </Fieldset>
        </>
    );
}
