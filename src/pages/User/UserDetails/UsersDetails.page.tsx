import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SimpleUserT } from "../../../types/Types";
import { deleteUser, getUser } from "@/utils/api/UserApiService";
import Header from "@/components/Header/Header.view";
import UserFields from "./components/UserFields";
import { Button, Group } from "@mantine/core";
import { TwoColumnLayout } from "@/components/TwoColumnLayout/TwoColumnLayout.container";
import { useConfirm } from "@/components/useConfirm/useConfirm";
import { Notifications } from "@mantine/notifications";
import { DeleteSaveButtonGroup } from "@/components/deleteSaveButtonGroup/DeleteSaveButtonGroup.view";


export function UserDetailsPage() {
    const [user, setUser] = useState<SimpleUserT | null>(null);
    const { username } = useParams<{ username: string }>();

    useEffect(() => {
        async function fetchUser() {
            if (username) {
                const userData = await getUser(username);
                setUser(userData);
            }
        }
        fetchUser();
    }, [username]);

    const navigate = useNavigate();

    const { confirm, modal } = useConfirm<SimpleUserT>();

    async function onDelete(row: SimpleUserT | null) {
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


    return (
        <>
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

                        <DeleteSaveButtonGroup
                            deleteLabel="Delete User"
                            saveLabel="Save Changes"
                            nameLabel={user ? user.firstName + " " + user.lastName : ''}
                            onDelete={() => onDelete(user)}
                            onSave={() => console.log("save")}
                        />
                    </>
                }

                rightContent={
                    <div></div>
                }
            />
        </>
    )
}