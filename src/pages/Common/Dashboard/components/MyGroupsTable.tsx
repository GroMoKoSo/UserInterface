import { MyTable } from "@/components/MyTable/MyTable.js";
import { TableSkeleton } from "@/components/Skelletons/Skeletons.view.js";
import { ApiSpecT, GroupMemershipT, SimpleGroupT } from "@/types/Types.js";

export function MyGroupsTable({data}: {data: GroupMemershipT | null}) {

    if (!data) {
        return <TableSkeleton />;
    }
    return (
        <MyTable<GroupMemershipT[number]>
            data={[]}
            columns={[]}
            height={"auto"}
        />
    )
}