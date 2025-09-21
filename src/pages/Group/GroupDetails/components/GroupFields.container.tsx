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
import { GroupMembersField } from "./GroupMembersField.view";
import { GroupInformationField } from "./GroupInformationField.view";
import { MyLoader } from "@/components/MyLoader/MyLoader.view";


export type GroupMemberT = SimpleUserT & {
    groupRole: AggregatedUserT['groupMemberships'][number]['roleInGroup'];
};

export default function GroupFields({ group }: { group: SimpleGroupT | null  }) {
    if (!group) {
        return <MyLoader />
    }

    const [groupMembers, setGroupMembers] = useState<GroupMemberT[]>([]);
    const [currentlyEditingMember, setCurrentlyEditingMember] = useState<GroupMemberT | null>(null);
    const [selectedGroupType, setSelectedGroupType] = useState<GroupTypesT>(group.type);

    const { open: openAddModal, element: addModalElement } = useAddModal();
    const { open: openEditModal, element: editModalElement } = useEditModal(currentlyEditingMember, group);

    useEffect(() => {
        const users: SimpleUserT[] = getAllUsers();
        const aggregatedGroup = getAggregatedGroup(group.name);

        if (!users || !aggregatedGroup) {
            return
        }

        const temp: GroupMemberT[] = aggregatedGroup.groupMembers.map((member) => ({
            ...member.user,
            groupRole: member.roleInGroup,
        }));
        setGroupMembers(temp);
    }, [group]);

    
    function handleEditClick(row: GroupMemberT) {
        setCurrentlyEditingMember(row);
        openEditModal();
    }

    return (
        <>
            {editModalElement}
            
            {addModalElement}

            <GroupInformationField 
                group={group}
                selectedGroupType={selectedGroupType}
                setSelectedGroupType={setSelectedGroupType}
            />

            <GroupMembersField 
                handleEditClick={handleEditClick}
                openAddModal={openAddModal}
                groupMembers={groupMembers}
            />
        </>
    );
}
