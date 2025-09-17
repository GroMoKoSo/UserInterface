import { SimpleUserT } from "@/types/Types";
import { Fieldset, Group, Select, TextInput } from "@mantine/core";
import GroupFields from "./GroupField";




export default function UserFields({user}: { user: SimpleUserT }) {

    if (!user) {
        return "loading";
    }

    return (
        <>
            <Fieldset
                legend="Personal Information"
                mt={"md"}
                w={"100%"}
                maw={1000}
            >
                <Group
                    justify="space-between"
                    grow
                    w={"100%"}
                >
                    <TextInput label="Firstname" placeholder="Firstname" value={user?.firstName} />
                    <TextInput label="Lastname" placeholder="Lastname" value={user?.lastName}/>
                </Group>
                <Group
                    justify="space-between"
                    grow
                    w={"100%"}
                    mt={"md"}
                >
                    <TextInput label="Email" placeholder="Email" value={user?.email} />

                    <Select
                        label="Role"
                        placeholder="Pick a role"
                        data={['Admin', 'Manager', 'User']}
                        defaultValue={user.systemrole} 
                    />
                    
                </Group>
            </Fieldset>


            <Fieldset 
                legend="Groups"
                mt={"md"}
                w={"100%"}
                maw={1000}
            >
                <GroupFields user={user} />
            </Fieldset>
        </>
    )
}