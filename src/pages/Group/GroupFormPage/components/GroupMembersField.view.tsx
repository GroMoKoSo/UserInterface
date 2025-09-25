import { MyTable } from "@/components/MyTable/MyTable.js";
import { Button } from "@mantine/core";
import { EditDeleteActions } from "@/components/MyTable/components/EditDeleteActions.js";
import { AggregatedGroupT, COLORS_GROUP_ROLES, GroupMemberT } from "@/types/Types.js";
import { useContext, useState } from "react";
import { useAddModalGroupMember } from "../hooks/UseAddModal.js";
import { useEditModalGroupMember } from "../hooks/UseEditModal.js";
import { MyLoader } from "@/components/MyLoader/MyLoader.view.js";
import { groupFormContext } from "../GroupFormPage.js";
import { GroupMembersSkeleton } from "@/components/Skelletons/Skeletons.view.js";
import { OpenAction } from "@/components/MyTable/components/OpenAction.js";
import { useNavigate } from "react-router-dom";

export type TableGroupMemberT = GroupMemberT[number] & {
    memberName: string;
};

export function GroupMembersField({ group, systemRole, groupRole }: { group: AggregatedGroupT | null, systemRole: string, groupRole: string }) {

    const navigate = useNavigate();
    const [currentlyEditingMemberIndex, setCurrentlyEditingMemberIndex] = useState<number | null>(null);
    const { form, mode } = useContext(groupFormContext)
    const { open: openAddModal, element: addModalElement } = useAddModalGroupMember();
    const { open: openEditModal, element: editModalElement } = useEditModalGroupMember(currentlyEditingMemberIndex, form);

    function handleEditClick(row: TableGroupMemberT, index: number) {
        console.log(row)
        setCurrentlyEditingMemberIndex(index);
        openEditModal();
    }

    const fieldDisabled = () => {
        if (mode === "edit") {
            if (systemRole === "admin") {
                return false
            }

            if (groupRole === "admin") {
                return false
            }

            return true
        }
        return false
    }


    if (!form) {
        return <MyLoader />
    }

    if (!group && mode === "edit") {
        return (<GroupMembersSkeleton />)
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

                renderActions={fieldDisabled() ?
                    (row, index) => (
                        <OpenAction
                            onOpen={(row, index) => navigate(`/users/${row.user.username}`)}
                            row={row}
                            rowIndex={index}
                        />
                    ) : (row, index) => (
                        <EditDeleteActions
                            onEdit={(row, index) => handleEditClick(row, index)}
                            onDelete={(row, index) => form.removeListItem("groupMembers", index)}
                            row={row}
                            rowIndex={index}
                        />
                    )
                }
            />

            {fieldDisabled() ? null : (
                <Button mt="xl" w="100%" variant="outline" color="green" onClick={openAddModal}>
                    Add Member
                </Button>
            )}
        </>
    )
}