import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AggregatedGroupT, SimpleGroupT } from "../../../types/Types";
import { deleteGroup, getAggregatedGroup, getGroup, updateGroup } from "@/utils/api/GroupApiService";
import { GroupFormPage } from "@/pages/Group/GroupFormPage/GroupFormPage";

export function GroupDetailsPage() {
    const [group, setGroup] = useState<AggregatedGroupT | null>(null);
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (name) {
            getAggregatedGroup(name).then(setGroup);
        }
    }, [name]);

    async function handleDelete(g: SimpleGroupT) {
        await deleteGroup(g.name);
        navigate(-1);
    }

    return (
        <GroupFormPage
            mode="edit"
            initialGroup={group}
            onSubmit={updateGroup}
            onDelete={handleDelete}
        />
    );
}
