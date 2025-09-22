import Header from "@/components/Header/Header.view";
import { JoinActions } from "@/components/MyTable/components/JoinActions";
import { MyTable } from "@/components/MyTable/MyTable";
import { TwoColumnLayout } from "@/components/TwoColumnLayout/TwoColumnLayout.container";
import { COLORS_GROUP_TYPES, SimpleGroupT, SimpleUserT } from "@/types/Types";
import { getAllGroups } from "@/utils/api/GroupApiService";
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