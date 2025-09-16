import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GroupT } from "../../../types/Types";
import Header from "@/components/Header/Header";
import { Button, Group } from "@mantine/core";
import { TwoColumnLayout } from "@/components/TwoColumnLayout/TwoColumnLayout";
import { useConfirm } from "@/components/confirm/useConfirm";
import { deleteGroup, getGroup } from "@/utils/GroupApiHelper";
import GroupFields from "./components/GroupFields";


export function GroupDetailsPage() {
    const [group, setGroup] = useState<GroupT | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        setGroup(getGroup(id ? parseInt(id, 10) : 0));
    })

    const navigate = useNavigate();


    const { confirm, modal } = useConfirm<GroupT>();

    async function onDelete(row: GroupT) {
        const res = await confirm({
            title: 'Delete group?',
            payload: row,
            intent: 'danger',
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            content: (u) =>
                u ? (
                    <p>Delete group "<strong>{u.name}</strong>" (id: {u.id})?</p>
                ) : (
                    <p>No group selected.</p>
                ),
        });

        if (res && typeof res === 'object') {
            // res === payload (GroupT), weil bestätigt
            deleteGroup(res.id);
            navigate(-1)
        }
    }



    if (!group) {
        "loading"
    }

    return (
        <>
            {modal}

            <TwoColumnLayout
                headerContent={
                    <Header
                        title={`Group Details - ${group ? group.name : 'Loading...'}`}
                        backButton={true}
                    />
                }

                leftContent={
                    <>
                        <GroupFields group={group}/>

                        <Group
                            justify="space-between"
                            mt="lg"
                            ml="lg"
                            mr="lg"
                        >
                            <Button
                                color="red"
                                onClick={() => group && onDelete(group)}
                            >
                                Delete Group
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