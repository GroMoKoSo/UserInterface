import { useConfirm } from "@/components/useConfirm/useConfirm.js";
import { Button, Group } from "@mantine/core";

export function DeleteSaveButtonGroup(
    {
        deleteLabel = "Delete stuff",
        saveLabel = "Save Changes",
        nameLabel = "Name",
        onDelete,
        onSave,
        showDelete = true
    }:
        {
            deleteLabel: string;
            saveLabel: string;
            nameLabel: string;
            onDelete: () => void;
            onSave: () => void;
            showDelete?: boolean;
        }
) {


    const { confirm, modal } = useConfirm<String>();

    async function onDeleteClicked() {
        const res = await confirm({
            title: `${deleteLabel}?`,
            payload: nameLabel,
            intent: 'danger',
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            content: (u) =>
                u ? (
                    <p>Are you sure you want to delete <strong>{nameLabel}</strong>?</p>
                ) : (
                    <p>There is nothing to delete.</p>
                ),
        });


        if (res) { onDelete(); }
    }

    return (
        <>
            {modal}

            <Group
                // justify="space-between"
                mt="lg"
                ml="lg"
                mr="lg"
            >
                {showDelete &&
                    <Button
                        color="red"
                        onClick={onDeleteClicked}
                    >
                        {deleteLabel}
                    </Button>}
                <Button
                    type="submit"
                    color="green"
                    onClick={onSave}
                >
                    {saveLabel}
                </Button>

            </Group>
        </>
    )
}