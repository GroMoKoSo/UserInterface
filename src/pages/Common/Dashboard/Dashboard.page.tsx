import Header from '@/components/Header/Header.view.js';
import { TwoColumnLayout } from '@/components/TwoColumnLayout/TwoColumnLayout.container.js';
import { Button, Fieldset, Group, Text } from '@mantine/core';
import { MyApisTable } from './components/MyApisTable.js';
import { MyGroupsTable } from './components/MyGroupsTable.js';
import { data, useNavigate } from 'react-router-dom';
import { ColorToggleButton } from '@/components/ColorToggleButton/ColorToggleButton.js';
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '@/utils/authentication/Authwrapper.js';
import { AggregatedApiT, COLORS_GROUP_ROLES, COLORS_PI_ACTIVATION_TYPES, GroupMemershipT } from '@/types/Types.js';
import { useConfirm } from '@/components/useConfirm/useConfirm.js';
import { deleteGroup } from '@/utils/api/GroupApiService.js';
import { TableSkeleton } from '@/components/Skelletons/Skeletons.view.js';
import { EditDeleteActions } from '@/components/MyTable/components/EditDeleteActions.js';
import { MyTable } from '@/components/MyTable/MyTable.js';
import { deleteApi } from '@/utils/api/ApiApiService.js';

export function DashboardPage() {

    const navigate = useNavigate();
    const sessionContext = useContext(SessionContext);
    const user = sessionContext?.user;

    const [userApis, setUserApis] = useState<AggregatedApiT[]>([]);
    const [userGroups, setUserGroups] = useState<GroupMemershipT>([]);

    useEffect(() => {
        if (user) {
            setUserApis(user.accessibleApis);
            setUserGroups(user.groupMemberships);
            console.log("ugm", user)
        }
    }, [user])

    const { confirm, modal } = useConfirm<AggregatedApiT>();
    async function onDelete(row: AggregatedApiT) {
        const res = await confirm({
            title: 'Delete Api?',
            payload: row,
            intent: 'danger',
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            content: (u) =>
                u ? (
                    <p>Delete api "<strong>{u.name}</strong>"?</p>
                ) : (
                    <p>No api selected.</p>
                ),
        });

        if (res && typeof res === 'object') {
            // res === payload (UserT), weil bestätigt
            deleteApi(row.id)
            setUserApis((prev) => prev.filter((u) => u.id !== res.id));
        }
    }

    return (
        <>
            {modal}
            <TwoColumnLayout
                headerContent={<Header title={user ? `Welcome ${user.name}!` : "Dashboard"} />}
                leftContent={
                    <>
                        <Fieldset legend="My APIs">
                            {userApis ? (
                                <MyTable<AggregatedApiT>
                                    data={userApis}
                                    columns={[
                                        { key: 'name', label: 'Name' },
                                        { key: 'version', label: 'Version' },
                                        {
                                            key: 'activationStatus',
                                            label: 'Status',
                                            badge: {
                                                colorMap: COLORS_PI_ACTIVATION_TYPES,
                                                fallbackColor: 'gray',
                                            }
                                        }

                                    ]}
                                    height={"auto"}
                                    renderActions={(row, index) => (
                                        <EditDeleteActions
                                            onEdit={(row, index) => navigate(`/apis/${row.id}`)}
                                            onDelete={(row, index) => onDelete(row)}
                                            row={row}
                                            rowIndex={index}
                                        />
                                    )}
                                />
                            )
                                :
                                <TableSkeleton />

                            }

                            <Button
                                fullWidth
                                mt={"md"}
                                color='green'
                                variant='outline'
                                onClick={() => {}}
                            >
                                Create Api
                            </Button>
                        </Fieldset>
                    </>
                }
                rightContent={
                    <Fieldset legend="My Groups">
                        {userGroups ? (
                            <MyTable<GroupMemershipT[number]>
                                data={userGroups}
                                columns={[
                                    { 
                                        key: 'group', 
                                        label: 'Name',
                                        getValue: (row) => row.group.name,
                                        render: (row) => <Text>{row.group.name}</Text>,
                                    },
                                    {
                                        key: 'roleInGroup',
                                        label: 'Role',
                                        badge: {
                                            colorMap: COLORS_GROUP_ROLES,
                                            fallbackColor: 'gray',
                                        },
                                    },
                                ]}
                                height={"auto"}
                                renderActions={(row, index) => (
                                    <EditDeleteActions
                                        onEdit={(row, index) => navigate(`/groups/${row.group.name}`)}
                                        onDelete={(row, index) => onDelete(row)}
                                        row={row}
                                        rowIndex={index}
                                    />
                                )}
                            />
                        ) : (
                            <TableSkeleton />
                        )}
                    </Fieldset>
                }
            />
        </>
    );
}