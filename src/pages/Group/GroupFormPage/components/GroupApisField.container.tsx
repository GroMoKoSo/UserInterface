import { AddNewButton } from "@/components/AddNewButton/AddNewButton.view.js";
import { MyTable } from "@/components/MyTable/MyTable.js";
import { AggregatedApiT, AggregatedGroupT, ApiSpecT, COLORS_PI_ACTIVATION_TYPES } from "@/types/Types.js";
import { useContext, useState } from "react";
import { groupFormContext } from "../GroupFormPage.js";
import { GroupMembersSkeleton, TableSkeleton } from "@/components/Skelletons/Skeletons.view.js";
import { MyLoader } from "@/components/MyLoader/MyLoader.view.js";
import { EditDeleteActions } from "@/components/MyTable/components/EditDeleteActions.js";
import { useEditModalApis } from "../hooks/UseEditModal.js";
import { OpenAction } from "@/components/MyTable/components/OpenAction.js";
import { useNavigate } from "react-router-dom";



export function GroupApisField({ group, systemRole, groupRole }: { group: AggregatedGroupT | null, systemRole: string, groupRole: string }) {

    const { form, mode } = useContext(groupFormContext)

    const navigate = useNavigate();
    const [currentlyEditingApiIndex, setCurrentlyEditingApiIndex] = useState<number | null>(null);
    const [currentlyEditingApi, setCurrentlyEditingApi] = useState<ApiSpecT | null>(null);
    const { open: openEditModal, element: editModalElement } = useEditModalApis(currentlyEditingApiIndex, currentlyEditingApi);


    function handleEditClick(row: AggregatedApiT, index: number) {
        console.log(row)
        setCurrentlyEditingApiIndex(index);
        setCurrentlyEditingApi(row);
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

            if (groupRole === "editor") {
                return false
            }

            return true
        }
        return true
    }

    if (!form) {
        return <MyLoader />
    }

    if (!group) {
        return (<GroupMembersSkeleton />)
    }

    return (
        <>
            {editModalElement}
            <MyTable<AggregatedApiT>
                data={form.values ? form.values.accessibleApis : []}
                columns={[
                    { key: 'name', label: 'Name' },
                    { key: 'version', label: 'Version' },
                    {
                        key: 'activationStatus',
                        label: 'Status',
                        badge: {
                            colorMap: COLORS_PI_ACTIVATION_TYPES,
                            fallbackColor: 'gray',
                        }
                    }

                ]}
                initialSortKey="name"
                renderActions={fieldDisabled() ?
                    (row, index) => (
                        <OpenAction
                            onOpen={(row, index) => navigate(`/apis/${row.id}`)}
                            row={row}
                            rowIndex={index}
                        />
                    ) : (row, index) => (
                        <EditDeleteActions
                            onEdit={(row, index) => handleEditClick(row, index)}
                            onDelete={(row, index) => form.removeListItem("accessibleApis", index)}
                            row={row}
                            rowIndex={index}
                        />
                    )}
                height={"auto"}
            />

            {fieldDisabled() ? null : (
                <AddNewButton
                    onClick={() => alert("Add new API")}
                    label="Add API"
                />
            )}
        </>
    )
}