import { MyLoader } from "@/components/MyLoader/MyLoader.view";
import { AggregatedUserT, SYSTEM_ROLES, SystemRolesT } from "@/types/Types";
import { Group, Select, TextInput } from "@mantine/core";
import { useState } from "react";



export function UserInformationField({user}: {user: AggregatedUserT | null}) {

    if (!user) {
        return <MyLoader />;
    }

    const [selectedRole, setSelectedRole] = useState<SystemRolesT>(user.systemrole);

    return (
        <>
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
        </>

    )
}