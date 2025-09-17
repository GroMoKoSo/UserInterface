import { AggregatedUserT, GROUP_TYPES, GroupTypesT, SimpleGroupT, SimpleUserT } from "@/types/Types";
import { getAllUsers } from "@/utils/api/UserApiService";
import { Accordion, Button, Fieldset, Group, Modal, Select, Stack, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import accordionClasses from "../../../User/UserDetails/components/UserGroups.module.css"
import { MyTable } from "@/components/MyTable/MyTable";
import { useDisclosure } from "@mantine/hooks";
import {IconLink} from "@tabler/icons-react"
import { useNavigate } from "react-router-dom";
import { getAggregatedGroup } from "@/utils/api/GroupApiService";
import { useAddModal } from "../hooks/UseAddModal";
import { useEditModal } from "../hooks/UseEditModal";


export type GroupMemberT = SimpleUserT & {
    groupRole: AggregatedUserT['groupMemberships'][number]['roleInGroup'];
};

export default function GroupFields({ group }: { group: SimpleGroupT  }) {
    const [groupMembers, setGroupMembers] = useState<GroupMemberT[]>([]);
    const [currentlyEditingMember, setCurrentlyEditingMember] = useState<GroupMemberT | null>(null);
    const [selectedGroupType, setSelectedGroupType] = useState<GroupTypesT>(group.type);

    useEffect(() => {
        const users: SimpleUserT[] = getAllUsers();
        const aggregatedGroup = getAggregatedGroup(group.id);

        if (!users || !aggregatedGroup) {
            return
        }

        const temp: GroupMemberT[] = aggregatedGroup.members.map((member: { roleInGroup: "Group-Admin" | "Group-Editor" | "Group-Member"; user: SimpleUserT }) => ({
            ...member.user,
            groupRole: member.roleInGroup,
        }));
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

                <Select
                        label="Type"
                        placeholder="Pick a type"
                        data={GROUP_TYPES}
                        mt={"md"}
                        value={selectedGroupType}
                        onChange={(value) => setSelectedGroupType(value as GroupTypesT)}
                    />
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
