import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AggregatedUserT } from "../../../types/Types";
import { deleteUser, getAggregatedUser } from "@/utils/api/UserApiService";
import Header from "@/components/Header/Header.view";
import UserFields from "./components/UserFields";
import { TwoColumnLayout } from "@/components/TwoColumnLayout/TwoColumnLayout.container";
import { useConfirm } from "@/components/useConfirm/useConfirm";
import { Notifications } from "@mantine/notifications";
import { DeleteSaveButtonGroup } from "@/components/deleteSaveButtonGroup/DeleteSaveButtonGroup.view";


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

    const navigate = useNavigate();

    const { confirm, modal } = useConfirm<AggregatedUserT>();

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