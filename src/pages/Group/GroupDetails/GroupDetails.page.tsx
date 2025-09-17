import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SimpleGroupT } from "../../../types/Types";
import Header from "@/components/Header/Header.view";
import { Button, Group } from "@mantine/core";
import { TwoColumnLayout } from "@/components/TwoColumnLayout/TwoColumnLayout.container";
import { useConfirm } from "@/components/useConfirm/useConfirm";
import { deleteGroup, getGroup } from "@/utils/api/GroupApiService";
import GroupFields from "./components/GroupFields.container";
import { DeleteSaveButtonGroup } from "@/components/deleteSaveButtonGroup/DeleteSaveButtonGroup.view";


export function GroupDetailsPage() {
    const [group, setGroup] = useState<SimpleGroupT | null>(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate()

    useEffect(() => {
        setGroup(getGroup(id ? parseInt(id, 10) : 0));
    })

    function onDeleteGroup() {
        if (group) {
            deleteGroup(group.id);
            navigate(-1);
        }
    }


    return (
        <>
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

                        <DeleteSaveButtonGroup
                            deleteLabel="Delete Group"
                            saveLabel="Save Changes"
                            nameLabel={group ? group.name : ''}
                            onDelete={onDeleteGroup}
                            onSave={() => console.log("save")}
                        />
                    </>
                }
            />
        </>
    )
}