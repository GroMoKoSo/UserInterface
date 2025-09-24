import { MyTable } from "@/components/MyTable/MyTable.js";
import { TableSkeleton } from "@/components/Skelletons/Skeletons.view.js";
import { ApiSpecT } from "@/types/Types.js";

export function MyApisTable({data}: {data: ApiSpecT[] | null}) {

    if (!data) {
        return <TableSkeleton />;
    }

    return (
        <MyTable<ApiSpecT>
            data={data}
            columns={[]}
        />
    )
}