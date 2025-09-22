import { MyLoader } from "@/components/MyLoader/MyLoader.view";
import { userFormContext } from "@/pages/User/UserFormPage/UserFormPage";
import { AggregatedUserT, COLORS_SYSTEM_ROLES, SYSTEM_ROLES, SystemRolesT } from "@/types/Types";
import { Badge, Group, Select, Skeleton, Space, TextInput } from "@mantine/core";
import { useContext } from "react";

export function UserInformationField({ user }: { user: AggregatedUserT | null }) {

    const { form, mode } = useContext(userFormContext)

    if (!form) {
        return <MyLoader />
    }

    if (!user && mode === "edit") {
        return (
            <>
                <Space h={24} />
                <Skeleton height={36} />
                <Space h={24} />
                <Group mt={"md"} justify="space-between">
                    <Skeleton height={36} w={"48%"}/>
                    <Skeleton height={36} w={"48%"}/>
                </Group>
                <Space h={24} />
                <Group mt={"md"} justify="space-between">
                    <Skeleton height={36} w={"48%"}/>
                    <Skeleton height={36} w={"48%"}/>
                </Group>
            </>
        )
    }

    return (
        <>
            <Group
                justify="space-between"
                grow
                w={"100%"}
            >
                <TextInput
                    label="Username"
                    {...form.getInputProps('username')}
                    disabled={mode === "edit"}
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
                    {...form.getInputProps('firstName')}
                    disabled={mode === "edit"}
                />

                <TextInput
                    label="Lastname"
                    {...form.getInputProps('lastName')}
                    disabled={mode === "edit"}
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
                    {...form.getInputProps('email')}
                    disabled={mode === "edit"}
                />

                <Select
                    label="Role"
                    data={SYSTEM_ROLES}
                    {...form.getInputProps('systemrole')}
                />

            </Group>
        </>

    )
}