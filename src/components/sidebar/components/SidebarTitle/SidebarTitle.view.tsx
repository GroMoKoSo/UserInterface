import { Code, Group, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";


export function SidebarTitle({ title, version }: { title: string | null, version: string | null }) {

    const navigate = useNavigate();

    if (!title && !version) {
        return <></>
    }

    return (
        <Group justify="space-between">
            <Title
                order={2}
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
            >
                {title}
            </Title>
            <Code fw={700}>v{version}</Code>
        </Group>
    )
}