import { MyTable } from "@/components/MyTable/MyTable";
import { TableSkeleton } from "@/components/Skelletons/Skeletons.view";
import { ApiSpecT } from "@/types/Types";
import { Fieldset } from "@mantine/core";




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