import { Code, Group, Title } from "@mantine/core";


export function SidebarTitle({title, version}: {title: string | null, version: string | null}) {

    if (!title && !version) {
        return <></>
    }

    return (
        <Group justify="space-between">
            <Title order={2}>{title}</Title>
            <Code fw={700}>v{version}</Code>
        </Group>
    )
}