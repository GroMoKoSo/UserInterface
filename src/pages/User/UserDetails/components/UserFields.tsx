import { GROUP_ROLES, AggregatedUserT, SYSTEM_ROLES, SystemRolesT } from "@/types/Types";
import { Button, Fieldset, Group, Select, TextInput } from "@mantine/core";
import UserGroupsField from "./UserGroupsField.view";
import { createContext } from "react";
import { MyLoader } from "@/components/MyLoader/MyLoader.view";
import { UserInformationField } from "./UserInformationField.view";
import { useAggregatedUserForm } from "../useUserForm";

function enumToSelectData<T extends string>(values: T[]) {
    return values.map((v) => ({ value: v, label: v }));
}

import { UseFormReturnType } from "@mantine/form";

export const userFormContext = createContext<UseFormReturnType<AggregatedUserT, (values: AggregatedUserT) => AggregatedUserT> | undefined>(undefined);

export default function UserFields({ user }: { user: AggregatedUserT | null }) {

    if (!user) {
        return <MyLoader />
    }

    const { form } = useAggregatedUserForm(user);

    return (
        <userFormContext.Provider value={form}>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Fieldset
                    legend="Personal Information"
                    mt={"md"}
                    w={"100%"}
                    maw={1000}
                >
                    <UserInformationField user={user} />
                </Fieldset>


                <Fieldset
                    legend="Groups"
                    mt={"md"}
                    w={"100%"}
                    maw={1000}
                >
                    <UserGroupsField user={user} />
                </Fieldset>

                <Button type="submit" mt="md">
                    Save Changes
                </Button>
            </form>
        </userFormContext.Provider>

    );
}