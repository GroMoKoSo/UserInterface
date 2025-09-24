import { MyLoader } from "@/components/MyLoader/MyLoader.view.js";
import { UserInformationSkeleton } from "@/components/Skelletons/Skeletons.view.js";
import { SimpleUserT, SYSTEM_ROLES } from "@/types/Types.js";
import { Group, TextInput, Select } from "@mantine/core";



export function UserProfileFields({ form, user }: { form: any, user: SimpleUserT | null }) {

    if (!form) {
        return <MyLoader />
    }

    if (!user) {
        return <UserInformationSkeleton />;
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
                    disabled={true}
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
                    disabled={true}
                />

                <TextInput
                    label="Lastname"
                    {...form.getInputProps('lastName')}
                    disabled={true}
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
                    disabled={true}
                />

                <Select
                    label="Role"
                    data={SYSTEM_ROLES}
                    {...form.getInputProps('systemrole')}
                />

            </Group>
        </>
    );
}