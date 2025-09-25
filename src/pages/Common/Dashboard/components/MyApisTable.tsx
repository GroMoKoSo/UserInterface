import { EditDeleteActions } from "@/components/MyTable/components/EditDeleteActions.js";
import { MyTable } from "@/components/MyTable/MyTable.js";
import { TableSkeleton } from "@/components/Skelletons/Skeletons.view.js";
import { AggregatedApiT, ApiSpecT, COLORS_PI_ACTIVATION_TYPES } from "@/types/Types.js";
import { useNavigate } from "react-router-dom";

export function MyApisTable({data}: {data: AggregatedApiT[] | null}) {

    const navigate = useNavigate();

    if (!data) {
        return <TableSkeleton />;
    }

    return (
        <MyTable<AggregatedApiT>
            data={data}
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
                            onDelete={(row, index) => {}}
                            row={row}
                            rowIndex={index}
                        />
            )}
        />
    )
}