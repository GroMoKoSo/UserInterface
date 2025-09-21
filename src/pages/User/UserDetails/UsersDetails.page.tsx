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
        setUser(getUser(username ? username : ''));
    })

    const navigate = useNavigate();

    const { confirm, modal } = useConfirm<SimpleUserT>();

    async function onDelete(row: SimpleUserT) {
        const res = await confirm({
            title: 'Delete user?',
            payload: row,
            intent: 'danger',
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            content: (u) =>
                u ? (
                    <p>Delete user "<strong>{u.name}</strong>" (id: {u.username})?</p>
                ) : (
                    <p>No user selected.</p>
                ),
        });

        if (res && typeof res === 'object') {
            // res === payload (UserT), weil bestätigt
            deleteUser(res.username);
            navigate(-1)
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
                            onDelete={() => user && onDelete(user)}
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