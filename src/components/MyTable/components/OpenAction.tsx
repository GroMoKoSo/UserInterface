import { ActionIcon, Button, Group } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";


type OpenActionProps<T> = {
    onOpen: (row: T, rowIndex: number) => void;
    row: any;
    rowIndex: number
}

export function OpenAction({ onOpen, row, rowIndex }: OpenActionProps<any> & {}) {
    return (
        <Group gap={0} justify="flex-end">

            <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => onOpen(row, rowIndex)}
                aria-label="Open"
                title="Open"
            >
                <IconExternalLink size={16} stroke={1.5} />
            </ActionIcon>

        </Group>
    )
}