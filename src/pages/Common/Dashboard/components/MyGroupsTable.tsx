import { MyTable } from "@/components/MyTable/MyTable";
import { TableSkeleton } from "@/components/Skelletons/Skeletons.view";
import { ApiSpecT, SimpleGroupT } from "@/types/Types";
import { Fieldset } from "@mantine/core";




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