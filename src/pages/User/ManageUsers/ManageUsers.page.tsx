import { useEffect, useState } from 'react';
import { useMantineColorScheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { MyTable } from '@/components/Table/Table';
import { TwoColumnLayout } from '@/components/TwoColumnLayout/TwoColumnLayout';
import Header from '@/components/Header/Header';
import type { SimpleUserT } from '@/types/Types';
import { deleteUser, getAllUsers } from '@/utils/api/UserApiService';
import { useConfirm } from '@/components/confirm/useConfirm'; // Pfad anpassen

export function ManageUsersPage() {
    const [users, setUsers] = useState<SimpleUserT[]>([]);
    const { setColorScheme } = useMantineColorScheme();
    const navigate = useNavigate();
    const { confirm, modal } = useConfirm<SimpleUserT>();

    useEffect(() => { setColorScheme('light'); }, [setColorScheme]);
    useEffect(() => { setUsers(getAllUsers()); }, []);

    async function onDelete(row: SimpleUserT) {
        const res = await confirm({
            title: 'Delete user?',
            payload: row,
            intent: 'danger',
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            content: (u) =>
                u ? (
                    <p>Delete user "<strong>{u.name}</strong>" (id: {u.id})?</p>
                ) : (
                    <p>No user selected.</p>
                ),
        });

        if (res && typeof res === 'object') {
            // res === payload (UserT), weil bestätigt
            deleteUser(res.id);
            setUsers((prev) => prev.filter((u) => u.id !== res.id));
        }
    }

    return (
        <>
            { /*confirm modal for deleting users*/ }
            {modal}  
            
            <TwoColumnLayout
                headerContent={<Header title="Users" />}
                leftContent={
                    <MyTable<SimpleUserT>
                        data={users}
                        columns={['id', 'name', 'systemrole', 'email']}
                        onEdit={(row) => navigate(row.id.toString())}
                        onDelete={onDelete}
                    />
                }
            />
        </>
    );
}
