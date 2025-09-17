import Header from "@/components/Header/Header.view";
import { MyTable } from "@/components/MyTable/MyTable";
import { TwoColumnLayout } from "@/components/TwoColumnLayout/TwoColumnLayout.container";
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