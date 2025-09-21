import { MyTable } from "@/components/MyTable/MyTable";
import { Button, Fieldset } from "@mantine/core";
import { GroupMemberT } from "./GroupFields.container";
import { EditDeleteActions } from "@/components/MyTable/components/EditDeleteActions";
import { COLORS_GROUP_ROLES } from "@/types/Types";


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
                columns={[
                    { key: 'name', label: 'Name' },
                    {
                        key: 'groupRole',
                        label: 'Role',
                        badge: {
                            colorMap: COLORS_GROUP_ROLES,
                            fallbackColor: 'gray',
                        },
                    },
                ]}
                height="40vh"
                showActions
                renderActions={(row, index) => (
                    <EditDeleteActions 
                        onEdit={(row) => handleEditClick(row)}
                        onDelete={() => console.log("delete")} 
                        row={row} 
                        rowIndex={index}                    
                    />
                )}
                
            />

            <Button mt="xl" w="100%" variant="outline" color="green" onClick={openAddModal}>
                Add Member
            </Button>

        </Fieldset>
    )
}