import { Title, useMantineColorScheme } from '@mantine/core';

export function DashboardPage() {
    const { setColorScheme } = useMantineColorScheme();
    setColorScheme('light')
    return (
        <>
            <Title>GroMoKoSo Dashboard</Title>
        </>
    );
}
