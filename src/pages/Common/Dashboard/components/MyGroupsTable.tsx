import { MyTable } from "@/components/MyTable/MyTable.js";
import { TableSkeleton } from "@/components/Skelletons/Skeletons.view.js";
import { ApiSpecT, SimpleGroupT } from "@/types/Types.js";

export function MyGroupsTable({data}: {data: ApiSpecT[] | null}) {

    if (!data) {
        return <TableSkeleton />;
    }
    return (
        <MyTable<SimpleGroupT>
            data={[]}
            columns={[]}
        />
    )
}