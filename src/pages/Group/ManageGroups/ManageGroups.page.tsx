import { useEffect, useState } from 'react';
import { useMantineColorScheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { MyTable } from '@/components/Table/Table';
import { TwoColumnLayout } from '@/components/TwoColumnLayout/TwoColumnLayout';
import Header from '@/components/Header/Header';
import type { SimpleGroupT, SimpleUserT } from '@/types/Types';
import { useConfirm } from '@/components/confirm/useConfirm'; // Pfad anpassen
import { deleteGroup, getAllGroups } from '@/utils/api/GroupApiService';

type MyGroupT = SimpleGroupT & {
    size: number;
};

export function ManageGroupsPage() {
    const [groups, setGroups] = useState<SimpleGroupT[]>([]);
    const { setColorScheme } = useMantineColorScheme();
    const navigate = useNavigate();
    const { confirm, modal } = useConfirm<SimpleGroupT>();

    useEffect(() => { setColorScheme('light'); }, [setColorScheme]);
    useEffect(() => { setGroups(getAllGroups()); }, []);

    async function onDelete(row: SimpleGroupT) {
        const res = await confirm({
            title: 'Delete group?',
            payload: row,
            intent: 'danger',
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            content: (u) =>
                u ? (
                    <p>Delete group "<strong>{u.name}</strong>" (id: {u.id})?</p>
                ) : (
                    <p>No group selected.</p>
                ),
        });

        if (res && typeof res === 'object') {
            // res === payload (UserT), weil bestätigt
            deleteGroup(res.id);
            setGroups((prev) => prev.filter((u) => u.id !== res.id));
        }
    }

    return (
        <>
            {modal}
            <TwoColumnLayout
                headerContent={<Header title="Groups" />}
                leftContent={
                    <MyTable<MyGroupT>
                        data={groups.map((g, i) => ({ ...g, size: (Math.floor(Math.random() * (20 - 5 + 1)) + 5) }))}
                        columns={['id', 'name', 'size']}
                        onEdit={(row) => navigate(row.id.toString())}
                        onDelete={onDelete}
                        initialSortKey='id'
                    />
                }
            />
        </>
    );
}
