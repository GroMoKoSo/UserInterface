import { useNavigate } from "react-router-dom";
import { SimpleGroupT } from "../../../types/Types.js";
import { createGroup } from "@/utils/api/GroupApiService.js";
import { GroupFormPage } from "@/pages/Group/GroupFormPage/GroupFormPage.js";

export function NewGroupPage() {
    const navigate = useNavigate();

    async function handleCreate(g: SimpleGroupT) {
        await createGroup(g);
        navigate("/groups");
    }

    return (
        <GroupFormPage
            mode="create"
            initialGroup={null}
            onSubmit={handleCreate}
        />
    );
}
