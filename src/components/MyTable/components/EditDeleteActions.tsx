import { ActionIcon, Group } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";


type EditDeleteActionProps<T> = {
    onEdit?: (row: T, rowIndex: number) => void;
    onDelete?: (row: T, rowIndex: number) => void;
    row: any;
    rowIndex: number
}

export function EditDeleteActions({onEdit, onDelete, row, rowIndex}: EditDeleteActionProps<any> & {}) {
    return (
        <Group gap={0} justify="flex-end">
            {onEdit && (
                <ActionIcon
                    variant="subtle"
                    color="gray"
                    onClick={() => onEdit(row, rowIndex)}
                    aria-label="Edit"
                    title="Edit"
                >
                    <IconPencil size={16} stroke={1.5} />
                </ActionIcon>
            )}
            {onDelete && (
                <ActionIcon
                    variant="subtle"
                    color="red"
                    onClick={() => onDelete(row, rowIndex)}
                    aria-label="Delete"
                    title="Delete"
                >
                    <IconTrash size={16} stroke={1.5} />
                </ActionIcon>
            )}
        </Group>
    )
}