import Header from "@/components/Header/Header";
import { MyTable } from "@/components/Table/Table";
import { TwoColumnLayout } from "@/components/TwoColumnLayout/TwoColumnLayout";
import { SimpleUserT } from "@/types/Types";


export function PublicGroupsPage() {

    return (
        <TwoColumnLayout
                        headerContent={<Header title="Public Groups" />}
                        leftContent={<></>}
                        // leftContent={
                        //     <MyTable<UserT>
                        //         data={users}
                        //         columns={['id', 'name', 'role', 'email']}
                        //         onEdit={(row) => navigate(row.id.toString())}
                        //         onDelete={onDelete}
                        //     />
                        // }
                    />
    )
}