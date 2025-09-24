import Header from "@/components/Header/Header.view.js";
import { JoinActions } from "@/components/MyTable/components/JoinActions.js";
import { MyTable } from "@/components/MyTable/MyTable.js";
import { TwoColumnLayout } from "@/components/TwoColumnLayout/TwoColumnLayout.container.js";
import { COLORS_GROUP_TYPES, SimpleGroupT } from "@/types/Types.js";
import { getAllGroups } from "@/utils/api/GroupApiService.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function PublicGroupsPage() {

    const [groups, setGroups] = useState<SimpleGroupT[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroups = async () => {
            const groupsData = await getAllGroups();
            setGroups(groupsData);
        };
        fetchGroups();
    }, []);

    return (
        <TwoColumnLayout
            headerContent={<Header title="Public Groups" />}
            leftContent={
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
                        <JoinActions
                            onJoin={(row) => console.log("join", row)}
                            row={row}
                            rowIndex={index}
                        />
                    )}
                />
            }

        />
    )
}