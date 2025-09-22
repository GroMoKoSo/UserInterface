import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SimpleGroupT } from "../../../types/Types";
import { deleteGroup, getGroup } from "@/utils/api/GroupApiService";
import { GroupFormPage } from "./GroupFormPage";

export function GroupDetailsPage() {
  const [group, setGroup] = useState<SimpleGroupT | null>(null);
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (name) {
      getGroup(name).then(setGroup);
    }
  }, [name]);

  async function handleDelete(g: SimpleGroupT) {
    await deleteGroup(g.name);
    navigate(-1);
  }

  async function handleUpdate(g: SimpleGroupT) {
    // TODO: Update-API hier einbauen
    console.log("update group", g);
  }

  return (
    <GroupFormPage
      mode="edit"
      initialGroup={group}
      onSubmit={handleUpdate}
      onDelete={handleDelete}
    />
  );
}
