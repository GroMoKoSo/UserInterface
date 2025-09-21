import { ActionIcon, Button, Group } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";


type EditDeleteActionProps<T> = {
    onJoin: (row: T, rowIndex: number) => void;
    row: any;
    rowIndex: number
}

export function JoinActions({onJoin, row, rowIndex}: EditDeleteActionProps<any> & {}) {
    return (
        <Group gap={0} justify="flex-end">

            <Button
                variant="light"
                color="green"
                size="xs"
                onClick={() => onJoin(row, rowIndex)}
                aria-label="Join"
                title="Join"
            >
                Join
            </Button>

        </Group>
    )
}