import { GroupFieldsLeft, GroupFieldsRight, useGroupSession } from "@/pages/Group/GroupFormPage/components/GroupFields.container.js";
import { AggregatedGroupT, SimpleGroupT } from "@/types/Types.js";
import { DeleteSaveButtonGroup } from "../../../components/deleteSaveButtonGroup/DeleteSaveButtonGroup.view.js";
import Header from "../../../components/Header/Header.view.js";
import { TwoColumnLayout } from "../../../components/TwoColumnLayout/TwoColumnLayout.container.js";
import { useAggregatedGroupForm } from "./useGroupForm.js";
import { createContext, useEffect } from "react";
import { MyLoader } from "@/components/MyLoader/MyLoader.view.js";
import { UseFormReturnType } from "@mantine/form";


type GroupFormPageProps = {
    mode: "create" | "edit";
    initialGroup?: AggregatedGroupT | null;
    onSubmit: (values: AggregatedGroupT) => Promise<any> | void;
    onDelete?: (group: SimpleGroupT) => Promise<void> | void;
};

export const groupFormContext = createContext<any>(null)

export function GroupFormPage({
    mode,
    initialGroup,
    onSubmit,
    onDelete,
}: GroupFormPageProps) {

    const form: UseFormReturnType<AggregatedGroupT, (values: AggregatedGroupT) => AggregatedGroupT> = useAggregatedGroupForm(initialGroup ?? null);

    const { systemRole, groupRole } = initialGroup ? useGroupSession(initialGroup) : { systemRole: "member", groupRole: "member" };

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
        return false
    }


    useEffect(() => {
        if (initialGroup) {
            form.setValues(initialGroup);
        }
    }, [initialGroup]);


    if (!form) {
        return <MyLoader />;
    }

    return (
        <groupFormContext.Provider value={{ form, mode }}>
            <form onSubmit={form.onSubmit(onSubmit)} style={{ width: "100%" }}>
                <TwoColumnLayout
                    headerContent={
                        <Header
                            title={
                                mode === "edit"
                                    ? `Group Details - ${initialGroup?.name ?? ""}`
                                    : "New Group"
                            }
                            backButton={true}
                        />
                    }
                    leftContent={<GroupFieldsLeft group={initialGroup ?? null} />}
                    rightContent={<GroupFieldsRight group={initialGroup ?? null} />}
                    bottomContent={
                        fieldDisabled() ? null : (
                            <DeleteSaveButtonGroup
                                deleteLabel="Delete Group"
                                saveLabel={mode === "edit" ? "Save Changes" : "Create Group"}
                                nameLabel={initialGroup?.name ?? ""}
                                onDelete={
                                    mode === "edit" && onDelete ? () => onDelete(initialGroup!) : () => console.log("no delete function provided")
                                }
                                onSave={() => form.setSubmitting(true)}
                                showDelete={mode === "edit"}
                            />
                        )
                    }
                />
            </form>
        </groupFormContext.Provider>
    );
}
