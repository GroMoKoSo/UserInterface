import { MyTable } from "@/components/MyTable/MyTable.js";
import { Button } from "@mantine/core";
import { EditDeleteActions } from "@/components/MyTable/components/EditDeleteActions.js";
import { AggregatedGroupT, COLORS_GROUP_ROLES, GroupMemberT } from "@/types/Types.js";
import { useContext, useState } from "react";
import { useAddModal } from "../hooks/UseAddModal.js";
import { useEditModal } from "../hooks/UseEditModal.js";
import { MyLoader } from "@/components/MyLoader/MyLoader.view.js";
import { groupFormContext } from "../GroupFormPage.js";
import { GroupMembersSkeleton } from "@/components/Skelletons/Skeletons.view.js";

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
        return ( <GroupMembersSkeleton />)
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
                initialSortKey="roleInGroup"
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