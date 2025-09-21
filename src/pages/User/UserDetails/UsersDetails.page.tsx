import { useNavigate, useParams } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { AggregatedUserT } from "../../../types/Types";
import { deleteUser, getAggregatedUser } from "@/utils/api/UserApiService";
import Header from "@/components/Header/Header.view";
import UserFields from "./components/UserFields/UserFields";
import { TwoColumnLayout } from "@/components/TwoColumnLayout/TwoColumnLayout.container";
import { useConfirm } from "@/components/useConfirm/useConfirm";
import { Notifications } from "@mantine/notifications";
import { DeleteSaveButtonGroup } from "@/components/deleteSaveButtonGroup/DeleteSaveButtonGroup.view";
import { useAggregatedUserForm } from "./useUserForm";
import { MyLoader } from "@/components/MyLoader/MyLoader.view";
import { UseFormReturnType } from "@mantine/form";

export const userFormContext = createContext<UseFormReturnType<AggregatedUserT, (values: AggregatedUserT) => AggregatedUserT> | undefined>(undefined);

export function UserDetailsPage() {
    const [user, setUser] = useState<AggregatedUserT | null>(null);
    const { username } = useParams<{ username: string }>();

    useEffect(() => {
        async function fetchUser() {
            if (username) {
                const userData = await getAggregatedUser(username);
                setUser(userData);
            }
        }
        fetchUser();
    }, [username]);

    const { confirm, modal } = useConfirm<AggregatedUserT>();

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


    const form = useAggregatedUserForm(user);


    if (!user) {
        return <MyLoader />
    }

    return (
        <userFormContext.Provider value={form}>
            <form onSubmit={form.onSubmit((values) => updateUser(values))}>
                {modal}

                <TwoColumnLayout
                    headerContent={
                        <Header
                            title={`User Details - ${user ? user.firstName + " " + user.lastName : 'Loading...'}`}
                            backButton={true}
                        />
                    }

                    leftContent={
                        <>
                            <UserFields user={user} />
                        </>
                    }

                    rightContent={
                        <div></div>
                    }

                    bottomContent={
                        <DeleteSaveButtonGroup
                            deleteLabel="Delete User"
                            saveLabel="Save Changes"
                            nameLabel={user ? user.firstName + " " + user.lastName : ''}
                            onDelete={() => onDelete(user)}
                            onSave={() => console.log("save")}
                            onReset={() => console.log("reset")}
                        />
                    }
                />
            </form>
        </userFormContext.Provider>
    )
}