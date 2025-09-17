import { Button, Group } from "@mantine/core";
import { useConfirm } from "@/components/useConfirm/useConfirm";

export function DeleteSaveButtonGroup(
    {
        deleteLabel = "Delete stuff",
        saveLabel = "Save Changes",
        nameLabel = "Name",
        onDelete,
        onSave
    }:
        {
            deleteLabel: string;
            saveLabel: string;
            nameLabel: string;
            onDelete: () => void;
            onSave: () => void;
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

        if (res && typeof res === 'object') {
            // res === payload (GroupT), weil bestätigt
            onDelete();
    
        }
    }

    return (
        <>
            {modal}

            <Group
                justify="space-between"
                mt="lg"
                ml="lg"
                mr="lg"
            >
                <Button
                    color="red"
                    onClick={onDeleteClicked}
                >
                    {deleteLabel}
                </Button>
                <Button
                    color="green"
                    onClick={onSave}
                >
                    {saveLabel}
                </Button>
            </Group>
        </>
    )
}