import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SimpleGroupT } from "../../../types/Types";
import Header from "@/components/Header/Header.view";
import { Button, Group } from "@mantine/core";
import { TwoColumnLayout } from "@/components/TwoColumnLayout/TwoColumnLayout.container";
import { useConfirm } from "@/components/useConfirm/useConfirm";
import { deleteGroup, getGroup } from "@/utils/api/GroupApiService";
import GroupFields from "./components/GroupFields";


export function GroupDetailsPage() {
    const [group, setGroup] = useState<SimpleGroupT | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        setGroup(getGroup(id ? parseInt(id, 10) : 0));
    })

    const navigate = useNavigate();


    const { confirm, modal } = useConfirm<SimpleGroupT>();

    async function onDelete(row: SimpleGroupT) {
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
        return "loading"
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