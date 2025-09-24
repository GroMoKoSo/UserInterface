import UserFields from "@/pages/User/UserFormPage/UserFields/UserFields.js";
import { useAggregatedUserForm } from "@/pages/User/UserFormPage/useUserForm.js";
import { AggregatedUserT } from "@/types/Types.js";
import { createContext, useEffect } from "react";
import { DeleteSaveButtonGroup } from "../../../components/deleteSaveButtonGroup/DeleteSaveButtonGroup.view.js";
import Header from "../../../components/Header/Header.view.js";
import { MyLoader } from "../../../components/MyLoader/MyLoader.view.js";
import { TwoColumnLayout } from "../../../components/TwoColumnLayout/TwoColumnLayout.container.js";

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
                    bottomContent={
                        <DeleteSaveButtonGroup
                            deleteLabel="Delete User"
                            saveLabel={mode === "edit" ? "Save Changes" : "Create User"}
                            nameLabel={initialUser ? `${initialUser.firstName} ${initialUser.lastName}` : ""}
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
