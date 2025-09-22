import UserFields from "@/pages/User/UserDetails/components/UserFields/UserFields";

import { useAggregatedUserForm } from "@/pages/User/UserDetails/useUserForm";
import { AggregatedUserT } from "@/types/Types";
import { createContext, useEffect } from "react";
import { DeleteSaveButtonGroup } from "../deleteSaveButtonGroup/DeleteSaveButtonGroup.view";
import Header from "../Header/Header.view";
import { MyLoader } from "../MyLoader/MyLoader.view";
import { TwoColumnLayout } from "../TwoColumnLayout/TwoColumnLayout.container";

type UserFormPageProps = {
    mode: "create" | "edit";
    initialUser?: AggregatedUserT | null;
    onSubmit: (values: AggregatedUserT) => Promise<any>;
    onDelete?: (user: AggregatedUserT) => Promise<void>;
};

export const userFormContext = createContext<any>(null)

export function UserFormPage({
    mode,
    initialUser,
    onSubmit,
    onDelete
}: UserFormPageProps) {
    const userForm = useAggregatedUserForm(initialUser ?? null);
    const form = userForm.form;

    useEffect(() => {
        if (initialUser) {
            form.setValues(initialUser);
        }
    }, [initialUser]);


    if (!form) {
        return <MyLoader />;
    }

    return (
        <userFormContext.Provider value={{ form, mode }}>
            <form onSubmit={form.onSubmit(onSubmit)} style={{ width: "100%" }}>
            <TwoColumnLayout
                headerContent={
                <Header
                    title={
                    mode === "edit"
                        ? `User Details - ${initialUser?.firstName ?? ""} ${initialUser?.lastName ?? ""}`
                        : "New User"
                    }
                    backButton={true}
                />
                }
                leftContent={<UserFields user={initialUser ?? null} />}
                rightContent={<div></div>}
                bottomContent={
                <DeleteSaveButtonGroup
                    deleteLabel="Delete User"
                    saveLabel={mode === "edit" ? "Save Changes" : "Create User"}
                    nameLabel={
                    initialUser ? `${initialUser.firstName} ${initialUser.lastName}` : ""
                    }
                    onDelete={
                    mode === "edit" && onDelete ? () => onDelete(initialUser!) : () => console.log("Create mode, no delete action")
                    }
                    onSave={() => form.setSubmitting(true)}
                    showDelete={mode === "edit"}
                />
                }
            />
            </form>
        </userFormContext.Provider>
    );
}
