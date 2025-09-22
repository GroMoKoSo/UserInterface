import { useEffect, useState } from 'react';
import { Button, useMantineColorScheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { MyTable } from '@/components/MyTable/MyTable';
import { TwoColumnLayout } from '@/components/TwoColumnLayout/TwoColumnLayout.container';
import Header from '@/components/Header/Header.view';
import { COLORS_SYSTEM_ROLES, type SimpleUserT } from '@/types/Types';
import { deleteUser, getAllUsers } from '@/utils/api/UserApiService';
import { useConfirm } from '@/components/useConfirm/useConfirm'; // Pfad anpassen
import { EditDeleteActions } from '@/components/MyTable/components/EditDeleteActions';
import { AddNewButton } from '@/components/AddNewButton/AddNewButton.view';

export function ManageUsersPage() {
    const [users, setUsers] = useState<SimpleUserT[]>([]);
    const { setColorScheme } = useMantineColorScheme();
    const navigate = useNavigate();
    const { confirm, modal } = useConfirm<SimpleUserT>();

    useEffect(() => { setColorScheme('light'); }, [setColorScheme]);
    useEffect(() => {
        async function fetchUsers() {
            const users = await getAllUsers();
            setUsers(users);
        }
        fetchUsers();
    }, []);

    async function onDelete(row: SimpleUserT) {
        const res = await confirm({
            title: 'Delete user?',
            payload: row,
            intent: 'danger',
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            content: (u) =>
                u ? (
                    <p>Delete user "<strong>{u.name}</strong>"?</p>
                ) : (
                    <p>No user selected.</p>
                ),
        });

        if (res && typeof res === 'object') {
            // res === payload (UserT), weil bestätigt
            deleteUser(res.username);
            setUsers((prev) => prev.filter((u) => u.name !== res.name));
        }
    }

    return (
        <>
            { /*confirm modal for deleting users*/}
            {modal}

            <TwoColumnLayout
                headerContent={<Header title="Manage Users" />}
                leftContent={
                    <>
                        <MyTable<SimpleUserT>
                            data={users}
                            columns={[
                                { key: 'name', label: 'Name' },
                                {
                                    key: 'systemrole',
                                    label: 'Systemrole',
                                    badge: {
                                        colorMap: COLORS_SYSTEM_ROLES,
                                        fallbackColor: 'gray',
                                    },
                                },
                                { key: 'email', label: 'Email' },
                            ]}
                            renderActions={(row, index) => (
                                <EditDeleteActions
                                    onEdit={(row) => navigate(row.username.toString())}
                                    onDelete={onDelete}
                                    row={row}
                                    rowIndex={index}
                                />
                            )}
                        />
                        <AddNewButton 
                            label="Add New User" 
                            onClick={() => navigate('new')} 
                        />
                    </>
                }
            />
        </>
    );
}
