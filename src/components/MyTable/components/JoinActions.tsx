import { ActionIcon, Button, Group } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";


type EditDeleteActionProps<T> = {
    onJoin: (row: T, rowIndex: number) => void;
    row: any;
    rowIndex: number
}

export function JoinActions({ onJoin, row, rowIndex }: EditDeleteActionProps<any> & {}) {
    return (
        <Group gap={0} justify="flex-end">

            <Button
                variant="light"
                color="blue"
                size="xs"
                onClick={() => onJoin(row, rowIndex)}
                aria-label="View"
                title="View"
            >
                View
            </Button>

            <Button
                variant="light"
                color="green"
                size="xs"
                onClick={() => onJoin(row, rowIndex)}
                aria-label="Join"
                title="Join"
                ml={"md"}
            >
                Join
            </Button>

        </Group>
    )
}