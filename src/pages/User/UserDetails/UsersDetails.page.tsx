import { useNavigate, useParams } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { AggregatedUserT } from "../../../types/Types";
import { deleteUser, getAggregatedUser, updateUser } from "@/utils/api/UserApiService";
import Header from "@/components/Header/Header.view";
import UserFields from "./components/UserFields/UserFields";
import { TwoColumnLayout } from "@/components/TwoColumnLayout/TwoColumnLayout.container";
import { useConfirm } from "@/components/useConfirm/useConfirm";
import { Notifications } from "@mantine/notifications";
import { DeleteSaveButtonGroup } from "@/components/deleteSaveButtonGroup/DeleteSaveButtonGroup.view";
import { useAggregatedUserForm } from "./useUserForm";
import { MyLoader } from "@/components/MyLoader/MyLoader.view";
import { UseFormReturnType } from "@mantine/form";

export const userFormContext = createContext<
    UseFormReturnType<AggregatedUserT, (values: AggregatedUserT) => AggregatedUserT> | undefined
>(undefined);

export function UserDetailsPage() {
    const [user, setUser] = useState<AggregatedUserT | null>(null);
    const { username } = useParams<{ username: string }>();

    // Formular-Hook immer aufrufen
    const userForm = useAggregatedUserForm(user);
    const form = userForm.form;

    // User-Daten laden
    useEffect(() => {
        async function fetchUser() {
            if (username) {
                const userData = await getAggregatedUser(username);
                setUser(userData);
            }
        }
        fetchUser();
    }, [username]);

    // Form-Werte aktualisieren, sobald user geladen ist
    useEffect(() => {
        if (user) {
            console.log("Setting form values for user:", user);
            form.setValues(user)
        }
    }, [user]);

    const navigate = useNavigate();

    async function onDelete(row: AggregatedUserT | null) {
        if (!row) {
            Notifications.show({ message: 'No user selected to delete.', color: 'red' });
            return;
        }

        if (row && typeof row === 'object') {
            // res === payload (UserT), weil bestätigt
            await deleteUser(row.username);
            navigate(-1);
        }
    }

    if (!form || !user) {
        return <MyLoader />;
    }

    return (
        <userFormContext.Provider value={form}>
            <form 
                onSubmit={form.onSubmit((values: AggregatedUserT) => updateUser(values))}
                style={{ width: "100%" }}
            >

                <TwoColumnLayout
                    headerContent={
                        <Header
                            title={`User Details - ${user ? user.firstName + " " + user.lastName : "Loading..."
                                }`}
                            backButton={true}
                        />
                    }
                    leftContent={<UserFields user={user} />}
                    rightContent={<div></div>}
                    bottomContent={
                        <DeleteSaveButtonGroup
                            deleteLabel="Delete User"
                            saveLabel="Save Changes"
                            nameLabel={user ? user.firstName + " " + user.lastName : ""}
                            onDelete={() => onDelete(user)}
                            onSave={() => form.setSubmitting(true)}
                        />
                    }
                />
            </form>
        </userFormContext.Provider>
    );
}
