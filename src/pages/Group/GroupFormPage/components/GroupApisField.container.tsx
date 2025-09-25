import { AddNewButton } from "@/components/AddNewButton/AddNewButton.view.js";
import { MyTable } from "@/components/MyTable/MyTable.js";
import { AggregatedApiT, AggregatedGroupT, ApiSpecT, COLORS_PI_ACTIVATION_TYPES } from "@/types/Types.js";
import { useContext, useState } from "react";
import { groupFormContext } from "../GroupFormPage.js";
import { GroupMembersSkeleton, TableSkeleton } from "@/components/Skelletons/Skeletons.view.js";
import { MyLoader } from "@/components/MyLoader/MyLoader.view.js";
import { EditDeleteActions } from "@/components/MyTable/components/EditDeleteActions.js";
import { useEditModalApis } from "../hooks/UseEditModal.js";



export function GroupApisField({ group }: { group: AggregatedGroupT | null }) {

    const FormContext = useContext(groupFormContext);
    const form = FormContext.form;

    const [currentlyEditingApiIndex, setCurrentlyEditingApiIndex] = useState<number | null>(null);
    const [currentlyEditingApi, setCurrentlyEditingApi] = useState<ApiSpecT | null>(null);
    const { open: openEditModal, element: editModalElement } = useEditModalApis(currentlyEditingApiIndex, currentlyEditingApi);


    function handleEditClick(row: AggregatedApiT, index: number) {
        console.log(row)
        setCurrentlyEditingApiIndex(index);
        setCurrentlyEditingApi(row);
        openEditModal();
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
                renderActions={(row, index) => (
                    <EditDeleteActions
                        onEdit={(row, index) => handleEditClick(row, index)}
                        onDelete={(row, index) => form.removeListItem("accessibleApis", index)}
                        row={row}
                        rowIndex={index}
                    />
                )}
                height={"auto"}
            />

            <AddNewButton
                onClick={() => alert("Add new API")}
                label="Add API"
            />
        </>
    )
}