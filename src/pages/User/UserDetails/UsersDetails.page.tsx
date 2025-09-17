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


export function UserDetailsPage() {
    const [user, setUser] = useState<SimpleUserT | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        setUser(getUser(id ? parseInt(id, 10) : 0));
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
                    <p>Delete user "<strong>{u.name}</strong>" (id: {u.id})?</p>
                ) : (
                    <p>No user selected.</p>
                ),
        });

        if (res && typeof res === 'object') {
            // res === payload (UserT), weil bestätigt
            deleteUser(res.id);
            navigate(-1)
        }
    }



    if (!user) {
        return "loading"
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

                        <Group
                            justify="space-between"
                            mt="lg"
                            ml="lg"
                            mr="lg"
                        >
                            <Button
                                color="red"
                                onClick={() => user && onDelete(user)}
                            >
                                Delete User
                            </Button>
                            <Button
                                color="green"
                            >
                                Save Changes
                            </Button>
                        </Group>
                    </>
                }

                rightContent={
                    <div></div>
                }
            />
        </>
    )
}