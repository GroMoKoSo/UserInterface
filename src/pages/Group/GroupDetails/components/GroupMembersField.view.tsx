import { MyTable } from "@/components/MyTable/MyTable";
import { Button, Fieldset } from "@mantine/core";
import { GroupMemberT } from "./GroupFields.container";


export function GroupMembersField(
    { 
        handleEditClick,
        openAddModal,
        groupMembers,
    }:
        {
            handleEditClick: (row: GroupMemberT) => void,
            openAddModal: () => void,
            groupMembers: GroupMemberT[],
        }
) {
    return (
        <Fieldset legend="Group Members" mt="md" w="100%" maw={1000}>
            <MyTable<GroupMemberT>
                data={groupMembers}
                columns={["id", "name", "groupRole"]}
                height="40vh"
                onEdit={(row) => handleEditClick(row)}
                onDelete={() => console.log("delete")}
            />

            <Button mt="xl" w="100%" variant="outline" color="green" onClick={openAddModal}>
                Add Member
            </Button>

        </Fieldset>
    )
}