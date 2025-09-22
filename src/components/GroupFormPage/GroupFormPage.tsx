import GroupFields from "@/pages/Group/GroupDetails/components/GroupFields.container";
import { SimpleGroupT } from "@/types/Types";
import { DeleteSaveButtonGroup } from "../deleteSaveButtonGroup/DeleteSaveButtonGroup.view";
import Header from "../Header/Header.view";
import { TwoColumnLayout } from "../TwoColumnLayout/TwoColumnLayout.container";


type GroupFormPageProps = {
  mode: "create" | "edit";
  initialGroup?: SimpleGroupT | null;
  onSubmit: (values: SimpleGroupT) => Promise<void> | void;
  onDelete?: (group: SimpleGroupT) => Promise<void> | void;
};

export function GroupFormPage({
  mode,
  initialGroup,
  onSubmit,
  onDelete,
}: GroupFormPageProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (initialGroup) {
          void onSubmit(initialGroup);
        }
      }}
      style={{ width: "100%" }}
    >
      <TwoColumnLayout
        headerContent={
          <Header
            title={
              mode === "edit"
                ? `Group Details - ${initialGroup?.name ?? ""}`
                : "New Group"
            }
            backButton={true}
          />
        }
        leftContent={
          <>
            <GroupFields group={initialGroup ?? { name: "", description: "" }} />
            <DeleteSaveButtonGroup
              deleteLabel="Delete Group"
              saveLabel={mode === "edit" ? "Save Changes" : "Create Group"}
              nameLabel={initialGroup?.name ?? ""}
              onDelete={
                mode === "edit" && onDelete
                  ? () => {
                      void onDelete(initialGroup!);
                    }
                  : () => {}
              }
              onSave={() => {
                if (initialGroup) void onSubmit(initialGroup);
              }}
            />
          </>
        }
      />
    </form>
  );
}
