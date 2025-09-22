import { useEffect, useState } from 'react';
import { useMantineColorScheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { ColumnDef, MyTable } from '@/components/MyTable/MyTable';
import { TwoColumnLayout } from '@/components/TwoColumnLayout/TwoColumnLayout.container';
import Header from '@/components/Header/Header.view';
import { COLORS_GROUP_TYPES, type SimpleGroupT, type SimpleUserT } from '@/types/Types';
import { useConfirm } from '@/components/useConfirm/useConfirm'; // Pfad anpassen
import { deleteGroup, getAllGroups } from '@/utils/api/GroupApiService';
import { EditDeleteActions } from '@/components/MyTable/components/EditDeleteActions';
import { AddNewButton } from '@/components/AddNewButton/AddNewButton.view';

export function ManageGroupsPage() {
    const [groups, setGroups] = useState<SimpleGroupT[]>([]);
    const { setColorScheme } = useMantineColorScheme();
    const navigate = useNavigate();
    const { confirm, modal } = useConfirm<SimpleGroupT>();

    useEffect(() => { setColorScheme('light'); }, [setColorScheme]);
    useEffect(() => {
        async function fetchGroups() {
            const groups = await getAllGroups();
            setGroups(groups);
        }
        fetchGroups();
    }, []);

    async function onDelete(row: SimpleGroupT) {
        const res = await confirm({
            title: 'Delete group?',
            payload: row,
            intent: 'danger',
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            content: (u) =>
                u ? (
                    <p>Delete group "<strong>{u.name}</strong>"?</p>
                ) : (
                    <p>No group selected.</p>
                ),
        });

        if (res && typeof res === 'object') {
            // res === payload (UserT), weil bestätigt
            deleteGroup(res.name);
            setGroups((prev) => prev.filter((u) => u.name !== res.name));
        }
    }


    return (
        <>
            {modal}
            <TwoColumnLayout
                headerContent={<Header title="Manage Groups" />}
                leftContent={
                    <>
                        <MyTable<SimpleGroupT>
                            data={groups}
                            columns={[
                                { key: 'name', label: 'Name' },
                                {
                                    key: 'type',
                                    label: 'Type',
                                    badge: {
                                        colorMap: COLORS_GROUP_TYPES,
                                        fallbackColor: 'gray',
                                    },
                                },
                            ]}
                            initialSortKey='name'
                            renderActions={(row, index) => (
                                <EditDeleteActions
                                    onEdit={(row) => navigate(row.name.toString())}
                                    onDelete={onDelete}
                                    row={row}
                                    rowIndex={index}
                                />
                            )}
                            height={"auto"}

                        />
                        <AddNewButton 
                            label="Add New Group" 
                            onClick={() => navigate('new')}
                        />
                    </>
                }
            />
        </>
    );
}
