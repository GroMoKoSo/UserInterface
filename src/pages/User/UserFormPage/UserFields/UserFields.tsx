import { GROUP_ROLES, AggregatedUserT, SYSTEM_ROLES, SystemRolesT } from "@/types/Types";
import { Button, Fieldset, Group, Select, Skeleton, TextInput } from "@mantine/core";
import UserGroupsField from "./components/UserGroupsField.view";
import { createContext } from "react";
import { MyLoader } from "@/components/MyLoader/MyLoader.view";
import { UserInformationField } from "./components/UserInformationField.view";
import { useAggregatedUserForm } from "../useUserForm";

function enumToSelectData<T extends string>(values: T[]) {
    return values.map((v) => ({ value: v, label: v }));
}

import { UseFormReturnType } from "@mantine/form";
import { DeleteSaveButtonGroup } from "@/components/deleteSaveButtonGroup/DeleteSaveButtonGroup.view";
import { Notifications } from "@mantine/notifications";
import { deleteUser, updateUser } from "@/utils/api/UserApiService";
import { useNavigate } from "react-router-dom";

export default function UserFields({ user }: { user: AggregatedUserT | null }) {

    return (
        <div style={{minWidth: 600}}>
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
        </div>
    );
}