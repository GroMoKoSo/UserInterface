import Header from '@/components/Header/Header.view.js';
import { TwoColumnLayout } from '@/components/TwoColumnLayout/TwoColumnLayout.container.js';
import { Button, Fieldset, Group, Text } from '@mantine/core';
import { MyApisTable } from './components/MyApisTable.js';
import { MyGroupsTable } from './components/MyGroupsTable.js';
import { useNavigate } from 'react-router-dom';
import { ColorToggleButton } from '@/components/ColorToggleButton/ColorToggleButton.js';

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