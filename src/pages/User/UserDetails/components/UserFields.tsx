import { GROUP_ROLES, SimpleUserT, SYSTEM_ROLES, SystemRolesT } from "@/types/Types";
import { Fieldset, Group, Select, TextInput } from "@mantine/core";
import GroupFields from "./GroupFields";
import { useState } from "react";

function enumToSelectData<T extends string>(values: T[]) {
    return values.map((v) => ({ value: v, label: v }));
}

export default function UserFields({ user }: { user: SimpleUserT }) {

    const [selectedRole, setSelectedRole] = useState<SystemRolesT>(user.systemrole);

    console.log("selected Role", selectedRole)

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
                    <TextInput label="Username" placeholder="Username" value={user.username} />

                </Group>

                <Group
                    justify="space-between"
                    grow
                    mt={"md"}
                    w={"100%"}
                >
                    <TextInput label="Firstname" placeholder="Firstname" value={user.firstName} />
                    
                    <TextInput label="Lastname" placeholder="Lastname" value={user.lastName} />
                </Group>

                <Group
                    justify="space-between"
                    grow
                    w={"100%"}
                    mt={"md"}
                >
                    <TextInput label="Email" placeholder="Email" value={user.email} />

                    <Select
                        label="Role"
                        placeholder="Pick a role"
                        data={SYSTEM_ROLES}
                        value={selectedRole}
                        onChange={(val) => setSelectedRole(val as SystemRolesT)}
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