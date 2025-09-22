import { useNavigate } from "react-router-dom";
import { SimpleGroupT } from "../../../types/Types";
import { createGroup } from "@/utils/api/GroupApiService";
import { GroupFormPage } from "@/pages/Group/GroupFormPage/GroupFormPage";

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
