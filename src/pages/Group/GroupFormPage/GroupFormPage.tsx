import GroupFields from "@/pages/Group/GroupFormPage/components/GroupFields.container";
import { AggregatedGroupT, SimpleGroupT } from "@/types/Types";
import { DeleteSaveButtonGroup } from "../../../components/deleteSaveButtonGroup/DeleteSaveButtonGroup.view";
import Header from "../../../components/Header/Header.view";
import { TwoColumnLayout } from "../../../components/TwoColumnLayout/TwoColumnLayout.container";
import { useAggregatedGroupForm } from "./useGroupForm";
import { createContext, useEffect } from "react";
import { MyLoader } from "@/components/MyLoader/MyLoader.view";
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
                    leftContent={<GroupFields group={initialGroup ?? null} />}
                    bottomContent={
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
                    }
                />
            </form>
        </groupFormContext.Provider>
    );
}
