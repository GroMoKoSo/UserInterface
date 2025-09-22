import Header from '@/components/Header/Header.view';
import { TwoColumnLayout } from '@/components/TwoColumnLayout/TwoColumnLayout.container';
import { Button, Fieldset, Group, Text, useMantineColorScheme } from '@mantine/core';
import { MyApisTable } from './components/MyApisTable';
import { MyGroupsTable } from './components/MyGroupsTable';
import { useNavigate } from 'react-router-dom';
import { ColorToggleButton } from '@/components/ColorToggleButton/ColorToggleButton';

export function DashboardPage() {

    const navigate = useNavigate();


    return (
        <>
            <TwoColumnLayout
                headerContent={<Header title='Dashboard' />}
                leftContent={
                    <>
                        <Fieldset legend="My APIs">
                            <MyApisTable data={null} />
                            <Button
                                fullWidth
                                mt={"md"}
                                color='green'
                                variant='outline'
                                onClick={() => navigate('/groups/new')}
                            >
                                Create Api
                            </Button>
                        </Fieldset>
                        <Fieldset mt={"md"} legend="Settings">
                            <Group>
                                <Text>Toggle Color Scheme</Text>
                                <ColorToggleButton />       
                            </Group>
                        </Fieldset>
                    </>
                }
                rightContent={
                    <Fieldset legend="My Groups">
                        <MyGroupsTable data={null} />
                        <Button
                            fullWidth
                            mt={"md"}
                            color='green'
                            variant='outline'
                            onClick={() => navigate('/groups/new')}
                        >
                            Create Group
                        </Button>
                    </Fieldset>
                }
            />
        </>
    );
}