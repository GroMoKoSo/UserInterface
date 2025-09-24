import { MyLoader } from "@/components/MyLoader/MyLoader.view.js";
import { UserInformationSkeleton } from "@/components/Skelletons/Skeletons.view.js";
import { userFormContext } from "@/pages/User/UserFormPage/UserFormPage.js";
import { AggregatedUserT, SYSTEM_ROLES } from "@/types/Types.js";
import { Group, Select, TextInput } from "@mantine/core";
import { useContext } from "react";

export function UserInformationField({ user }: { user: AggregatedUserT | null }) {

    const { form, mode } = useContext(userFormContext)

    if (!form) {
        return <MyLoader />
    }

    if (!user && mode === "edit") {
        return ( <UserInformationSkeleton /> )
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