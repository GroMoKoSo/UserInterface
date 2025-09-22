import { MyTable } from "@/components/MyTable/MyTable";
import { Button, Fieldset, Group, Skeleton, Space } from "@mantine/core";
import { EditDeleteActions } from "@/components/MyTable/components/EditDeleteActions";
import { AggregatedGroupT, COLORS_GROUP_ROLES, GroupMemberT } from "@/types/Types";
import { useContext, useState } from "react";
import { useAddModal } from "../hooks/UseAddModal";
import { useEditModal } from "../hooks/UseEditModal";
import { MyLoader } from "@/components/MyLoader/MyLoader.view";
import { groupFormContext } from "../GroupFormPage";

export type TableGroupMemberT = GroupMemberT[number] & {
    memberName: string;
};

export function GroupMembersField({ group }: { group: AggregatedGroupT | null }) {

    const [currentlyEditingMemberIndex, setCurrentlyEditingMemberIndex] = useState<number | null>(null);
    const { form, mode } = useContext(groupFormContext)
    const { open: openAddModal, element: addModalElement } = useAddModal(form);
    const { open: openEditModal, element: editModalElement } = useEditModal(currentlyEditingMemberIndex, form);

    function handleEditClick(row: TableGroupMemberT, index: number) {
        console.log(row)
        setCurrentlyEditingMemberIndex(index);
        openEditModal();
    }


    if (!form) {
        return <MyLoader />
    }

    if (!group && mode === "edit") {
        return (
            <>
                <Skeleton height={36} />
                <Space h={28} />
                <Group>
                    <Skeleton height={22} width={"30%"}/> 
                    <Skeleton height={22} width={"30%"}/> 
                </Group>    

                <Skeleton height={53} mt={"sm"}/>
                <Skeleton height={53} mt={"xs"}/> 
                <Skeleton height={53} mt={"xs"}/> 

                <Skeleton height={34} mt={"lg"}/> 
            </>
        )
    }

    return (
        <>
            {editModalElement}
            {addModalElement}
           
            <MyTable<TableGroupMemberT>
                data={form.values ? form.values.groupMembers.map((gm: { user: { name: any; }; }) => ({ ...gm, memberName: gm.user.name })) : []}
                columns={[
                    { key: 'memberName', label: 'Name' },
                    {
                        key: 'roleInGroup',
                        label: 'Role',
                        badge: {
                            colorMap: COLORS_GROUP_ROLES,
                            fallbackColor: 'gray',
                        },
                    },
                ]}
                height={"auto"}
                showActions
                renderActions={(row, index) => (
                    <EditDeleteActions
                        onEdit={(row, index) => handleEditClick(row, index)}
                        onDelete={(row, index) => form.removeListItem("groupMembers", index)}
                        row={row}
                        rowIndex={index}
                    />
                )}
            />

            <Button mt="xl" w="100%" variant="outline" color="green" onClick={openAddModal}>
                Add Member
            </Button>
        </>
    )
}