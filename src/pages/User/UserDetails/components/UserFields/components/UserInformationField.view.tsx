import { MyLoader } from "@/components/MyLoader/MyLoader.view";
import { AggregatedUserT, SYSTEM_ROLES, SystemRolesT } from "@/types/Types";
import { Group, Select, TextInput } from "@mantine/core";
import { useContext, useState } from "react";
import { useAggregatedUserForm } from "../../../useUserForm";
import { userFormContext } from "../UserFields";



export function UserInformationField({ user }: { user: AggregatedUserT | null }) {

    if (!user) {
        return <MyLoader />;
    }

    const [selectedRole, setSelectedRole] = useState<SystemRolesT>(user.systemrole);

    const form = useContext(userFormContext)

    return (
        <>
            <Group
                justify="space-between"
                grow
                w={"100%"}
            >
                <TextInput
                    label="Username"
                    {...form?.getInputProps('username')}
                />

            </Group>

            <Group
                justify="space-between"
                grow
                mt={"md"}
                w={"100%"}
            >
                <TextInput
                    label="Firstname"
                    {...form?.getInputProps('firstName')}
                />

                <TextInput
                    label="Lastname"
                    {...form?.getInputProps('lastName')}
                />
            </Group>

            <Group
                justify="space-between"
                grow
                w={"100%"}
                mt={"md"}
            >
                <TextInput
                    label="Email"
                    {...form?.getInputProps('email')}
                />

                <Select
                    label="Role"
                    data={SYSTEM_ROLES}
                    {...form?.getInputProps('systemrole')}
                />

            </Group>
        </>

    )
}