import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyTable } from '@/components/MyTable/MyTable.js';
import { TwoColumnLayout } from '@/components/TwoColumnLayout/TwoColumnLayout.container.js';
import Header from '@/components/Header/Header.view.js';
import { COLORS_GROUP_TYPES, type SimpleGroupT } from '@/types/Types.js';
import { useConfirm } from '@/components/useConfirm/useConfirm.js';
import { deleteGroup, getAllGroups } from '@/utils/api/GroupApiService.js';
import { EditDeleteActions } from '@/components/MyTable/components/EditDeleteActions.js';
import { AddNewButton } from '@/components/AddNewButton/AddNewButton.view.js';

export function ManageGroupsPage() {
    const [groups, setGroups] = useState<SimpleGroupT[]>([]);
    const navigate = useNavigate();
    const { confirm, modal } = useConfirm<SimpleGroupT>();

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
                    <div style={{minWidth: 600}}>
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
                            initialSortKey='type'
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
                    </div>
                }
            />
        </>
    );
}
