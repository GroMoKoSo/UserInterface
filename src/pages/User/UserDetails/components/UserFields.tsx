import { GROUP_ROLES, SimpleUserT, SYSTEM_ROLES, SystemRolesT } from "@/types/Types";
import { Fieldset, Group, Select, TextInput } from "@mantine/core";
import UserGroupsField from "./UserGroupsField.view";
import { useState } from "react";
import { MyLoader } from "@/components/MyLoader/MyLoader.view";
import { UserInformationField } from "./UserInformationField.view";

function enumToSelectData<T extends string>(values: T[]) {
    return values.map((v) => ({ value: v, label: v }));
}

export default function UserFields({ user }: { user: SimpleUserT | null }) {

    if (!user) {
        return <MyLoader />
    }


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
        </>
    )
}